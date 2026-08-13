from datetime import datetime, date
from typing import Dict, Any
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models import (
    User,
    Lesson,
    Exercise,
    LessonAttempt,
    UserLessonProgress,
    UserSkillProgress,
    Skill,
)
from app.schemas.exercise import AnswerFeedbackResponse
from app.schemas.lesson import LessonCompletionResponse
from app.services import gamification_service, activity_service

def verify_answer(
    db: Session,
    user: User,
    lesson_id: int,
    exercise_id: int,
    answer_payload: Dict[str, Any]
) -> AnswerFeedbackResponse:
    # 1. Validate lesson exists
    lesson = db.query(Lesson).filter_by(id=lesson_id).first()
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Lesson with id {lesson_id} not found."
        )

    # 2. Validate exercise exists & belongs to lesson
    exercise = db.query(Exercise).filter_by(id=exercise_id, lesson_id=lesson_id).first()
    if not exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Exercise {exercise_id} does not belong to lesson {lesson_id}."
        )

    # Unwrap nested "answer" dictionary if present
    if "answer" in answer_payload and isinstance(answer_payload["answer"], dict):
        answer_data = answer_payload["answer"]
    else:
        answer_data = answer_payload

    # 3. Determine correctness based on exercise type
    is_correct = False
    correct_answer_str = ""
    ex_type = exercise.type
    ex_data = exercise.data

    if ex_type == "MULTIPLE_CHOICE":
        submitted_option = answer_data.get("option_id") or answer_data.get("selected_option") or answer_data.get("text")
        expected_option = ex_data.get("correct_option")
        is_correct = (submitted_option == expected_option)

        # Find text for correct option for feedback
        for opt in ex_data.get("options", []):
            if opt.get("id") == expected_option:
                correct_answer_str = opt.get("text", expected_option)

    elif ex_type == "WORD_BANK":
        submitted_seq = answer_data.get("sequence", [])
        expected_seq = ex_data.get("correct_sequence", [])
        is_correct = (submitted_seq == expected_seq)
        correct_answer_str = " ".join(expected_seq)

    elif ex_type == "MATCH_PAIRS":
        submitted_pairs = answer_data.get("pairs", [])
        expected_pairs = ex_data.get("pairs", [])
        # Normalize lists of dicts to sets of tuples
        sub_set = {(p.get("left"), p.get("right")) for p in submitted_pairs}
        exp_set = {(p.get("left"), p.get("right")) for p in expected_pairs}
        is_correct = (sub_set == exp_set)
        correct_answer_str = ", ".join([f"{p.get('left')} -> {p.get('right')}" for p in expected_pairs])

    elif ex_type == "FILL_BLANK":
        submitted_word = answer_data.get("selected_word") or answer_data.get("text")
        expected_word = ex_data.get("correct_option")
        is_correct = (submitted_word == expected_word)
        correct_answer_str = expected_word

    elif ex_type == "TYPE_ANSWER":
        submitted_text = (answer_data.get("text") or "").strip().lower()
        accepted_answers = [ans.strip().lower() for ans in ex_data.get("accepted_answers", [])]
        is_correct = (submitted_text in accepted_answers)
        correct_answer_str = ex_data.get("accepted_answers", [""])[0]

    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported exercise type: {ex_type}"
        )

    # 4. Handle Hearts if incorrect
    heart_lost = False
    if not is_correct:
        _, heart_lost = gamification_service.deduct_heart(user)

    # 5. Record attempt
    attempt = LessonAttempt(
        user_id=user.id,
        lesson_id=lesson_id,
        exercise_id=exercise_id,
        answer=answer_data,
        is_correct=is_correct,
        heart_lost=heart_lost
    )
    db.add(attempt)
    db.commit()
    db.refresh(user)

    feedback_msg = "Awesome! That's correct." if is_correct else "Not quite! Keep trying."

    return AnswerFeedbackResponse(
        correct=is_correct,
        feedback=feedback_msg,
        correct_answer=None if is_correct else correct_answer_str,
        hearts_remaining=user.hearts
    )


def complete_lesson(db: Session, user: User, lesson_id: int) -> LessonCompletionResponse:
    # 1. Check hearts > 0
    if user.hearts <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot complete lesson with 0 hearts. Please practice to refill hearts."
        )

    # 2. Verify lesson exists
    lesson = db.query(Lesson).filter_by(id=lesson_id).first()
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Lesson with id {lesson_id} not found."
        )

    # 3. Check existing user lesson progress
    lesson_progress = db.query(UserLessonProgress).filter_by(
        user_id=user.id, lesson_id=lesson_id
    ).first()

    already_completed = (lesson_progress is not None and lesson_progress.status == "COMPLETED")

    today_date = date.today()

    if already_completed:
        # Idempotent: Do NOT award XP twice
        xp_earned = 0
    else:
        xp_earned = lesson.xp_reward

        if not lesson_progress:
            lesson_progress = UserLessonProgress(
                user_id=user.id,
                lesson_id=lesson_id,
                status="COMPLETED"
            )
            db.add(lesson_progress)
        else:
            lesson_progress.status = "COMPLETED"

        # Award XP & update streak
        gamification_service.award_xp(user, xp_earned)
        gamification_service.update_streak(user, today_date)

        # Record daily activity
        activity_service.record_daily_activity(
            db=db,
            user_id=user.id,
            xp_earned=xp_earned,
            lesson_completed=True,
            today_date=today_date
        )

        # Update Skill progress
        skill = lesson.skill
        skill_lessons = skill.lessons
        completed_skill_lessons = db.query(UserLessonProgress).filter(
            UserLessonProgress.user_id == user.id,
            UserLessonProgress.lesson_id.in_([l.id for l in skill_lessons]),
            UserLessonProgress.status == "COMPLETED"
        ).count()

        # Include current lesson if not yet committed in query
        if not db.query(UserLessonProgress).filter_by(user_id=user.id, lesson_id=lesson.id, status="COMPLETED").first():
            completed_skill_lessons += 1

        skill_progress = db.query(UserSkillProgress).filter_by(
            user_id=user.id, skill_id=skill.id
        ).first()

        all_lessons_done = (completed_skill_lessons >= len(skill_lessons))

        if not skill_progress:
            skill_progress = UserSkillProgress(
                user_id=user.id,
                skill_id=skill.id,
                status="COMPLETED" if all_lessons_done else "IN_PROGRESS"
            )
            db.add(skill_progress)
        else:
            skill_progress.status = "COMPLETED" if all_lessons_done else "IN_PROGRESS"

        # Unlock next lesson in current skill
        sorted_lessons = sorted(skill_lessons, key=lambda l: l.order_index)
        for idx, l in enumerate(sorted_lessons):
            if l.id == lesson_id and idx + 1 < len(sorted_lessons):
                next_l = sorted_lessons[idx + 1]
                next_lp = db.query(UserLessonProgress).filter_by(user_id=user.id, lesson_id=next_l.id).first()
                if not next_lp:
                    db.add(UserLessonProgress(user_id=user.id, lesson_id=next_l.id, status="NOT_STARTED"))
                elif next_lp.status == "LOCKED":
                    next_lp.status = "NOT_STARTED"

        # Unlock next skill if current skill completed
        next_skill_unlocked = False
        if all_lessons_done:
            # Find next skill in order
            unit_skills = sorted(skill.unit.skills, key=lambda s: s.order_index)
            curr_idx = next((i for i, s in enumerate(unit_skills) if s.id == skill.id), -1)
            if curr_idx != -1 and curr_idx + 1 < len(unit_skills):
                next_sk = unit_skills[curr_idx + 1]
                next_sp = db.query(UserSkillProgress).filter_by(user_id=user.id, skill_id=next_sk.id).first()
                if not next_sp:
                    db.add(UserSkillProgress(user_id=user.id, skill_id=next_sk.id, status="NOT_STARTED"))
                    next_skill_unlocked = True
                elif next_sp.status == "LOCKED":
                    next_sp.status = "NOT_STARTED"
                    next_skill_unlocked = True

                # Unlock first lesson of next skill
                if next_sk.lessons:
                    first_l = sorted(next_sk.lessons, key=lambda l: l.order_index)[0]
                    first_lp = db.query(UserLessonProgress).filter_by(user_id=user.id, lesson_id=first_l.id).first()
                    if not first_lp:
                        db.add(UserLessonProgress(user_id=user.id, lesson_id=first_l.id, status="NOT_STARTED"))
                    elif first_lp.status == "LOCKED":
                        first_lp.status = "NOT_STARTED"

        db.commit()
        db.refresh(user)

    daily_xp = activity_service.get_daily_xp(db, user.id, today_date)

    # Get skill progress status
    sp = db.query(UserSkillProgress).filter_by(user_id=user.id, skill_id=lesson.skill_id).first()
    skill_status = sp.status if sp else "IN_PROGRESS"

    return LessonCompletionResponse(
        lesson_completed=True,
        xp_earned=xp_earned,
        total_xp=user.total_xp,
        weekly_xp=user.weekly_xp,
        daily_xp=daily_xp,
        daily_goal=user.daily_goal,
        daily_goal_completed=(daily_xp >= user.daily_goal),
        streak=user.current_streak,
        longest_streak=user.longest_streak,
        skill_progress=100 if skill_status == "COMPLETED" else 50,
        skill_status=skill_status,
        next_skill_unlocked=(skill_status == "COMPLETED")
    )
