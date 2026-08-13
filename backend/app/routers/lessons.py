from typing import Any, Dict
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Lesson, UserLessonProgress
from app.schemas import (
    LessonDetailResponse,
    ExerciseAnswerSubmission,
    AnswerFeedbackResponse,
    LessonCompletionResponse,
)
from app.routers.users import get_current_user
from app.services import lesson_service

router = APIRouter(prefix="/api/lessons", tags=["Lessons & Exercises"])

@router.get("/{lesson_id}", response_model=LessonDetailResponse)
def get_lesson(
    lesson_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    lesson = db.query(Lesson).filter_by(id=lesson_id).first()
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Lesson with id {lesson_id} not found."
        )

    # Check status
    lp = db.query(UserLessonProgress).filter_by(user_id=user.id, lesson_id=lesson_id).first()
    lesson_status = lp.status if lp else "NOT_STARTED"

    return LessonDetailResponse(
        id=lesson.id,
        skill_id=lesson.skill_id,
        title=lesson.title,
        description=lesson.description,
        order_index=lesson.order_index,
        xp_reward=lesson.xp_reward,
        status=lesson_status,
        created_at=lesson.created_at,
        updated_at=lesson.updated_at,
        exercises=[
            {
                "id": ex.id,
                "lesson_id": ex.lesson_id,
                "type": ex.type,
                "prompt": ex.prompt,
                "data": ex.data,
                "order_index": ex.order_index
            } for ex in lesson.exercises
        ]
    )

@router.post("/{lesson_id}/exercises/{exercise_id}/answer", response_model=AnswerFeedbackResponse)
def submit_exercise_answer(
    lesson_id: int,
    exercise_id: int,
    payload: Dict[str, Any],
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return lesson_service.verify_answer(
        db=db,
        user=user,
        lesson_id=lesson_id,
        exercise_id=exercise_id,
        answer_payload=payload
    )

@router.post("/{lesson_id}/complete", response_model=LessonCompletionResponse)
def complete_lesson(
    lesson_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return lesson_service.complete_lesson(
        db=db,
        user=user,
        lesson_id=lesson_id
    )
