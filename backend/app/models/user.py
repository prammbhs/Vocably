from datetime import datetime, date
from typing import Optional, List
from sqlalchemy import String, Integer, Date, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    display_name: Mapped[str] = mapped_column(String(100), nullable=False)
    avatar_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    total_xp: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    weekly_xp: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    hearts: Mapped[int] = mapped_column(Integer, default=5, nullable=False)

    current_streak: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    longest_streak: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    last_active_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    daily_goal: Mapped[int] = mapped_column(Integer, default=50, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    skill_progresses: Mapped[List["UserSkillProgress"]] = relationship("UserSkillProgress", back_populates="user", cascade="all, delete-orphan")
    lesson_progresses: Mapped[List["UserLessonProgress"]] = relationship("UserLessonProgress", back_populates="user", cascade="all, delete-orphan")
    daily_activities: Mapped[List["DailyActivity"]] = relationship("DailyActivity", back_populates="user", cascade="all, delete-orphan")
    attempts: Mapped[List["LessonAttempt"]] = relationship("LessonAttempt", back_populates="user", cascade="all, delete-orphan")
