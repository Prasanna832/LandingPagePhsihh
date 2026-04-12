from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.schemas import ActionDecision, ActionOut
from database import get_db
from models.entities import Action, AuditLog
from services.auth_service import get_current_user, require_roles
from services.realtime import manager

router = APIRouter(prefix="/actions", tags=["actions"])


@router.get("", response_model=list[ActionOut])
def list_actions(db: Session = Depends(get_db), _=Depends(require_roles("Admin", "Analyst", "Viewer"))):
    return db.query(Action).order_by(Action.created_at.desc()).limit(200).all()


@router.post("/{action_id}/decision", response_model=ActionOut)
async def decide_action(
    action_id: int,
    payload: ActionDecision,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    action = db.query(Action).filter(Action.id == action_id).first()
    if not action:
        raise HTTPException(status_code=404, detail="Action not found")

    if action.requires_approval and user.role != "Admin":
        raise HTTPException(status_code=403, detail="Only Admin can approve/reject critical actions")

    action.status = "approved" if payload.approved else "rejected"
    db.add(AuditLog(actor=user.username, event_type="action_decision", details={"action_id": action.id, "approved": payload.approved}))
    db.commit()
    db.refresh(action)

    await manager.broadcast("actions", {"type": "action_decided", "payload": {"action_id": action.id, "status": action.status}})
    return action
