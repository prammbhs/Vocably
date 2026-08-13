from datetime import datetime, date
from sqlalchemy.orm import Session
from app.database import engine, Base, SessionLocal
import app.models as models

def seed_database(db: Session):
    print("Creating tables if they don't exist...")
    Base.metadata.create_all(bind=db.get_bind())

    # Check if course already seeded
    existing_course = db.query(models.Course).filter_by(name="English Foundations").first()
    if existing_course:
        print("Database already seeded with English Foundations course.")
        return

    print("Seeding English Foundations course...")

    # 1. Course
    course = models.Course(
        name="English Foundations",
        language="English",
        description="Master essential English vocabulary, grammar, and everyday conversation.",
        image_url="https://illustrations.puchu.pub/english_course.png"
    )
    db.add(course)
    db.flush()

    # 2. Units, Skills, Lessons, Exercises
    # --- Unit 1: Basics & Greetings ---
    unit1 = models.Unit(
        course_id=course.id,
        title="Basics & Greetings",
        description="Learn basic English greetings, introductions, and polite phrases.",
        order_index=1
    )
    db.add(unit1)
    db.flush()

    # Skill 1: Greetings
    skill1 = models.Skill(
        unit_id=unit1.id,
        title="Greetings",
        description="Say hello, goodbye, and introduce yourself.",
        icon="hand-wave",
        order_index=1
    )
    db.add(skill1)
    db.flush()

    # Lesson 1: Saying Hello
    lesson1_1 = models.Lesson(
        skill_id=skill1.id,
        title="Saying Hello",
        description="Learn standard English greetings.",
        order_index=1,
        xp_reward=10
    )
    db.add(lesson1_1)
    db.flush()

    exercises1_1 = [
        models.Exercise(
            lesson_id=lesson1_1.id,
            type="MULTIPLE_CHOICE",
            prompt="Select the correct word for 'Hello':",
            data={
                "options": [
                    {"id": "a", "text": "Hello"},
                    {"id": "b", "text": "Goodbye"},
                    {"id": "c", "text": "Table"}
                ],
                "correct_option": "a"
            },
            order_index=1
        ),
        models.Exercise(
            lesson_id=lesson1_1.id,
            type="WORD_BANK",
            prompt="Construct the sentence: Hello, how are you?",
            data={
                "prompt_translation": "Greetings question",
                "options": ["Hello,", "how", "are", "you?", "cat", "water"],
                "correct_sequence": ["Hello,", "how", "are", "you?"]
            },
            order_index=2
        ),
        models.Exercise(
            lesson_id=lesson1_1.id,
            type="MATCH_PAIRS",
            prompt="Match the corresponding pairs:",
            data={
                "pairs": [
                    {"left": "Hello", "right": "Hola"},
                    {"left": "Goodbye", "right": "Adiós"},
                    {"left": "Please", "right": "Por favor"}
                ]
            },
            order_index=3
        ),
        models.Exercise(
            lesson_id=lesson1_1.id,
            type="FILL_BLANK",
            prompt="Fill in the blank:",
            data={
                "sentence_with_blank": "___ morning, nice to meet you!",
                "options": ["Good", "Bad", "Red"],
                "correct_option": "Good"
            },
            order_index=4
        ),
        models.Exercise(
            lesson_id=lesson1_1.id,
            type="TYPE_ANSWER",
            prompt="Translate 'Hola' to English:",
            data={
                "accepted_answers": ["hello", "Hello", "hi", "Hi"]
            },
            order_index=5
        )
    ]
    db.add_all(exercises1_1)

    # Lesson 2: Farewell & Manners
    lesson1_2 = models.Lesson(
        skill_id=skill1.id,
        title="Farewell & Manners",
        description="Learn polite expressions and goodbyes.",
        order_index=2,
        xp_reward=10
    )
    db.add(lesson1_2)
    db.flush()

    exercises1_2 = [
        models.Exercise(
            lesson_id=lesson1_2.id,
            type="MULTIPLE_CHOICE",
            prompt="What is the polite response to 'Thank you'?",
            data={
                "options": [
                    {"id": "a", "text": "You are welcome"},
                    {"id": "b", "text": "No hello"},
                    {"id": "c", "text": "Goodbye"}
                ],
                "correct_option": "a"
            },
            order_index=1
        ),
        models.Exercise(
            lesson_id=lesson1_2.id,
            type="WORD_BANK",
            prompt="Construct the sentence: Have a nice day!",
            data={
                "options": ["Have", "a", "nice", "day!", "apple", "running"],
                "correct_sequence": ["Have", "a", "nice", "day!"]
            },
            order_index=2
        ),
        models.Exercise(
            lesson_id=lesson1_2.id,
            type="MATCH_PAIRS",
            prompt="Match the words with their meanings:",
            data={
                "pairs": [
                    {"left": "Thank you", "right": "Gracias"},
                    {"left": "You're welcome", "right": "De nada"},
                    {"left": "See you", "right": "Nos vemos"}
                ]
            },
            order_index=3
        ),
        models.Exercise(
            lesson_id=lesson1_2.id,
            type="FILL_BLANK",
            prompt="Complete the sentence:",
            data={
                "sentence_with_blank": "See you ___, have fun!",
                "options": ["later", "chair", "tree"],
                "correct_option": "later"
            },
            order_index=4
        ),
        models.Exercise(
            lesson_id=lesson1_2.id,
            type="TYPE_ANSWER",
            prompt="Translate 'Gracias' to English:",
            data={
                "accepted_answers": ["thank you", "Thank you", "thanks", "Thanks"]
            },
            order_index=5
        )
    ]
    db.add_all(exercises1_2)

    # Skill 2: Essentials 1
    skill2 = models.Skill(
        unit_id=unit1.id,
        title="Essentials 1",
        description="Master key pronouns and basic verbs.",
        icon="star",
        order_index=2
    )
    db.add(skill2)
    db.flush()

    lesson2_1 = models.Lesson(
        skill_id=skill2.id,
        title="People & Pronouns",
        description="I, you, he, she, and we.",
        order_index=1,
        xp_reward=10
    )
    db.add(lesson2_1)
    db.flush()

    exercises2_1 = [
        models.Exercise(
            lesson_id=lesson2_1.id,
            type="MULTIPLE_CHOICE",
            prompt="Select the pronoun for a female person:",
            data={
                "options": [
                    {"id": "a", "text": "She"},
                    {"id": "b", "text": "He"},
                    {"id": "c", "text": "It"}
                ],
                "correct_option": "a"
            },
            order_index=1
        ),
        models.Exercise(
            lesson_id=lesson2_1.id,
            type="WORD_BANK",
            prompt="Construct: I am a student.",
            data={
                "options": ["I", "am", "a", "student.", "car", "table"],
                "correct_sequence": ["I", "am", "a", "student."]
            },
            order_index=2
        ),
        models.Exercise(
            lesson_id=lesson2_1.id,
            type="MATCH_PAIRS",
            prompt="Match the pronouns:",
            data={
                "pairs": [
                    {"left": "I", "right": "Yo"},
                    {"left": "You", "right": "Tú"},
                    {"left": "We", "right": "Nosotros"}
                ]
            },
            order_index=3
        ),
        models.Exercise(
            lesson_id=lesson2_1.id,
            type="FILL_BLANK",
            prompt="Fill in the blank:",
            data={
                "sentence_with_blank": "She ___ a teacher.",
                "options": ["is", "are", "am"],
                "correct_option": "is"
            },
            order_index=4
        ),
        models.Exercise(
            lesson_id=lesson2_1.id,
            type="TYPE_ANSWER",
            prompt="Translate 'Yo soy' to English:",
            data={
                "accepted_answers": ["i am", "I am", "I'm", "i'm"]
            },
            order_index=5
        )
    ]
    db.add_all(exercises2_1)

    # --- Unit 2: Food & Everyday Life ---
    unit2 = models.Unit(
        course_id=course.id,
        title="Food & Everyday Life",
        description="Learn vocabulary for food, drinks, and daily activities.",
        order_index=2
    )
    db.add(unit2)
    db.flush()

    # Skill 3: Food
    skill3 = models.Skill(
        unit_id=unit2.id,
        title="Food & Drinks",
        description="Order meals, name fruits, and request drinks.",
        icon="apple",
        order_index=1
    )
    db.add(skill3)
    db.flush()

    lesson3_1 = models.Lesson(
        skill_id=skill3.id,
        title="Breakfast & Drinks",
        description="Coffee, water, bread, and apples.",
        order_index=1,
        xp_reward=10
    )
    db.add(lesson3_1)
    db.flush()

    exercises3_1 = [
        models.Exercise(
            lesson_id=lesson3_1.id,
            type="MULTIPLE_CHOICE",
            prompt="Select the English word for 'Agua':",
            data={
                "options": [
                    {"id": "a", "text": "Water"},
                    {"id": "b", "text": "Milk"},
                    {"id": "c", "text": "Juice"}
                ],
                "correct_option": "a"
            },
            order_index=1
        ),
        models.Exercise(
            lesson_id=lesson3_1.id,
            type="WORD_BANK",
            prompt="Construct: I drink coffee in the morning.",
            data={
                "options": ["I", "drink", "coffee", "in", "the", "morning.", "shoe"],
                "correct_sequence": ["I", "drink", "coffee", "in", "the", "morning."]
            },
            order_index=2
        ),
        models.Exercise(
            lesson_id=lesson3_1.id,
            type="MATCH_PAIRS",
            prompt="Match food items:",
            data={
                "pairs": [
                    {"left": "Apple", "right": "Manzana"},
                    {"left": "Bread", "right": "Pan"},
                    {"left": "Coffee", "right": "Café"}
                ]
            },
            order_index=3
        ),
        models.Exercise(
            lesson_id=lesson3_1.id,
            type="FILL_BLANK",
            prompt="Complete the order:",
            data={
                "sentence_with_blank": "I would like a glass of ___, please.",
                "options": ["water", "pencil", "hat"],
                "correct_option": "water"
            },
            order_index=4
        ),
        models.Exercise(
            lesson_id=lesson3_1.id,
            type="TYPE_ANSWER",
            prompt="Translate 'Manzana' to English:",
            data={
                "accepted_answers": ["apple", "Apple", "an apple", "An apple"]
            },
            order_index=5
        )
    ]
    db.add_all(exercises3_1)

    # Skill 4: Daily Phrases
    skill4 = models.Skill(
        unit_id=unit2.id,
        title="Daily Phrases",
        description="Talk about habits and routines.",
        icon="coffee",
        order_index=2
    )
    db.add(skill4)
    db.flush()

    lesson4_1 = models.Lesson(
        skill_id=skill4.id,
        title="Everyday Actions",
        description="Read, write, walk, and sleep.",
        order_index=1,
        xp_reward=10
    )
    db.add(lesson4_1)
    db.flush()

    exercises4_1 = [
        models.Exercise(
            lesson_id=lesson4_1.id,
            type="MULTIPLE_CHOICE",
            prompt="What is the verb for looking at words in a book?",
            data={
                "options": [
                    {"id": "a", "text": "Read"},
                    {"id": "b", "text": "Sleep"},
                    {"id": "c", "text": "Jump"}
                ],
                "correct_option": "a"
            },
            order_index=1
        ),
        models.Exercise(
            lesson_id=lesson4_1.id,
            type="WORD_BANK",
            prompt="Construct: We read books every day.",
            data={
                "options": ["We", "read", "books", "every", "day.", "flying"],
                "correct_sequence": ["We", "read", "books", "every", "day."]
            },
            order_index=2
        ),
        models.Exercise(
            lesson_id=lesson4_1.id,
            type="MATCH_PAIRS",
            prompt="Match actions:",
            data={
                "pairs": [
                    {"left": "Read", "right": "Leer"},
                    {"left": "Sleep", "right": "Dormir"},
                    {"left": "Walk", "right": "Caminar"}
                ]
            },
            order_index=3
        ),
        models.Exercise(
            lesson_id=lesson4_1.id,
            type="FILL_BLANK",
            prompt="Fill in the blank:",
            data={
                "sentence_with_blank": "I ___ eight hours every night.",
                "options": ["sleep", "eat", "write"],
                "correct_option": "sleep"
            },
            order_index=4
        ),
        models.Exercise(
            lesson_id=lesson4_1.id,
            type="TYPE_ANSWER",
            prompt="Translate 'Leer' to English:",
            data={
                "accepted_answers": ["read", "Read", "to read", "To read"]
            },
            order_index=5
        )
    ]
    db.add_all(exercises4_1)

    # --- Unit 3: Travel & Questions ---
    unit3 = models.Unit(
        course_id=course.id,
        title="Travel & Questions",
        description="Ask for directions and navigate travel situations.",
        order_index=3
    )
    db.add(unit3)
    db.flush()

    # Skill 5: Travel
    skill5 = models.Skill(
        unit_id=unit3.id,
        title="Travel & Navigation",
        description="Airports, trains, hotels, and directions.",
        icon="airplane",
        order_index=1
    )
    db.add(skill5)
    db.flush()

    lesson5_1 = models.Lesson(
        skill_id=skill5.id,
        title="At the Station",
        description="Tickets, trains, and destinations.",
        order_index=1,
        xp_reward=10
    )
    db.add(lesson5_1)
    db.flush()

    exercises5_1 = [
        models.Exercise(
            lesson_id=lesson5_1.id,
            type="MULTIPLE_CHOICE",
            prompt="Select the word for 'Boleto/Billet':",
            data={
                "options": [
                    {"id": "a", "text": "Ticket"},
                    {"id": "b", "text": "Window"},
                    {"id": "c", "text": "Street"}
                ],
                "correct_option": "a"
            },
            order_index=1
        ),
        models.Exercise(
            lesson_id=lesson5_1.id,
            type="WORD_BANK",
            prompt="Construct: Where is the train station?",
            data={
                "options": ["Where", "is", "the", "train", "station?", "apple"],
                "correct_sequence": ["Where", "is", "the", "train", "station?"]
            },
            order_index=2
        ),
        models.Exercise(
            lesson_id=lesson5_1.id,
            type="MATCH_PAIRS",
            prompt="Match travel words:",
            data={
                "pairs": [
                    {"left": "Train", "right": "Tren"},
                    {"left": "Ticket", "right": "Boleto"},
                    {"left": "Airport", "right": "Aeropuerto"}
                ]
            },
            order_index=3
        ),
        models.Exercise(
            lesson_id=lesson5_1.id,
            type="FILL_BLANK",
            prompt="Fill in the blank:",
            data={
                "sentence_with_blank": "One ___ to London, please.",
                "options": ["ticket", "cheese", "cloud"],
                "correct_option": "ticket"
            },
            order_index=4
        ),
        models.Exercise(
            lesson_id=lesson5_1.id,
            type="TYPE_ANSWER",
            prompt="Translate 'Dónde está' to English:",
            data={
                "accepted_answers": ["where is", "Where is", "where's", "Where's"]
            },
            order_index=5
        )
    ]
    db.add_all(exercises5_1)

    # 3. Default Learner (User ID = 1)
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

    # Initial Progress setup for Default Learner:
    # Skill 1 is NOT_STARTED (AVAILABLE), all other skills LOCKED
    skill_progress_1 = models.UserSkillProgress(
        user_id=default_user.id,
        skill_id=skill1.id,
        status="NOT_STARTED"
    )
    db.add(skill_progress_1)

    for sk in [skill2, skill3, skill4, skill5]:
        db.add(models.UserSkillProgress(
            user_id=default_user.id,
            skill_id=sk.id,
            status="LOCKED"
        ))

    # Lesson 1_1 is NOT_STARTED, all other lessons LOCKED
    lesson_progress_1_1 = models.UserLessonProgress(
        user_id=default_user.id,
        lesson_id=lesson1_1.id,
        status="NOT_STARTED"
    )
    db.add(lesson_progress_1_1)

    for les in [lesson1_2, lesson2_1, lesson3_1, lesson4_1, lesson5_1]:
        db.add(models.UserLessonProgress(
            user_id=default_user.id,
            lesson_id=les.id,
            status="LOCKED"
        ))

    # 4. Seed Leaderboard Competitors
    leaderboard_users = [
        models.User(username="alex_pro", display_name="Alex", avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Alex", total_xp=1250, weekly_xp=450, hearts=5, current_streak=7, longest_streak=12, daily_goal=50),
        models.User(username="maya_lingo", display_name="Maya", avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Maya", total_xp=980, weekly_xp=390, hearts=5, current_streak=5, longest_streak=9, daily_goal=50),
        models.User(username="sam_dev", display_name="Sam", avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Sam", total_xp=750, weekly_xp=310, hearts=4, current_streak=3, longest_streak=6, daily_goal=50),
        models.User(username="ryan_k", display_name="Ryan", avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Ryan", total_xp=520, weekly_xp=240, hearts=5, current_streak=2, longest_streak=4, daily_goal=50),
        models.User(username="elena_v", display_name="Elena", avatar_url="https://api.dicebear.com/7.x/bottts/svg?seed=Elena", total_xp=410, weekly_xp=180, hearts=5, current_streak=1, longest_streak=3, daily_goal=50),
    ]
    db.add_all(leaderboard_users)

    db.commit()
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    session = SessionLocal()
    try:
        seed_database(session)
    finally:
        session.close()
