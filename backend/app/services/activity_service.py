from datetime import date
from typing import Optional
from sqlalchemy.orm import Session
from app.models.activity import DailyActivity

def record_daily_activity(db: Session, user_id: int, xp_earned: int, lesson_completed: bool = False, today_date: Optional[date] = None) -> DailyActivity:
    if today_date is None:
        today_date = date.today()

    activity = db.query(DailyActivity).filter_by(user_id=user_id, activity_date=today_date).first()
    if not activity:
        activity = DailyActivity(
            user_id=user_id,
            activity_date=today_date,
            xp_earned=0,
            lessons_completed=0
        )
        db.add(activity)

    activity.xp_earned += xp_earned
    if lesson_completed:
        activity.lessons_completed += 1

    return activity

def get_daily_xp(db: Session, user_id: int, today_date: Optional[date] = None) -> int:
    if today_date is None:
        today_date = date.today()

    activity = db.query(DailyActivity).filter_by(user_id=user_id, activity_date=today_date).first()
    return activity.xp_earned if activity else 0
