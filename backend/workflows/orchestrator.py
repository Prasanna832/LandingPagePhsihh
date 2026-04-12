from sqlalchemy.orm import Session

from agents.governance_agent import GovernanceAgent
from agents.ingestion_agent import AlertIngestionAgent
from agents.investigation_agent import InvestigationAgent
from agents.response_agent import ResponseAgent
from agents.triage_agent import TriageAgent
from models.entities import Action, Alert, AuditLog, Incident
from services.email_service import send_notification
from services.realtime import manager
from workflows.state_store import state_store


class SocWorkflowOrchestrator:
    def __init__(self):
        self.ingestion = AlertIngestionAgent()
        self.triage = TriageAgent()
        self.investigation = InvestigationAgent()
        self.response = ResponseAgent()
        self.governance = GovernanceAgent()

    async def process_alert(self, db: Session, alert_payload: dict) -> dict:
        ingestion_result = await self.ingestion.run(alert_payload)
        normalized_alert = ingestion_result["normalized_alert"]

        triage_result = await self.triage.run(normalized_alert)
        investigation_result = await self.investigation.run(normalized_alert, triage_result)

        alert = Alert(
            source=normalized_alert["source"],
            category=normalized_alert["category"],
            severity=triage_result["severity"],
            payload={**normalized_alert, "triage": triage_result},
            status="triaged",
        )
        db.add(alert)
        db.commit()
        db.refresh(alert)

        incident = Incident(
            alert_id=alert.id,
            title=f"{alert.category.replace('_', ' ').title()} incident",
            summary=triage_result["triage_reason"],
            severity=triage_result["severity"],
            timeline=investigation_result["timeline"],
            threat_context=investigation_result["threat_context"],
        )
        db.add(incident)
        db.commit()
        db.refresh(incident)

        response_result = await self.response.run(normalized_alert, triage_result, investigation_result)
        action_rows = []
        for action in response_result["actions"]:
            row = Action(
                incident_id=incident.id,
                action_type=action["action_type"],
                description=action["description"],
                requires_approval=action["requires_approval"],
                status="pending_approval" if action["requires_approval"] else "executed",
            )
            db.add(row)
            action_rows.append(row)
        db.commit()

        governance_result = await self.governance.run(incident.id, response_result)

        email_result = send_notification(
            to="soc-admin@local",
            subject=f"SOC Incident #{incident.id} - {incident.severity}",
            body=response_result["recommendation"],
        )

        audit_events = [
            ("SYSTEM", "alert_ingested", {"alert_id": alert.id, "category": alert.category}),
            ("TriageAgent", "severity_assigned", triage_result),
            ("InvestigationAgent", "incident_investigated", investigation_result),
            ("ResponseAgent", "actions_suggested", response_result),
            ("GovernanceAgent", "governance_checked", governance_result),
            ("EmailService", "notification_sent", email_result),
        ]
        for actor, event_type, details in audit_events:
            db.add(AuditLog(actor=actor, event_type=event_type, details=details))
        db.commit()

        workflow_state = {
            "alert_id": alert.id,
            "incident_id": incident.id,
            "severity": incident.severity,
            "status": "completed",
        }
        await state_store.set_state(f"workflow:{alert.id}", workflow_state)

        await manager.broadcast("alerts", {"type": "alert_created", "payload": {"id": alert.id, "severity": alert.severity}})
        await manager.broadcast("incidents", {"type": "incident_created", "payload": {"id": incident.id, "severity": incident.severity}})
        await manager.broadcast("actions", {"type": "actions_created", "payload": {"incident_id": incident.id}})
        await manager.broadcast("audit", {"type": "audit_updated", "payload": {"incident_id": incident.id}})

        return {
            "alert": alert,
            "incident": incident,
            "actions": db.query(Action).filter(Action.incident_id == incident.id).all(),
        }


orchestrator = SocWorkflowOrchestrator()
