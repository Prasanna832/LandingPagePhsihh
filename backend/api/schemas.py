from datetime import datetime
from typing import Any

from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    username: str = Field(min_length=3)
    email: EmailStr
    password: str = Field(min_length=8)
    role: str = "Viewer"


class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str | None = None


class AlertIn(BaseModel):
    source: str
    event_type: str
    message: str
    ip: str | None = None
    user: str | None = None
    metadata: dict[str, Any] = {}


class AlertOut(BaseModel):
    id: int
    source: str
    category: str
    severity: str
    status: str
    payload: dict
    created_at: datetime

    class Config:
        from_attributes = True


class IncidentOut(BaseModel):
    id: int
    alert_id: int
    title: str
    summary: str
    severity: str
    timeline: list
    threat_context: dict
    created_at: datetime

    class Config:
        from_attributes = True


class ActionDecision(BaseModel):
    approved: bool


class ActionOut(BaseModel):
    id: int
    incident_id: int
    action_type: str
    description: str
    status: str
    requires_approval: bool
    created_at: datetime

    class Config:
        from_attributes = True


class AuditLogOut(BaseModel):
    id: int
    actor: str
    event_type: str
    details: dict
    created_at: datetime

    class Config:
        from_attributes = True
