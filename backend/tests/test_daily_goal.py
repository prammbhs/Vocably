import pytest

def test_daily_goal_accumulation_and_completion(client):
    progress_initial = client.get("/api/users/me/progress").json()
    assert progress_initial["daily_xp"] == 0
    assert progress_initial["daily_goal"] == 50
    assert progress_initial["daily_goal_completed"] is False

    # Complete lesson 1 (+10 XP)
    client.post("/api/lessons/1/complete")

    progress_after_1 = client.get("/api/users/me/progress").json()
    assert progress_after_1["daily_xp"] == 10
    assert progress_after_1["daily_goal_completed"] is False

    # Complete lesson 2 (+10 XP)
    client.post("/api/lessons/2/complete")

    progress_after_2 = client.get("/api/users/me/progress").json()
    assert progress_after_2["daily_xp"] == 20
