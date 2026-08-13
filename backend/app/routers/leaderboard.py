from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import LeaderboardResponse, LeaderboardUser
from app.routers.users import get_current_user

router = APIRouter(prefix="/api/leaderboard", tags=["Leaderboard"])

@router.get("", response_model=LeaderboardResponse)
def get_leaderboard(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    users = db.query(User).order_by(User.weekly_xp.desc(), User.total_xp.desc()).all()

    leaderboard_list: List[LeaderboardUser] = []
    user_rank = None

    for rank, u in enumerate(users, start=1):
        is_curr = (u.id == user.id)
        if is_curr:
            user_rank = rank

        leaderboard_list.append(LeaderboardUser(
            rank=rank,
            user_id=u.id,
            username=u.username,
            display_name=u.display_name,
            avatar_url=u.avatar_url,
            weekly_xp=u.weekly_xp,
            total_xp=u.total_xp,
            is_current_user=is_curr
        ))

    return LeaderboardResponse(
        leaderboard=leaderboard_list,
        user_rank=user_rank
    )
