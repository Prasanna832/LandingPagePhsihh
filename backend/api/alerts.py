from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.schemas import ActionOut, AlertIn, AlertOut, IncidentOut
from database import get_db
from models.entities import Alert
from services.auth_service import require_roles
from workflows.orchestrator import orchestrator

router = APIRouter(prefix="/alerts", tags=["alerts"])


@router.post("/ingest")
async def ingest_alert(
    payload: AlertIn,
    db: Session = Depends(get_db),
    _=Depends(require_roles("Admin", "Analyst")),
):
    result = await orchestrator.process_alert(db, payload.model_dump())
    return {
        "alert": AlertOut.model_validate(result["alert"]),
        "incident": IncidentOut.model_validate(result["incident"]),
        "actions": [ActionOut.model_validate(a) for a in result["actions"]],
    }


@router.get("", response_model=list[AlertOut])
def list_alerts(db: Session = Depends(get_db), _=Depends(require_roles("Admin", "Analyst", "Viewer"))):
    return db.query(Alert).order_by(Alert.created_at.desc()).limit(100).all()
