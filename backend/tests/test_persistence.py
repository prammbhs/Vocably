import pytest
from app.models import User, UserLessonProgress

def test_data_persists_in_database(client, db_session):
    # Complete lesson 1
    res = client.post("/api/lessons/1/complete")
    assert res.status_code == 200

    # Query database directly using session
    user = db_session.query(User).filter_by(id=1).first()
    assert user.total_xp == 15

    lesson_progress = db_session.query(UserLessonProgress).filter_by(
        user_id=1, lesson_id=1
    ).first()
    assert lesson_progress is not None
    assert lesson_progress.status == "COMPLETED"
