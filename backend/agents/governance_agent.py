class GovernanceAgent:
    name = "GovernanceAgent"

    async def run(self, incident_id: int, response: dict) -> dict:
        controls = {
            "incident_id": incident_id,
            "requires_approval": any(a.get("requires_approval") for a in response.get("actions", [])),
            "policy": "Critical account-impacting actions require Admin approval",
        }
        return {"agent": self.name, "governance": controls}
