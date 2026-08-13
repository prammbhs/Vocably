from datetime import date, timedelta
from app.services.gamification_service import update_streak
from app.models import User

def test_streak_unit_logic():
    user = User(
        username="test_streak_user",
        display_name="Test Streak",
        current_streak=0,
        longest_streak=0,
        last_active_date=None
    )

    today = date(2026, 8, 13)

    # First activity ever
    streak1 = update_streak(user, today)
    assert streak1 == 1
    assert user.current_streak == 1
    assert user.longest_streak == 1
    assert user.last_active_date == today

    # Same day activity (no increment)
    streak2 = update_streak(user, today)
    assert streak2 == 1
    assert user.current_streak == 1

    # Consecutive day activity (+1 increment)
    tomorrow = today + timedelta(days=1)
    streak3 = update_streak(user, tomorrow)
    assert streak3 == 2
    assert user.current_streak == 2
    assert user.longest_streak == 2

    # Missed day activity (reset to 1)
    three_days_later = tomorrow + timedelta(days=2)
    streak4 = update_streak(user, three_days_later)
    assert streak4 == 1
    assert user.current_streak == 1
    assert user.longest_streak == 2  # Longest streak preserved!
