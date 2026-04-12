def llm_triage_reason(message: str, category: str) -> str:
    return f"LLM assessed alert '{category}' as potentially malicious based on: {message[:120]}"


def llm_response_recommendation(category: str, severity: str) -> str:
    return f"Suggested response for {category} at {severity}: isolate endpoint, preserve evidence, notify SOC lead."
