import pytest
from app.models import Exercise

def test_multiple_choice_correct_and_incorrect(client, db_session):
    # Exercise 1 in Lesson 1 is MULTIPLE_CHOICE
    res = client.post(
        "/api/lessons/1/exercises/1/answer",
        json={"answer": {"option_id": "a"}}
    )
    assert res.status_code == 200
    data = res.json()
    assert data["correct"] is True
    assert data["hearts_remaining"] == 5

    # Incorrect answer
    res_wrong = client.post(
        "/api/lessons/1/exercises/1/answer",
        json={"answer": {"option_id": "b"}}
    )
    assert res_wrong.status_code == 200
    data_wrong = res_wrong.json()
    assert data_wrong["correct"] is False
    assert data_wrong["correct_answer"] == "Hello"
    assert data_wrong["hearts_remaining"] == 4

def test_word_bank_exercise(client):
    # Exercise 2 in Lesson 1 is WORD_BANK ("Hello,", "how", "are", "you?")
    res = client.post(
        "/api/lessons/1/exercises/2/answer",
        json={"answer": {"sequence": ["Hello,", "how", "are", "you?"]}}
    )
    assert res.status_code == 200
    assert res.json()["correct"] is True

    res_wrong = client.post(
        "/api/lessons/1/exercises/2/answer",
        json={"answer": {"sequence": ["how", "Hello,"]}}
    )
    assert res_wrong.status_code == 200
    assert res_wrong.json()["correct"] is False

def test_match_pairs_exercise(client):
    # Exercise 3 in Lesson 1 is MATCH_PAIRS
    res = client.post(
        "/api/lessons/1/exercises/3/answer",
        json={"answer": {"pairs": [
            {"left": "Hello", "right": "Hola"},
            {"left": "Goodbye", "right": "Adiós"},
            {"left": "Please", "right": "Por favor"}
        ]}}
    )
    assert res.status_code == 200
    assert res.json()["correct"] is True

def test_fill_blank_exercise(client):
    # Exercise 4 in Lesson 1 is FILL_BLANK ("Good")
    res = client.post(
        "/api/lessons/1/exercises/4/answer",
        json={"answer": {"selected_word": "Good"}}
    )
    assert res.status_code == 200
    assert res.json()["correct"] is True

def test_type_answer_exercise(client):
    # Exercise 5 in Lesson 1 is TYPE_ANSWER ("hello")
    res = client.post(
        "/api/lessons/1/exercises/5/answer",
        json={"answer": {"text": "  HELLO "}}
    )
    assert res.status_code == 200
    assert res.json()["correct"] is True

def test_invalid_exercise_or_mismatch(client):
    # Exercise not belonging to lesson
    res = client.post(
        "/api/lessons/1/exercises/999/answer",
        json={"answer": {"text": "hello"}}
    )
    assert res.status_code == 404
