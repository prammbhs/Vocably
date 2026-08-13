from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
import app.models as models
from app.routers import users, course, lessons, progress, leaderboard

# Ensure tables exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Vocably API",
    description="Authoritative Gamified Language Learning API for Vocably",
    version="1.0.0",
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

@app.get("/")
def read_root():
    return {
        "message": "Welcome to Vocably API",
        "docs_url": "/docs",
        "status": "online"
    }
