# Vocably Database Documentation

Database Engine: **SQLite**  
ORM Framework: **SQLAlchemy 2.x**

---

## Entity Relationship (ER) Diagram

```mermaid
erDiagram
    COURSES ||--o{ UNITS : "contains"
    UNITS ||--o{ SKILLS : "contains"
    SKILLS ||--o{ LESSONS : "contains"
    LESSONS ||--o{ EXERCISES : "contains"

    USERS ||--o{ USER_SKILL_PROGRESS : "tracks"
    USERS ||--o{ USER_LESSON_PROGRESS : "tracks"
    USERS ||--o{ DAILY_ACTIVITY : "logs"
    USERS ||--o{ LESSON_ATTEMPTS : "records"

    SKILLS ||--o{ USER_SKILL_PROGRESS : "relates"
    LESSONS ||--o{ USER_LESSON_PROGRESS : "relates"
    LESSONS ||--o{ LESSON_ATTEMPTS : "relates"
    EXERCISES ||--o{ LESSON_ATTEMPTS : "relates"

    USERS {
        int id PK
        string username UK
        string display_name
        string avatar_url
        int total_xp
        int weekly_xp
        int hearts
        int current_streak
        int longest_streak
        date last_active_date
        int daily_goal
        datetime created_at
        datetime updated_at
    }

    COURSES {
        int id PK
        string name
        string language
        string description
        string image_url
        datetime created_at
        datetime updated_at
    }

    UNITS {
        int id PK
        int course_id FK
        string title
        string description
        int order_index
        datetime created_at
        datetime updated_at
    }

    SKILLS {
        int id PK
        int unit_id FK
        string title
        string description
        string icon
        int order_index
        datetime created_at
        datetime updated_at
    }

    LESSONS {
        int id PK
        int skill_id FK
        string title
        string description
        int order_index
        int xp_reward
        datetime created_at
        datetime updated_at
    }

    EXERCISES {
        int id PK
        int lesson_id FK
        string type
        string prompt
        json data
        int order_index
        datetime created_at
        datetime updated_at
    }

    USER_SKILL_PROGRESS {
        int user_id PK, FK
        int skill_id PK, FK
        string status
        datetime created_at
        datetime updated_at
    }

    USER_LESSON_PROGRESS {
        int user_id PK, FK
        int lesson_id PK, FK
        string status
        datetime created_at
        datetime updated_at
    }

    DAILY_ACTIVITY {
        int id PK
        int user_id FK
        date activity_date UK
        int xp_earned
        int lessons_completed
        datetime created_at
        datetime updated_at
    }

    LESSON_ATTEMPTS {
        int id PK
        int user_id FK
        int lesson_id FK
        int exercise_id FK
        json answer
        boolean is_correct
        boolean heart_lost
        datetime created_at
    }
```

---

## Schema Rationale & Key Constraints

1. **Separation of Content and User Progress**:
   - `courses`, `units`, `skills`, `lessons`, and `exercises` define static course content.
   - `user_skill_progress`, `user_lesson_progress`, `daily_activity`, and `lesson_attempts` record dynamic learner progression.
   - This ensures content can be updated independently without affecting user history.

2. **Composite Primary Keys for Progress Tracking**:
   - `user_skill_progress` uses composite primary key `(user_id, skill_id)`.
   - `user_lesson_progress` uses composite primary key `(user_id, lesson_id)`.
   - This enforces at most 1 progress record per user per skill/lesson at the database level.

3. **Ordering Constraints**:
   - `units`: `UNIQUE(course_id, order_index)`
   - `skills`: `UNIQUE(unit_id, order_index)`
   - `lessons`: `UNIQUE(skill_id, order_index)`
   - `exercises`: `UNIQUE(lesson_id, order_index)`

4. **Data-Driven Exercise Storage (`JSON` column)**:
   - `exercises.data` uses SQLite JSON support to accommodate all 5 required exercise types (`MULTIPLE_CHOICE`, `WORD_BANK`, `MATCH_PAIRS`, `FILL_BLANK`, `TYPE_ANSWER`) cleanly without rigid relational sub-tables.

5. **Foreign Key Integrity**:
   - SQLite `PRAGMA foreign_keys=ON;` is explicitly enabled on every connection via SQLAlchemy event listeners.
   - Cascading deletes (`ON DELETE CASCADE`) are set on foreign keys.
