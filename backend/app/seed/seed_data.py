from datetime import datetime, date
from sqlalchemy.orm import Session
from app.database import engine, Base, SessionLocal
import app.models as models

def seed_database(db: Session):
    print("Resetting database tables and seeding 4 Units with 5+ lessons each...")
    Base.metadata.drop_all(bind=db.get_bind())
    Base.metadata.create_all(bind=db.get_bind())

    # 1. Course
    course = models.Course(
        name="Hindi Essentials",
        language="Hindi",
        description="Master Hindi phrases, greetings, numbers, food, family, shopping, and daily conversation.",
        image_url="https://illustrations.puchu.pub/hindi_course.png"
    )
    db.add(course)
    db.flush()

    # -------------------------------------------------------------
    # UNIT 1: Basics & Greetings (5 Lessons)
    # -------------------------------------------------------------
    unit1 = models.Unit(course_id=course.id, title="SECTION 1, UNIT 1", description="Form basic Hindi sentences, introduce yourself, and greet people", order_index=1)
    db.add(unit1)
    db.flush()

    # Skill 1: Greetings
    s1 = models.Skill(unit_id=unit1.id, title="Greetings", description="Namaste & Dhanyavaad", icon="hand-wave", order_index=1)
    db.add(s1); db.flush()
    l1 = models.Lesson(skill_id=s1.id, title="Hindi Greetings", description="Hello & Thanks", order_index=1, xp_reward=15)
    db.add(l1); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l1.id, type="MULTIPLE_CHOICE", prompt="Select 'Hello':", data={"options": [{"id": "a", "text": "नमस्ते (Namaste)"}, {"id": "b", "text": "पानी (Paani)"}], "correct_option": "a"}, order_index=1),
        models.Exercise(lesson_id=l1.id, type="TYPE_ANSWER", prompt="Translate 'Dhanyavaad':", data={"accepted_answers": ["thank you", "thankyou", "thanks", "thank-you"]}, order_index=2),
    ])

    # Skill 2: Basics 1
    s2 = models.Skill(unit_id=unit1.id, title="Basics 1", description="Pronouns & Verbs", icon="star", order_index=2)
    db.add(s2); db.flush()
    l2 = models.Lesson(skill_id=s2.id, title="Pronouns & Verbs", description="Main, Tum, Aap", order_index=1, xp_reward=15)
    db.add(l2); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l2.id, type="MULTIPLE_CHOICE", prompt="Select 'I':", data={"options": [{"id": "a", "text": "मैं (Main)"}, {"id": "b", "text": "तुम (Tum)"}], "correct_option": "a"}, order_index=1),
        models.Exercise(lesson_id=l2.id, type="TYPE_ANSWER", prompt="Translate 'Haan':", data={"accepted_answers": ["yes"]}, order_index=2),
    ])

    # Skill 3: Chest 1 (Milestone)
    s3 = models.Skill(unit_id=unit1.id, title="Chest 1", description="Unit 1 Chest reward", icon="chest", order_index=3)
    db.add(s3); db.flush()

    # Skill 4: Polite Expressions
    s4 = models.Skill(unit_id=unit1.id, title="Polite Phrases", description="Kripaya & Ksama kijiye", icon="heart", order_index=4)
    db.add(s4); db.flush()
    l4 = models.Lesson(skill_id=s4.id, title="Polite Expressions", description="Please & Excuse me", order_index=1, xp_reward=15)
    db.add(l4); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l4.id, type="TYPE_ANSWER", prompt="Translate 'Kripaya':", data={"accepted_answers": ["please"]}, order_index=1),
    ])

    # Skill 5: Self Introduction
    s5 = models.Skill(unit_id=unit1.id, title="Introductions", description="Mera naam ... hai", icon="user", order_index=5)
    db.add(s5); db.flush()
    l5 = models.Lesson(skill_id=s5.id, title="Introduce Yourself", description="My name is...", order_index=1, xp_reward=15)
    db.add(l5); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l5.id, type="TYPE_ANSWER", prompt="Translate 'Naam':", data={"accepted_answers": ["name"]}, order_index=1),
    ])

    # Skill 6: Food & Drink
    s6 = models.Skill(unit_id=unit1.id, title="Food & Drink", description="Chai, Paani, Roti", icon="apple", order_index=6)
    db.add(s6); db.flush()
    l6 = models.Lesson(skill_id=s6.id, title="Food Words", description="Tea & Water", order_index=1, xp_reward=15)
    db.add(l6); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l6.id, type="TYPE_ANSWER", prompt="Translate 'Chai':", data={"accepted_answers": ["tea"]}, order_index=1),
    ])

    # -------------------------------------------------------------
    # UNIT 2: Family & Home (5 Lessons)
    # -------------------------------------------------------------
    unit2 = models.Unit(course_id=course.id, title="SECTION 1, UNIT 2", description="Talk about family members, friends, and home life", order_index=2)
    db.add(unit2); db.flush()

    s2_1 = models.Skill(unit_id=unit2.id, title="Family", description="Mata & Pita", icon="users", order_index=1)
    db.add(s2_1); db.flush()
    l2_1 = models.Lesson(skill_id=s2_1.id, title="Parents", description="Mother & Father", order_index=1, xp_reward=20)
    db.add(l2_1); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l2_1.id, type="TYPE_ANSWER", prompt="Translate 'Mata':", data={"accepted_answers": ["mother", "mom"]}, order_index=1),
    ])

    s2_2 = models.Skill(unit_id=unit2.id, title="Siblings", description="Bhai & Behen", icon="smile", order_index=2)
    db.add(s2_2); db.flush()
    l2_2 = models.Lesson(skill_id=s2_2.id, title="Brothers & Sisters", description="Bhai & Behen", order_index=1, xp_reward=20)
    db.add(l2_2); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l2_2.id, type="TYPE_ANSWER", prompt="Translate 'Bhai':", data={"accepted_answers": ["brother"]}, order_index=1),
    ])

    s2_3 = models.Skill(unit_id=unit2.id, title="Chest 2", description="Unit 2 Chest reward", icon="chest", order_index=3)
    db.add(s2_3); db.flush()

    s2_4 = models.Skill(unit_id=unit2.id, title="House", description="Ghar & Kamra", icon="home", order_index=4)
    db.add(s2_4); db.flush()
    l2_4 = models.Lesson(skill_id=s2_4.id, title="My Home", description="House & Room", order_index=1, xp_reward=20)
    db.add(l2_4); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l2_4.id, type="TYPE_ANSWER", prompt="Translate 'Ghar':", data={"accepted_answers": ["house", "home"]}, order_index=1),
    ])

    s2_5 = models.Skill(unit_id=unit2.id, title="Friends", description="Dost", icon="users", order_index=5)
    db.add(s2_5); db.flush()
    l2_5 = models.Lesson(skill_id=s2_5.id, title="Friendship", description="My Friend", order_index=1, xp_reward=20)
    db.add(l2_5); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l2_5.id, type="TYPE_ANSWER", prompt="Translate 'Dost':", data={"accepted_answers": ["friend"]}, order_index=1),
    ])

    s2_6 = models.Skill(unit_id=unit2.id, title="Pets & Animals", description="Kutta & Billi", icon="heart", order_index=6)
    db.add(s2_6); db.flush()
    l2_6 = models.Lesson(skill_id=s2_6.id, title="Animals", description="Dog & Cat", order_index=1, xp_reward=20)
    db.add(l2_6); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l2_6.id, type="TYPE_ANSWER", prompt="Translate 'Billi':", data={"accepted_answers": ["cat"]}, order_index=1),
    ])

    # -------------------------------------------------------------
    # UNIT 3: Numbers & Shopping (5 Lessons)
    # -------------------------------------------------------------
    unit3 = models.Unit(course_id=course.id, title="SECTION 1, UNIT 3", description="Count numbers and buy items at the market", order_index=3)
    db.add(unit3); db.flush()

    s3_1 = models.Skill(unit_id=unit3.id, title="Numbers 1-5", description="Ek, Do, Teen", icon="hash", order_index=1)
    db.add(s3_1); db.flush()
    l3_1 = models.Lesson(skill_id=s3_1.id, title="Counting 1-5", description="Counting 1-5", order_index=1, xp_reward=20)
    db.add(l3_1); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l3_1.id, type="TYPE_ANSWER", prompt="Translate 'Ek':", data={"accepted_answers": ["one", "1"]}, order_index=1),
    ])

    s3_2 = models.Skill(unit_id=unit3.id, title="Numbers 6-10", description="Chhah to Das", icon="hash", order_index=2)
    db.add(s3_2); db.flush()
    l3_2 = models.Lesson(skill_id=s3_2.id, title="Counting 6-10", description="Counting 6-10", order_index=1, xp_reward=20)
    db.add(l3_2); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l3_2.id, type="TYPE_ANSWER", prompt="Translate 'Das':", data={"accepted_answers": ["ten", "10"]}, order_index=1),
    ])

    s3_3 = models.Skill(unit_id=unit3.id, title="Chest 3", description="Unit 3 Chest reward", icon="chest", order_index=3)
    db.add(s3_3); db.flush()

    s3_4 = models.Skill(unit_id=unit3.id, title="Bazaar", description="Prices & Shopping", icon="shopping-bag", order_index=4)
    db.add(s3_4); db.flush()
    l3_4 = models.Lesson(skill_id=s3_4.id, title="Prices", description="Kitna daam hai?", order_index=1, xp_reward=20)
    db.add(l3_4); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l3_4.id, type="TYPE_ANSWER", prompt="Translate 'Rupaya':", data={"accepted_answers": ["rupee", "rupees"]}, order_index=1),
    ])

    s3_5 = models.Skill(unit_id=unit3.id, title="Colors", description="Lal, Peela, Neela", icon="star", order_index=5)
    db.add(s3_5); db.flush()
    l3_5 = models.Lesson(skill_id=s3_5.id, title="Colors", description="Red & Blue", order_index=1, xp_reward=20)
    db.add(l3_5); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l3_5.id, type="TYPE_ANSWER", prompt="Translate 'Lal':", data={"accepted_answers": ["red"]}, order_index=1),
    ])

    s3_6 = models.Skill(unit_id=unit3.id, title="Clothes", description="Kapde", icon="shopping-bag", order_index=6)
    db.add(s3_6); db.flush()
    l3_6 = models.Lesson(skill_id=s3_6.id, title="Clothing", description="Clothes", order_index=1, xp_reward=20)
    db.add(l3_6); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l3_6.id, type="TYPE_ANSWER", prompt="Translate 'Kapda':", data={"accepted_answers": ["cloth", "clothes"]}, order_index=1),
    ])

    # -------------------------------------------------------------
    # UNIT 4: Travel & Daily Life (5 Lessons)
    # -------------------------------------------------------------
    unit4 = models.Unit(course_id=course.id, title="SECTION 1, UNIT 4", description="Directions, travel, time, and daily routine", order_index=4)
    db.add(unit4); db.flush()

    s4_1 = models.Skill(unit_id=unit4.id, title="Directions", description="Kahan hai", icon="navigation", order_index=1)
    db.add(s4_1); db.flush()
    l4_1 = models.Lesson(skill_id=s4_1.id, title="Finding Places", description="Where is...", order_index=1, xp_reward=25)
    db.add(l4_1); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l4_1.id, type="TYPE_ANSWER", prompt="Translate 'Kahan':", data={"accepted_answers": ["where"]}, order_index=1),
    ])

    s4_2 = models.Skill(unit_id=unit4.id, title="Transport", description="Gadi & Auto", icon="navigation", order_index=2)
    db.add(s4_2); db.flush()
    l4_2 = models.Lesson(skill_id=s4_2.id, title="Transportation", description="Car & Train", order_index=1, xp_reward=25)
    db.add(l4_2); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l4_2.id, type="TYPE_ANSWER", prompt="Translate 'Gadi':", data={"accepted_answers": ["car", "vehicle"]}, order_index=1),
    ])

    s4_3 = models.Skill(unit_id=unit4.id, title="Chest 4", description="Unit 4 Chest reward", icon="chest", order_index=3)
    db.add(s4_3); db.flush()

    s4_4 = models.Skill(unit_id=unit4.id, title="Time & Days", description="Samay & Din", icon="clock", order_index=4)
    db.add(s4_4); db.flush()
    l4_4 = models.Lesson(skill_id=s4_4.id, title="Telling Time", description="What time is it?", order_index=1, xp_reward=25)
    db.add(l4_4); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l4_4.id, type="TYPE_ANSWER", prompt="Translate 'Din':", data={"accepted_answers": ["day"]}, order_index=1),
    ])

    s4_5 = models.Skill(unit_id=unit4.id, title="Weather", description="Mausam", icon="sun", order_index=5)
    db.add(s4_5); db.flush()
    l4_5 = models.Lesson(skill_id=s4_5.id, title="Weather Phrases", description="Hot & Cold", order_index=1, xp_reward=25)
    db.add(l4_5); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l4_5.id, type="TYPE_ANSWER", prompt="Translate 'Garmi':", data={"accepted_answers": ["summer", "hot", "heat"]}, order_index=1),
    ])

    s4_6 = models.Skill(unit_id=unit4.id, title="Routine", description="Subah & Shaam", icon="star", order_index=6)
    db.add(s4_6); db.flush()
    l4_6 = models.Lesson(skill_id=s4_6.id, title="Daily Routine", description="Morning & Evening", order_index=1, xp_reward=25)
    db.add(l4_6); db.flush()
    db.add_all([
        models.Exercise(lesson_id=l4_6.id, type="TYPE_ANSWER", prompt="Translate 'Subah':", data={"accepted_answers": ["morning"]}, order_index=1),
    ])

    # 3. Default User
    default_user = models.User(
        id=1,
        username="demo_learner",
        display_name="Paramjit",
        avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Paramjit",
        total_xp=0,
        weekly_xp=0,
        hearts=5,
        gems=500,
        claimed_quests_json="[]",
        current_streak=0,
        longest_streak=0,
        last_active_date=None,
        daily_goal=50
    )
    db.add(default_user)
    db.flush()

    # Reset initial user progress
    db.add(models.UserSkillProgress(user_id=default_user.id, skill_id=s1.id, status="NOT_STARTED"))
    db.add(models.UserLessonProgress(user_id=default_user.id, lesson_id=l1.id, status="NOT_STARTED"))

    # Seed Leaderboard
    leaderboard_users = [
        models.User(username="alex_pro", display_name="Alex", avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Alex", total_xp=1250, weekly_xp=450, hearts=5, gems=600, current_streak=7, longest_streak=12, daily_goal=50),
        models.User(username="maya_lingo", display_name="Maya", avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Maya", total_xp=980, weekly_xp=390, hearts=5, gems=550, current_streak=5, longest_streak=9, daily_goal=50),
        models.User(username="sam_dev", display_name="Sam", avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Sam", total_xp=750, weekly_xp=310, hearts=4, gems=400, current_streak=3, longest_streak=6, daily_goal=50),
        models.User(username="ryan_k", display_name="Ryan", avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Ryan", total_xp=520, weekly_xp=240, hearts=5, gems=300, current_streak=2, longest_streak=4, daily_goal=50),
    ]
    db.add_all(leaderboard_users)

    db.commit()
    print("Seeding completed successfully!")

if __name__ == "__main__":
    session = SessionLocal()
    try:
        seed_database(session)
    finally:
        session.close()
