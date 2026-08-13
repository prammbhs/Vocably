from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from app.schemas.lesson import LessonResponse

class SkillPathResponse(BaseModel):
    id: int
    unit_id: int
    title: str
    description: Optional[str] = None
    icon: Optional[str] = None
    order_index: int
    status: str  # LOCKED, NOT_STARTED, IN_PROGRESS, COMPLETED
    total_lessons: int
    completed_lessons: int
    lessons: List[LessonResponse] = []

    model_config = ConfigDict(from_attributes=True)

class UnitPathResponse(BaseModel):
    id: int
    course_id: int
    title: str
    description: Optional[str] = None
    order_index: int
    skills: List[SkillPathResponse] = []

    model_config = ConfigDict(from_attributes=True)

class CoursePathResponse(BaseModel):
    id: int
    name: str
    language: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    units: List[UnitPathResponse] = []

    model_config = ConfigDict(from_attributes=True)
