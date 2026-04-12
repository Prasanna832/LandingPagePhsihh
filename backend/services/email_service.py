def send_notification(to: str, subject: str, body: str) -> dict:
    return {"delivered": True, "to": to, "subject": subject, "preview": body[:120]}
