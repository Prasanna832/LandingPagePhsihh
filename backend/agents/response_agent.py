from services.mock_llm import llm_response_recommendation


class ResponseAgent:
    name = "ResponseAgent"

    async def run(self, normalized_alert: dict, triage: dict, investigation: dict) -> dict:
        severity = triage.get("severity", "Low")
        category = normalized_alert.get("category", "unknown")

        actions = [
            {"action_type": "alert_admin", "description": "Notify SOC admin about incident", "requires_approval": False},
        ]
        if severity in {"High", "Critical"}:
            actions.extend(
                [
                    {"action_type": "block_ip", "description": f"Block IP {normalized_alert.get('ip', 'unknown')}", "requires_approval": severity == "Critical"},
                    {"action_type": "disable_user", "description": f"Disable user {normalized_alert.get('user', 'unknown')}", "requires_approval": True},
                ]
            )

        recommendation = llm_response_recommendation(category, severity)
        return {"agent": self.name, "actions": actions, "recommendation": recommendation}
