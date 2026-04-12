from fastapi.testclient import TestClient
from uuid import uuid4

from main import app

client = TestClient(app)


def auth_headers(username: str, password: str, role: str = "Admin"):
    client.post(
        "/api/auth/signup",
        json={"username": username, "email": f"{username}@example.com", "password": password, "role": role},
    )
    token = client.post("/api/auth/login", json={"username": username, "password": password}).json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_full_pipeline_ingest_to_audit():
    username = f"admin-{uuid4().hex[:8]}"
    headers = auth_headers(username, "StrongPass123", "Admin")

    payload = {
        "source": "MockSIEM",
        "event_type": "data_exfiltration",
        "message": "Outbound transfer spike observed",
        "ip": "10.0.0.7",
        "user": "alice",
        "metadata": {"bytes": 9999},
    }
    ingest = client.post("/api/alerts/ingest", json=payload, headers=headers)
    assert ingest.status_code == 200

    incidents = client.get("/api/incidents", headers=headers)
    assert incidents.status_code == 200
    assert len(incidents.json()) >= 1

    actions = client.get("/api/actions", headers=headers)
    assert actions.status_code == 200
    assert len(actions.json()) >= 1

    audit = client.get("/api/audit", headers=headers)
    assert audit.status_code == 200
    assert len(audit.json()) >= 1
