from sqlalchemy.orm import Session
from app.models import Course, Unit, Skill, Lesson, UserSkillProgress, UserLessonProgress
from app.schemas.course import CoursePathResponse, UnitPathResponse, SkillPathResponse
from app.schemas.lesson import LessonResponse

def get_course_path(db: Session, user_id: int) -> CoursePathResponse:
    course = db.query(Course).first()
    if not course:
        raise ValueError("No active course found in database.")

    # Fetch user skill progress and lesson progress maps
    skill_progress_map = {
        sp.skill_id: sp.status
        for sp in db.query(UserSkillProgress).filter_by(user_id=user_id).all()
    }
    lesson_progress_map = {
        lp.lesson_id: lp.status
        for lp in db.query(UserLessonProgress).filter_by(user_id=user_id).all()
    }

    units_response = []
    all_skills = []
    for unit in course.units:
        for skill in unit.skills:
            all_skills.append(skill)

    # Sort all skills globally by unit order then skill order
    all_skills.sort(key=lambda s: (s.unit.order_index, s.order_index))

    # Calculate skill statuses sequentially if missing
    calculated_skill_statuses = {}
    prev_skill_completed = True  # First skill is available by default

    for idx, skill in enumerate(all_skills):
        stored_status = skill_progress_map.get(skill.id)

        # Check lessons for this skill
        total_lessons = len(skill.lessons)
        completed_lessons = sum(
            1 for l in skill.lessons if lesson_progress_map.get(l.id) == "COMPLETED"
        )

        if completed_lessons == total_lessons and total_lessons > 0:
            effective_status = "COMPLETED"
        elif completed_lessons > 0 or stored_status == "IN_PROGRESS":
            effective_status = "IN_PROGRESS"
        elif stored_status in ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]:
            effective_status = stored_status
        elif prev_skill_completed:
            effective_status = "NOT_STARTED"
        else:
            effective_status = "LOCKED"

        calculated_skill_statuses[skill.id] = (effective_status, completed_lessons, total_lessons)
        prev_skill_completed = (effective_status == "COMPLETED")

    # Build Response
    for unit in course.units:
        skills_response = []
        for skill in unit.skills:
            status, completed_count, total_count = calculated_skill_statuses[skill.id]

            # Build lessons for this skill
            lessons_response = []
            prev_lesson_completed = (status in ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"])

            for lesson in skill.lessons:
                stored_l_status = lesson_progress_map.get(lesson.id)
                if status == "LOCKED":
                    eff_l_status = "LOCKED"
                elif stored_l_status == "COMPLETED":
                    eff_l_status = "COMPLETED"
                elif stored_l_status in ["NOT_STARTED", "IN_PROGRESS"]:
                    eff_l_status = stored_l_status
                elif prev_lesson_completed:
                    eff_l_status = "NOT_STARTED"
                else:
                    eff_l_status = "LOCKED"

                prev_lesson_completed = (eff_l_status == "COMPLETED")

                lessons_response.append(LessonResponse(
                    id=lesson.id,
                    skill_id=lesson.skill_id,
                    title=lesson.title,
                    description=lesson.description,
                    order_index=lesson.order_index,
                    xp_reward=lesson.xp_reward,
                    status=eff_l_status,
                    created_at=lesson.created_at,
                    updated_at=lesson.updated_at
                ))

            skills_response.append(SkillPathResponse(
                id=skill.id,
                unit_id=skill.unit_id,
                title=skill.title,
                description=skill.description,
                icon=skill.icon,
                order_index=skill.order_index,
                status=status,
                total_lessons=total_count,
                completed_lessons=completed_count,
                lessons=lessons_response
            ))

        units_response.append(UnitPathResponse(
            id=unit.id,
            course_id=unit.course_id,
            title=unit.title,
            description=unit.description,
            order_index=unit.order_index,
            skills=skills_response
        ))

    return CoursePathResponse(
        id=course.id,
        name=course.name,
        language=course.language,
        description=course.description,
        image_url=course.image_url,
        units=units_response
    )
