# Vocably Backend

The backend engine for Vocably — a modern, gamified language learning application inspired by Duolingo. Built with Python, FastAPI, SQLite, SQLAlchemy 2.x, Pydantic v2, and pytest.

---

## Tech Stack

- **Language**: Python 3.10+
- **Framework**: FastAPI
- **Database**: SQLite
- **ORM**: SQLAlchemy 2.x
- **Validation**: Pydantic v2 & Pydantic Settings
- **Testing**: pytest & httpx TestClient

---

## Setup & Running Instructions

### 1. Create & Activate Virtual Environment

```bash
cd backend
python -m venv venv

# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# On Linux/macOS:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Seed Database

Seed the database with the English Foundations course (3 units, 5 skills, 10+ lessons, 50+ exercises), default user, and leaderboard competitors:

```bash
python -m app.seed.seed_data
```

### 4. Run Development Server

```bash
uvicorn app.main:app --reload
```

The API will be available at:
- API Base URL: `http://localhost:8000`
- Swagger Interactive Docs: `http://localhost:8000/docs`
- ReDoc Docs: `http://localhost:8000/redoc`

---

## Running Automated Tests

Run the complete test suite:

```bash
pytest -v
```

All 15 automated test cases cover:
- Exercise answer verification across all 5 exercise types
- Heart deduction, floored non-negative limit, and practice restoration
- Idempotent lesson completion & XP rewards
- Streak date calculations (same day, consecutive day, missed day reset)
- Daily goal accumulation and completion tracking
- Sequential skill & lesson lock/unlock progression
- SQLite database persistence

---

## Directory Structure

```
backend/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   ├── course.py
│   │   ├── unit.py
│   │   ├── skill.py
│   │   ├── lesson.py
│   │   ├── exercise.py
│   │   ├── progress.py
│   │   ├── activity.py
│   │   └── attempt.py
│   │
│   ├── schemas/
│   │   ├── common.py
│   │   ├── user.py
│   │   ├── course.py
│   │   ├── lesson.py
│   │   ├── exercise.py
│   │   └── progress.py
│   │
│   ├── routers/
│   │   ├── users.py
│   │   ├── course.py
│   │   ├── lessons.py
│   │   ├── progress.py
│   │   └── leaderboard.py
│   │
│   ├── services/
│   │   ├── lesson_service.py
│   │   ├── gamification_service.py
│   │   ├── progression_service.py
│   │   └── activity_service.py
│   │
│   └── seed/
│       └── seed_data.py
│
├── tests/
│   ├── conftest.py
│   ├── test_exercises.py
│   ├── test_hearts.py
│   ├── test_xp.py
│   ├── test_streak.py
│   ├── test_daily_goal.py
│   ├── test_progression.py
│   └── test_persistence.py
│
├── docs/
│   ├── API.md
│   └── DATABASE.md
│
├── requirements.txt
├── .env.example
└── README.md
```

---

## Core Architectural Principles

1. **Backend Autonomy**: All authoritative gamification rules (hearts deduction, streak calculation, daily goal tracking, XP rewards, progression unlocking) are calculated solely on the backend.
2. **Idempotency**: Repeatedly completing a lesson will not award double XP or double streak count.
3. **Data-Driven Exercises**: Exercise type structures (`MULTIPLE_CHOICE`, `WORD_BANK`, `MATCH_PAIRS`, `FILL_BLANK`, `TYPE_ANSWER`) are validated via Pydantic schemas and stored as structured JSON.
