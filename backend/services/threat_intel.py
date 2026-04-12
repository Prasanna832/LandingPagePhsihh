from hashlib import sha256


def lookup_indicator(indicator: str | None) -> dict:
    if not indicator:
        return {"score": 10, "reputation": "unknown", "ioc": None}
    h = int(sha256(indicator.encode()).hexdigest(), 16)
    score = (h % 90) + 10
    reputation = "malicious" if score > 70 else "suspicious" if score > 40 else "low-risk"
    return {"score": score, "reputation": reputation, "ioc": indicator}
