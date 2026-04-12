class AlertIngestionAgent:
    name = "AlertIngestionAgent"

    async def run(self, alert: dict) -> dict:
        normalized = {
            "source": alert.get("source", "mock_siem"),
            "category": alert.get("event_type", "unknown").lower().replace(" ", "_"),
            "message": alert.get("message", ""),
            "ip": alert.get("ip"),
            "user": alert.get("user"),
            "metadata": alert.get("metadata", {}),
        }
        return {"agent": self.name, "normalized_alert": normalized}
