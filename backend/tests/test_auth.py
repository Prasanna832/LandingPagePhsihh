from fastapi.testclient import TestClient
from uuid import uuid4

from main import app

client = TestClient(app)


def test_signup_login_and_protected_access():
    username = f"analyst-{uuid4().hex[:8]}"
    signup = client.post(
        "/api/auth/signup",
        json={
            "username": username,
            "email": f"{username}@example.com",
            "password": "StrongPass123",
            "role": "Analyst",
        },
    )
    assert signup.status_code == 200

    login = client.post("/api/auth/login", json={"username": username, "password": "StrongPass123"})
    assert login.status_code == 200
    token = login.json()["access_token"]

    alerts = client.get("/api/alerts", headers={"Authorization": f"Bearer {token}"})
    assert alerts.status_code == 200
