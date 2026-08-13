# Vocably API Documentation

The Vocably API powers the authoritative learning loop, gamification logic, and user progress persistence.

Base URL: `http://localhost:8000`  
OpenAPI / Swagger UI: `http://localhost:8000/docs`

---

## Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/course/path` | Get the structured course learning path with derived skill & lesson lock states |
| **GET** | `/api/lessons/{lesson_id}` | Get details and exercise sequence for a specific lesson |
| **POST** | `/api/lessons/{lesson_id}/exercises/{exercise_id}/answer` | Submit an exercise answer, validate correctness, record attempt, and deduct hearts if incorrect |
| **POST** | `/api/lessons/{lesson_id}/complete` | Idempotently complete a lesson, award XP, update daily activity, streak, and unlock next skills |
| **POST** | `/api/practice` | Practice mode to restore 1 heart (up to max 5) |
| **GET** | `/api/users/me` | Get current authenticated user details |
| **GET** | `/api/users/me/progress` | Get user's current XP, hearts, streak, and daily goal progress |
| **GET** | `/api/users/me/profile` | Get comprehensive user profile stats and achievements |
| **GET** | `/api/leaderboard` | Get weekly/total XP rankings highlighting current user |

---

## Detailed Endpoint Contracts

### 1. Learning Path

#### `GET /api/course/path`
Returns the active course hierarchy (Course → Units → Skills → Lessons) along with dynamic progression status (`LOCKED`, `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`).

**Response `200 OK`**:
```json
{
  "id": 1,
  "name": "English Foundations",
  "language": "English",
  "description": "Master essential English vocabulary, grammar, and everyday conversation.",
  "image_url": "https://illustrations.puchu.pub/english_course.png",
  "units": [
    {
      "id": 1,
      "course_id": 1,
      "title": "Basics & Greetings",
      "description": "Learn basic English greetings, introductions, and polite phrases.",
      "order_index": 1,
      "skills": [
        {
          "id": 1,
          "unit_id": 1,
          "title": "Greetings",
          "description": "Say hello, goodbye, and introduce yourself.",
          "icon": "hand-wave",
          "order_index": 1,
          "status": "NOT_STARTED",
          "total_lessons": 2,
          "completed_lessons": 0,
          "lessons": [
            {
              "id": 1,
              "skill_id": 1,
              "title": "Saying Hello",
              "description": "Learn standard English greetings.",
              "order_index": 1,
              "xp_reward": 10,
              "status": "NOT_STARTED"
            }
          ]
        }
      ]
    }
  ]
}
```

---

### 2. Lessons & Exercises

#### `GET /api/lessons/{lesson_id}`
Returns lesson details and exercises.

**Response `200 OK`**:
```json
{
  "id": 1,
  "skill_id": 1,
  "title": "Saying Hello",
  "description": "Learn standard English greetings.",
  "order_index": 1,
  "xp_reward": 10,
  "status": "NOT_STARTED",
  "exercises": [
    {
      "id": 1,
      "lesson_id": 1,
      "type": "MULTIPLE_CHOICE",
      "prompt": "Select the correct word for 'Hello':",
      "data": {
        "options": [
          {"id": "a", "text": "Hello"},
          {"id": "b", "text": "Goodbye"}
        ],
        "correct_option": "a"
      },
      "order_index": 1
    }
  ]
}
```

---

### 3. Answer Submission

#### `POST /api/lessons/{lesson_id}/exercises/{exercise_id}/answer`
Submits an answer for evaluation. Deducts 1 heart if incorrect (floored at 0).

**Request Body Example (Multiple Choice)**:
```json
{
  "answer": {
    "option_id": "a"
  }
}
```

**Response `200 OK` (Correct)**:
```json
{
  "correct": true,
  "feedback": "Awesome! That's correct.",
  "correct_answer": null,
  "hearts_remaining": 5
}
```

**Response `200 OK` (Incorrect)**:
```json
{
  "correct": false,
  "feedback": "Not quite! Keep trying.",
  "correct_answer": "Hello",
  "hearts_remaining": 4
}
```

---

### 4. Lesson Completion

#### `POST /api/lessons/{lesson_id}/complete`
Idempotently completes a lesson. Awards XP, updates streak, daily activity, and unlocks progression.

**Response `200 OK`**:
```json
{
  "lesson_completed": true,
  "xp_earned": 10,
  "total_xp": 10,
  "weekly_xp": 10,
  "daily_xp": 10,
  "daily_goal": 50,
  "daily_goal_completed": false,
  "streak": 1,
  "longest_streak": 1,
  "skill_progress": 50,
  "skill_status": "IN_PROGRESS",
  "next_skill_unlocked": false
}
```

---

### 5. Practice Mode (Hearts Refill)

#### `POST /api/practice`
Restores 1 heart up to maximum 5.

**Response `200 OK`**:
```json
{
  "message": "Restored 1 heart! Total hearts: 5",
  "hearts_restored": 1,
  "hearts_remaining": 5
}
```

---

### 6. User Profile & Progress

#### `GET /api/users/me/progress`
**Response `200 OK`**:
```json
{
  "user_id": 1,
  "total_xp": 10,
  "weekly_xp": 10,
  "hearts": 5,
  "current_streak": 1,
  "longest_streak": 1,
  "daily_xp": 10,
  "daily_goal": 50,
  "daily_goal_completed": false
}
```

#### `GET /api/users/me/profile`
**Response `200 OK`**:
```json
{
  "user_id": 1,
  "username": "demo_learner",
  "display_name": "Paramjit",
  "avatar_url": "https://api.dicebear.com/7.x/bottts/svg?seed=Paramjit",
  "total_xp": 10,
  "weekly_xp": 10,
  "current_streak": 1,
  "longest_streak": 1,
  "lessons_completed": 1,
  "skills_completed": 0,
  "daily_goal": 50,
  "created_at": "2026-08-13T12:00:00"
}
```

---

### 7. Leaderboard

#### `GET /api/leaderboard`
**Response `200 OK`**:
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "user_id": 2,
      "username": "alex_pro",
      "display_name": "Alex",
      "avatar_url": "https://api.dicebear.com/7.x/bottts/svg?seed=Alex",
      "weekly_xp": 450,
      "total_xp": 1250,
      "is_current_user": false
    },
    {
      "rank": 6,
      "user_id": 1,
      "username": "demo_learner",
      "display_name": "Paramjit",
      "avatar_url": "https://api.dicebear.com/7.x/bottts/svg?seed=Paramjit",
      "weekly_xp": 10,
      "total_xp": 10,
      "is_current_user": true
    }
  ],
  "user_rank": 6
}
```
