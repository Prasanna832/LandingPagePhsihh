from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.schemas import IncidentOut
from database import get_db
from models.entities import Incident
from services.auth_service import require_roles

router = APIRouter(prefix="/incidents", tags=["incidents"])


@router.get("", response_model=list[IncidentOut])
def list_incidents(db: Session = Depends(get_db), _=Depends(require_roles("Admin", "Analyst", "Viewer"))):
    return db.query(Incident).order_by(Incident.created_at.desc()).limit(100).all()


@router.get("/{incident_id}", response_model=IncidentOut)
def get_incident(incident_id: int, db: Session = Depends(get_db), _=Depends(require_roles("Admin", "Analyst", "Viewer"))):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return incident
