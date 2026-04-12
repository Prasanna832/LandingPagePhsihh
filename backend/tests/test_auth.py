from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_signup_login_and_protected_access():
    signup = client.post(
        "/api/auth/signup",
        json={
            "username": "analyst1",
            "email": "analyst1@example.com",
            "password": "StrongPass123",
            "role": "Analyst",
        },
    )
    assert signup.status_code == 200

    login = client.post("/api/auth/login", json={"username": "analyst1", "password": "StrongPass123"})
    assert login.status_code == 200
    token = login.json()["access_token"]

    alerts = client.get("/api/alerts", headers={"Authorization": f"Bearer {token}"})
    assert alerts.status_code == 200
