from datetime import datetime, date
from typing import Optional, List
from pydantic import BaseModel, ConfigDict

class UserBase(BaseModel):
    username: str
    display_name: str
    avatar_url: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    total_xp: int
    weekly_xp: int
    hearts: int
    current_streak: int
    longest_streak: int
    last_active_date: Optional[date] = None
    daily_goal: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class UserProgressResponse(BaseModel):
    user_id: int
    total_xp: int
    weekly_xp: int
    hearts: int
    current_streak: int
    longest_streak: int
    daily_xp: int
    daily_goal: int
    daily_goal_completed: bool

class UserProfileResponse(BaseModel):
    user_id: int
    username: str
    display_name: str
    avatar_url: Optional[str] = None
    total_xp: int
    weekly_xp: int
    current_streak: int
    longest_streak: int
    lessons_completed: int
    skills_completed: int
    daily_goal: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
