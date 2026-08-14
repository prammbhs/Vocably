from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base, SessionLocal
import app.models as models
from app.routers import users, course, lessons, progress, leaderboard, quests

# Ensure tables exist
Base.metadata.create_all(bind=engine)

def auto_seed_if_empty():
    db = SessionLocal()
    try:
        # Check if course or units missing/empty, seed if needed
        if not db.query(models.Course).first() or db.query(models.Unit).count() < 4:
            from app.seed.seed_data import seed_database
            seed_database(db)
    except Exception as e:
        print(f"Auto-seed check error: {e}")
    finally:
        db.close()

@asynccontextmanager
async def lifespan(app: FastAPI):
    auto_seed_if_empty()
    yield

app = FastAPI(
    title="Vocably API",
    description="Authoritative Gamified Language Learning API for Vocably",
    version="1.0.0",
    lifespan=lifespan
)


# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(users.router)
app.include_router(course.router)
app.include_router(lessons.router)
app.include_router(progress.router)
app.include_router(leaderboard.router)
app.include_router(quests.router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to Vocably API",
        "docs_url": "/docs",
        "status": "online"
    }
