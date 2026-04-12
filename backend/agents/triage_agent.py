from services.mock_llm import llm_triage_reason


class TriageAgent:
    name = "TriageAgent"

    async def run(self, normalized_alert: dict) -> dict:
        category = normalized_alert.get("category", "unknown")
        message = normalized_alert.get("message", "")
        base_severity = "Low"

        if any(k in category for k in ["malware", "ransomware", "privilege", "credential"]):
            base_severity = "High"
        if "data_exfiltration" in category or "c2" in category:
            base_severity = "Critical"
        if "failed_login" in category and "many" in message.lower():
            base_severity = "Medium"

        reason = llm_triage_reason(message, category)
        return {
            "agent": self.name,
            "severity": base_severity,
            "triage_reason": reason,
            "triage_tags": [category, "ai-triage"],
        }
