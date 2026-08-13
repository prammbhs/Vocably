from datetime import date, timedelta
from app.models.user import User

def update_streak(user: User, today_date: date) -> int:
    if user.last_active_date == today_date:
        # Already active today, no change to streak
        return user.current_streak
    elif user.last_active_date == today_date - timedelta(days=1):
        # Consecutive day activity
        user.current_streak += 1
    else:
        # Missed previous days or first time activity
        user.current_streak = 1

    user.longest_streak = max(user.longest_streak, user.current_streak)
    user.last_active_date = today_date
    return user.current_streak

def deduct_heart(user: User) -> tuple[int, bool]:
    if user.hearts > 0:
        user.hearts -= 1
        return user.hearts, True
    return 0, False

def refill_heart(user: User, amount: int = 1) -> int:
    user.hearts = min(user.hearts + amount, 5)
    return user.hearts

def award_xp(user: User, xp: int) -> None:
    user.total_xp += xp
    user.weekly_xp += xp
