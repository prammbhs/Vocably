from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import CoursePathResponse
from app.routers.users import get_current_user
from app.services import progression_service

router = APIRouter(prefix="/api/course", tags=["Course Path"])

@router.get("/path", response_model=CoursePathResponse)
def get_path(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return progression_service.get_course_path(db, user.id)
