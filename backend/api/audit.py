from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.schemas import AuditLogOut
from database import get_db
from models.entities import AuditLog
from services.auth_service import require_roles

router = APIRouter(prefix="/audit", tags=["audit"])


@router.get("", response_model=list[AuditLogOut])
def list_audit_logs(db: Session = Depends(get_db), _=Depends(require_roles("Admin", "Analyst", "Viewer"))):
    return db.query(AuditLog).order_by(AuditLog.created_at.desc()).limit(300).all()
