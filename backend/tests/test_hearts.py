import pytest

def test_hearts_decrease_and_non_negative(client):
    # Submit 6 wrong answers to deplete hearts (initial hearts = 5)
    for i in range(5):
        res = client.post(
            "/api/lessons/1/exercises/1/answer",
            json={"answer": {"option_id": "wrong"}}
        )
        assert res.status_code == 200
        assert res.json()["hearts_remaining"] == 4 - i

    # 6th wrong answer when hearts = 0
    res_6th = client.post(
        "/api/lessons/1/exercises/1/answer",
        json={"answer": {"option_id": "wrong"}}
    )
    assert res_6th.status_code == 200
    assert res_6th.json()["hearts_remaining"] == 0

def test_zero_hearts_blocks_lesson_completion(client):
    # Deplete hearts
    for _ in range(5):
        client.post("/api/lessons/1/exercises/1/answer", json={"answer": {"option_id": "wrong"}})

    # Complete lesson should fail with HTTP 400
    res = client.post("/api/lessons/1/complete")
    assert res.status_code == 400
    assert "0 hearts" in res.json()["detail"]

def test_practice_restores_heart(client):
    # Deplete 2 hearts
    for _ in range(2):
        client.post("/api/lessons/1/exercises/1/answer", json={"answer": {"option_id": "wrong"}})

    progress_before = client.get("/api/users/me/progress").json()
    assert progress_before["hearts"] == 3

    # Practice to restore 1 heart
    res_practice = client.post("/api/practice")
    assert res_practice.status_code == 200
    data = res_practice.json()
    assert data["hearts_restored"] == 1
    assert data["hearts_remaining"] == 4

    progress_after = client.get("/api/users/me/progress").json()
    assert progress_after["hearts"] == 4
