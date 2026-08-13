from datetime import datetime, date
from sqlalchemy.orm import Session
from app.database import engine, Base, SessionLocal
import app.models as models

def seed_database(db: Session):
    print("Resetting database tables...")
    Base.metadata.drop_all(bind=db.get_bind())
    Base.metadata.create_all(bind=db.get_bind())

    print("Seeding Hindi Language Course...")

    # 1. Course
    course = models.Course(
        name="Hindi Essentials",
        language="Hindi",
        description="Learn to speak, read, and write Hindi phrases, greetings, numbers, and daily conversation.",
        image_url="https://illustrations.puchu.pub/hindi_course.png"
    )
    db.add(course)
    db.flush()

    # 2. Unit 1: Basics & Greetings (बुनियादी बातें और अभिवादन)
    unit1 = models.Unit(
        course_id=course.id,
        title="SECTION 1, UNIT 1",
        description="Form basic Hindi sentences, introduce yourself, and greet people",
        order_index=1
    )
    db.add(unit1)
    db.flush()

    # Skill 1: Greetings (अभिवादन)
    skill1 = models.Skill(
        unit_id=unit1.id,
        title="Greetings",
        description="Say Namaste, Dhanyavaad, and introduce yourself.",
        icon="hand-wave",
        order_index=1
    )
    db.add(skill1)
    db.flush()

    # Single comprehensive Lesson for Skill 1 containing 7 varied Hindi exercises!
    lesson1 = models.Lesson(
        skill_id=skill1.id,
        title="Hindi Greetings & Phrases",
        description="Master essential Hindi greetings and polite expressions.",
        order_index=1,
        xp_reward=15
    )
    db.add(lesson1)
    db.flush()

    exercises1 = [
        models.Exercise(
            lesson_id=lesson1.id,
            type="MULTIPLE_CHOICE",
            prompt="Select the correct word for 'Hello / Greetings':",
            data={
                "options": [
                    {"id": "a", "text": "नमस्ते (Namaste)"},
                    {"id": "b", "text": "पानी (Paani)"},
                    {"id": "c", "text": "किताब (Kitaab)"}
                ],
                "correct_option": "a"
            },
            order_index=1
        ),
        models.Exercise(
            lesson_id=lesson1.id,
            type="WORD_BANK",
            prompt="Construct the sentence: Hello, how are you?",
            data={
                "prompt_translation": "Greetings in Hindi",
                "options": ["नमस्ते,", "आप", "कैसे", "हैं?", "सेब", "दूध"],
                "correct_sequence": ["नमस्ते,", "आप", "कैसे", "हैं?"]
            },
            order_index=2
        ),
        models.Exercise(
            lesson_id=lesson1.id,
            type="MATCH_PAIRS",
            prompt="Match the Hindi words with English translations:",
            data={
                "pairs": [
                    {"left": "Namaste", "right": "Hello"},
                    {"left": "Dhanyavaad", "right": "Thank you"},
                    {"left": "Haan", "right": "Yes"},
                    {"left": "Nahi", "right": "No"}
                ]
            },
            order_index=3
        ),
        models.Exercise(
            lesson_id=lesson1.id,
            type="FILL_BLANK",
            prompt="Complete the sentence: ___ नाम राहुल है (My name is Rahul)",
            data={
                "sentence_with_blank": "___ नाम राहुल है",
                "options": ["मेरा (Mera)", "तुम्हारा (Tumhara)", "वह (Woh)"],
                "correct_option": "मेरा (Mera)"
            },
            order_index=4
        ),
        models.Exercise(
            lesson_id=lesson1.id,
            type="TYPE_ANSWER",
            prompt="Translate 'Dhanyavaad' to English:",
            data={
                "accepted_answers": ["thank you", "Thank you", "thanks", "Thanks"]
            },
            order_index=5
        ),
        models.Exercise(
            lesson_id=lesson1.id,
            type="MULTIPLE_CHOICE",
            prompt="What does 'शुभ प्रभात' (Shubh Prabhat) mean?",
            data={
                "options": [
                    {"id": "a", "text": "Good Morning"},
                    {"id": "b", "text": "Good Night"},
                    {"id": "c", "text": "Goodbye"}
                ],
                "correct_option": "a"
            },
            order_index=6
        ),
        models.Exercise(
            lesson_id=lesson1.id,
            type="WORD_BANK",
            prompt="Construct: Thank you very much!",
            data={
                "options": ["बहुत", "बहुत", "धन्यवाद!", "पानी", "रोटी"],
                "correct_sequence": ["बहुत", "बहुत", "धन्यवाद!"]
            },
            order_index=7
        )
    ]
    db.add_all(exercises1)

    # Skill 2: Basics 1 (बुनियादी शब्द)
    skill2 = models.Skill(
        unit_id=unit1.id,
        title="Basics 1",
        description="Learn key Hindi pronouns and simple verbs.",
        icon="star",
        order_index=2
    )
    db.add(skill2)
    db.flush()

    lesson2 = models.Lesson(
        skill_id=skill2.id,
        title="Pronouns & Verbs",
        description="Master Main, Tum, Aap, and basic verbs.",
        order_index=1,
        xp_reward=15
    )
    db.add(lesson2)
    db.flush()

    exercises2 = [
        models.Exercise(
            lesson_id=lesson2.id,
            type="MULTIPLE_CHOICE",
            prompt="Select the Hindi pronoun for 'I':",
            data={
                "options": [
                    {"id": "a", "text": "मैं (Main)"},
                    {"id": "b", "text": "तुम (Tum)"},
                    {"id": "c", "text": "वह (Woh)"}
                ],
                "correct_option": "a"
            },
            order_index=1
        ),
        models.Exercise(
            lesson_id=lesson2.id,
            type="WORD_BANK",
            prompt="Construct: I am a student (मैं एक छात्र हूँ).",
            data={
                "options": ["मैं", "एक", "छात्र", "हूँ", "कलम", "किताब"],
                "correct_sequence": ["मैं", "एक", "छात्र", "हूँ"]
            },
            order_index=2
        ),
        models.Exercise(
            lesson_id=lesson2.id,
            type="MATCH_PAIRS",
            prompt="Match Hindi pronouns:",
            data={
                "pairs": [
                    {"left": "Main", "right": "I"},
                    {"left": "Tum", "right": "You"},
                    {"left": "Hum", "right": "We"},
                    {"left": "Woh", "right": "He/She"}
                ]
            },
            order_index=3
        ),
        models.Exercise(
            lesson_id=lesson2.id,
            type="FILL_BLANK",
            prompt="Fill in the blank: मैं पानी ___ हूँ (I am drinking water).",
            data={
                "sentence_with_blank": "मैं पानी ___ हूँ",
                "options": ["पी रहा (Peera)", "खा रहा (Khaara)", "सो रहा (Sora)"],
                "correct_option": "पी रहा (Peera)"
            },
            order_index=4
        ),
        models.Exercise(
            lesson_id=lesson2.id,
            type="TYPE_ANSWER",
            prompt="Translate 'Haan' to English:",
            data={
                "accepted_answers": ["yes", "Yes"]
            },
            order_index=5
        ),
        models.Exercise(
            lesson_id=lesson2.id,
            type="MULTIPLE_CHOICE",
            prompt="What is 'Water' in Hindi?",
            data={
                "options": [
                    {"id": "a", "text": "पानी (Paani)"},
                    {"id": "b", "text": "खाना (Khaana)"},
                    {"id": "c", "text": "दूध (Doodh)"}
                ],
                "correct_option": "a"
            },
            order_index=6
        ),
        models.Exercise(
            lesson_id=lesson2.id,
            type="WORD_BANK",
            prompt="Construct: You are good (आप अच्छे हैं).",
            data={
                "options": ["आप", "अच्छे", "हैं", "पेड़", "नदी"],
                "correct_sequence": ["आप", "अच्छे", "हैं"]
            },
            order_index=7
        )
    ]
    db.add_all(exercises2)

    # Milestone Skill 3: Chest
    skill3 = models.Skill(
        unit_id=unit1.id,
        title="Chest",
        description="Chest milestone reward",
        icon="chest",
        order_index=3
    )
    db.add(skill3)
    db.flush()

    # Skill 4: Food & Drink (खाना और पीना)
    skill4 = models.Skill(
        unit_id=unit1.id,
        title="Food & Drink",
        description="Learn food names in Hindi.",
        icon="apple",
        order_index=4
    )
    db.add(skill4)
    db.flush()

    lesson4 = models.Lesson(
        skill_id=skill4.id,
        title="Hindi Food Words",
        description="Rotis, Chai, Paani, and Meals.",
        order_index=1,
        xp_reward=15
    )
    db.add(lesson4)
    db.flush()

    exercises4 = [
        models.Exercise(
            lesson_id=lesson4.id,
            type="MULTIPLE_CHOICE",
            prompt="Select the word for 'Tea' in Hindi:",
            data={
                "options": [
                    {"id": "a", "text": "चाय (Chai)"},
                    {"id": "b", "text": "पानी (Paani)"},
                    {"id": "c", "text": "फल (Fal)"}
                ],
                "correct_option": "a"
            },
            order_index=1
        ),
        models.Exercise(
            lesson_id=lesson4.id,
            type="WORD_BANK",
            prompt="Construct: I drink tea (मैं चाय पीता हूँ).",
            data={
                "options": ["मैं", "चाय", "पीता", "हूँ", "कार", "घर"],
                "correct_sequence": ["मैं", "चाय", "पीता", "हूँ"]
            },
            order_index=2
        ),
        models.Exercise(
            lesson_id=lesson4.id,
            type="MATCH_PAIRS",
            prompt="Match food words:",
            data={
                "pairs": [
                    {"left": "Chai", "right": "Tea"},
                    {"left": "Doodh", "right": "Milk"},
                    {"left": "Roti", "right": "Bread"},
                    {"left": "Khaana", "right": "Food"}
                ]
            },
            order_index=3
        ),
        models.Exercise(
            lesson_id=lesson4.id,
            type="FILL_BLANK",
            prompt="Fill in the blank: मुझे ___ पसंद है (I like tea).",
            data={
                "sentence_with_blank": "मुझे ___ पसंद है",
                "options": ["चाय", "कुर्सी", "जूता"],
                "correct_option": "चाय"
            },
            order_index=4
        ),
        models.Exercise(
            lesson_id=lesson4.id,
            type="TYPE_ANSWER",
            prompt="Translate 'Chai' to English:",
            data={
                "accepted_answers": ["tea", "Tea"]
            },
            order_index=5
        ),
        models.Exercise(
            lesson_id=lesson4.id,
            type="MULTIPLE_CHOICE",
            prompt="What is 'Milk' in Hindi?",
            data={
                "options": [
                    {"id": "a", "text": "दूध (Doodh)"},
                    {"id": "b", "text": "तेल (Tel)"},
                    {"id": "c", "text": "नमक (Namak)"}
                ],
                "correct_option": "a"
            },
            order_index=6
        ),
        models.Exercise(
            lesson_id=lesson4.id,
            type="WORD_BANK",
            prompt="Construct: Give me water please.",
            data={
                "options": ["कृपया", "मुझे", "पानी", "दीजिए", "जूता"],
                "correct_sequence": ["कृपया", "मुझे", "पानी", "दीजिए"]
            },
            order_index=7
        )
    ]
    db.add_all(exercises4)

    # 3. Default User
    default_user = models.User(
        id=1,
        username="demo_learner",
        display_name="Paramjit",
        avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Paramjit",
        total_xp=0,
        weekly_xp=0,
        hearts=5,
        current_streak=0,
        longest_streak=0,
        last_active_date=None,
        daily_goal=50
    )
    db.add(default_user)
    db.flush()

    # Progress setup
    db.add(models.UserSkillProgress(user_id=default_user.id, skill_id=skill1.id, status="NOT_STARTED"))
    db.add(models.UserSkillProgress(user_id=default_user.id, skill_id=skill2.id, status="LOCKED"))
    db.add(models.UserSkillProgress(user_id=default_user.id, skill_id=skill3.id, status="LOCKED"))
    db.add(models.UserSkillProgress(user_id=default_user.id, skill_id=skill4.id, status="LOCKED"))

    db.add(models.UserLessonProgress(user_id=default_user.id, lesson_id=lesson1.id, status="NOT_STARTED"))
    db.add(models.UserLessonProgress(user_id=default_user.id, lesson_id=lesson2.id, status="LOCKED"))
    db.add(models.UserLessonProgress(user_id=default_user.id, lesson_id=lesson4.id, status="LOCKED"))

    # Seed Leaderboard
    leaderboard_users = [
        models.User(username="alex_pro", display_name="Alex", avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Alex", total_xp=1250, weekly_xp=450, hearts=5, current_streak=7, longest_streak=12, daily_goal=50),
        models.User(username="maya_lingo", display_name="Maya", avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Maya", total_xp=980, weekly_xp=390, hearts=5, current_streak=5, longest_streak=9, daily_goal=50),
        models.User(username="sam_dev", display_name="Sam", avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Sam", total_xp=750, weekly_xp=310, hearts=4, current_streak=3, longest_streak=6, daily_goal=50),
        models.User(username="ryan_k", display_name="Ryan", avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Ryan", total_xp=520, weekly_xp=240, hearts=5, current_streak=2, longest_streak=4, daily_goal=50),
    ]
    db.add_all(leaderboard_users)

    db.commit()
    print("Hindi course seeded successfully!")

if __name__ == "__main__":
    session = SessionLocal()
    try:
        seed_database(session)
    finally:
        session.close()
