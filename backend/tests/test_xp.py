import pytest

def test_lesson_completion_awards_xp(client):
    user_before = client.get("/api/users/me").json()
    assert user_before["total_xp"] == 0

    res = client.post("/api/lessons/1/complete")
    assert res.status_code == 200
    data = res.json()
    assert data["lesson_completed"] is True
    assert data["xp_earned"] == 10
    assert data["total_xp"] == 10

def test_duplicate_completion_idempotency(client):
    # Complete lesson 1 first time
    res1 = client.post("/api/lessons/1/complete")
    assert res1.json()["xp_earned"] == 10
    assert res1.json()["total_xp"] == 10

    # Complete lesson 1 second time
    res2 = client.post("/api/lessons/1/complete")
    assert res2.status_code == 200
    assert res2.json()["lesson_completed"] is True
    assert res2.json()["xp_earned"] == 0  # No duplicate XP
    assert res2.json()["total_xp"] == 10  # Total XP unchanged
