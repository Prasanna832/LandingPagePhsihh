from datetime import datetime, timedelta, timezone

from services.threat_intel import lookup_indicator


class InvestigationAgent:
    name = "InvestigationAgent"

    async def run(self, normalized_alert: dict, triage: dict) -> dict:
        now = datetime.now(timezone.utc)
        timeline = [
            {"time": (now - timedelta(minutes=5)).isoformat(), "event": "Initial suspicious event observed"},
            {"time": (now - timedelta(minutes=3)).isoformat(), "event": "Correlated endpoint telemetry"},
            {"time": now.isoformat(), "event": "Investigation completed by agent"},
        ]
        intel = lookup_indicator(normalized_alert.get("ip"))
        return {
            "agent": self.name,
            "timeline": timeline,
            "threat_context": {
                "indicator": intel,
                "triage_reason": triage.get("triage_reason"),
                "related_logs": [
                    "AuthService: anomalous token behavior",
                    "EDR: suspicious process tree",
                ],
            },
        }
