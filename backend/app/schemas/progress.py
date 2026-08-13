from typing import List, Optional
from pydantic import BaseModel
from app.schemas.user import UserResponse

class LeaderboardUser(BaseModel):
    rank: int
    user_id: int
    username: str
    display_name: str
    avatar_url: Optional[str] = None
    weekly_xp: int
    total_xp: int
    is_current_user: bool = False

class LeaderboardResponse(BaseModel):
    leaderboard: List[LeaderboardUser]
    user_rank: Optional[int] = None

class PracticeResponse(BaseModel):
    message: str
    hearts_restored: int
    hearts_remaining: int
