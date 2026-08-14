from datetime import date
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, UserSkillProgress, UserLessonProgress
from app.schemas import UserResponse, UserProgressResponse, UserProfileResponse
from app.services import activity_service

router = APIRouter(prefix="/api/users", tags=["Users"])

def get_current_user(db: Session = Depends(get_db)) -> User:
    user = db.query(User).filter_by(id=1).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Default user (id=1) not found. Please run seed script."
        )
    return user

@router.get("/me", response_model=UserResponse)
def get_me(user: User = Depends(get_current_user)):
    import json
    claimed_quests = []
    if user.claimed_quests_json:
        try:
            claimed_quests = json.loads(user.claimed_quests_json)
        except Exception:
            claimed_quests = []
    
    res = UserResponse.model_validate(user)
    res.claimed_quests = claimed_quests
    return res

@router.get("/me/progress", response_model=UserProgressResponse)
def get_me_progress(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    daily_xp = activity_service.get_daily_xp(db, user.id)
    return UserProgressResponse(
        user_id=user.id,
        total_xp=user.total_xp,
        weekly_xp=user.weekly_xp,
        hearts=user.hearts,
        current_streak=user.current_streak,
        longest_streak=user.longest_streak,
        daily_xp=daily_xp,
        daily_goal=user.daily_goal,
        daily_goal_completed=(daily_xp >= user.daily_goal)
    )

@router.get("/me/profile", response_model=UserProfileResponse)
def get_me_profile(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    lessons_completed = db.query(UserLessonProgress).filter_by(
        user_id=user.id, status="COMPLETED"
    ).count()

    skills_completed = db.query(UserSkillProgress).filter_by(
        user_id=user.id, status="COMPLETED"
    ).count()

    return UserProfileResponse(
        user_id=user.id,
        username=user.username,
        display_name=user.display_name,
        avatar_url=user.avatar_url,
        total_xp=user.total_xp,
        weekly_xp=user.weekly_xp,
        current_streak=user.current_streak,
        longest_streak=user.longest_streak,
        lessons_completed=lessons_completed,
        skills_completed=skills_completed,
        daily_goal=user.daily_goal,
        created_at=user.created_at
    )
