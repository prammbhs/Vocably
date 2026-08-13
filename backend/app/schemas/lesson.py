from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from app.schemas.exercise import ExerciseResponse

class LessonBase(BaseModel):
    title: str
    description: Optional[str] = None
    order_index: int
    xp_reward: int = 10

class LessonResponse(LessonBase):
    id: int
    skill_id: int
    status: str = "LOCKED"  # Derived or user specific status
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class LessonDetailResponse(LessonResponse):
    exercises: List[ExerciseResponse] = []

class LessonCompletionResponse(BaseModel):
    lesson_completed: bool
    xp_earned: int
    total_xp: int
    weekly_xp: int
    daily_xp: int
    daily_goal: int
    daily_goal_completed: bool
    streak: int
    longest_streak: int
    skill_progress: int  # percentage or completed count
    skill_status: str
    next_skill_unlocked: bool
