import pytest

def test_skill_and_lesson_progression_unlocking(client):
    # Get initial course path
    path = client.get("/api/course/path").json()
    skills = path["units"][0]["skills"]

    # Skill 1 should be AVAILABLE / NOT_STARTED
    assert skills[0]["status"] in ["NOT_STARTED", "AVAILABLE"]
    # Skill 2 should be LOCKED
    assert skills[1]["status"] == "LOCKED"

    # Complete Lesson 1 in Skill 1
    client.post("/api/lessons/1/complete")

    path_after_lesson1 = client.get("/api/course/path").json()
    skills_after = path_after_lesson1["units"][0]["skills"]

    # Skill 1 is now COMPLETED (since Skill 1 has 1 lesson)
    assert skills_after[0]["status"] == "COMPLETED"
    # Skill 2 is now UNLOCKED (NOT_STARTED / AVAILABLE)!
    assert skills_after[1]["status"] in ["NOT_STARTED", "AVAILABLE"]
