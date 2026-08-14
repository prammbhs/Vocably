import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.routers.users import get_current_user
from app.services import activity_service

router = APIRouter(prefix="/api/quests", tags=["Quests"])

class Quest(BaseModel):
    id: int
    title: str
    description: str
    current: int
    total: int
    reward: str
    reward_type: str  # 'gems' or 'hearts'
    reward_amount: int
    claimed: bool

class QuestsListResponse(BaseModel):
    quests: List[Quest]

class ClaimQuestResponse(BaseModel):
    message: str
    quest_id: int
    claimed: bool
    reward_type: str
    reward_amount: int
    gems: int
    hearts: int

QUEST_DEFINITIONS = [
    {
        "id": 1,
        "title": "Unit 1 Treasure Chest",
        "description": "Unlock and open the Unit 1 milestone chest",
        "total": 10,
        "reward": "100 Gems",
        "reward_type": "gems",
        "reward_amount": 100,
        "type": "xp"
    },
    {
        "id": 2,
        "title": "Unit 2 Treasure Chest",
        "description": "Unlock and open the Unit 2 milestone chest",
        "total": 1,
        "reward": "1 Heart & 50 Gems",
        "reward_type": "hearts",
        "reward_amount": 1,
        "type": "lesson"
    },
    {
        "id": 3,
        "title": "Daily Practice Master",
        "description": "Maintain your daily streak alive",
        "total": 1,
        "reward": "150 Gems",
        "reward_type": "gems",
        "reward_amount": 150,
        "type": "streak"
    }
]

def parse_claimed_quests(user: User) -> List[int]:
    if not user.claimed_quests_json:
        return []
    try:
        return json.loads(user.claimed_quests_json)
    except Exception:
        return []

def get_user_progress_for_quest(q_def: dict, user: User, db: Session) -> int:
    q_type = q_def["type"]
    if q_type == "xp":
        return min(q_def["total"], user.total_xp or 0)
    elif q_type == "lesson":
        from app.models import UserLessonProgress
        completed_count = db.query(UserLessonProgress).filter_by(
            user_id=user.id, status="COMPLETED"
        ).count()
        return min(q_def["total"], completed_count)
    elif q_type == "streak":
        return min(q_def["total"], user.current_streak or 0)
    return 0

@router.get("", response_model=QuestsListResponse)
def get_quests(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    claimed_ids = parse_claimed_quests(user)
    result_quests = []

    for q_def in QUEST_DEFINITIONS:
        current_val = get_user_progress_for_quest(q_def, user, db)
        is_claimed = q_def["id"] in claimed_ids

        result_quests.append(Quest(
            id=q_def["id"],
            title=q_def["title"],
            description=q_def["description"],
            current=current_val,
            total=q_def["total"],
            reward=q_def["reward"],
            reward_type=q_def["reward_type"],
            reward_amount=q_def["reward_amount"],
            claimed=is_claimed
        ))

    return QuestsListResponse(quests=result_quests)

@router.post("/{quest_id}/claim", response_model=ClaimQuestResponse)
def claim_quest(
    quest_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    q_def = next((q for q in QUEST_DEFINITIONS if q["id"] == quest_id), None)
    if not q_def:
        raise HTTPException(status_code=404, detail="Quest not found")

    claimed_ids = parse_claimed_quests(user)
    if quest_id in claimed_ids:
        raise HTTPException(status_code=400, detail="Quest already claimed")

    current_val = get_user_progress_for_quest(q_def, user, db)
    if current_val < q_def["total"]:
        raise HTTPException(status_code=400, detail="Quest requirements not met yet")

    # Grant reward
    if q_def["reward_type"] == "gems":
        user.gems = (user.gems or 0) + q_def["reward_amount"]
    elif q_def["reward_type"] == "hearts":
        user.hearts = min(5, (user.hearts or 0) + q_def["reward_amount"])

    # Mark as claimed
    claimed_ids.append(quest_id)
    user.claimed_quests_json = json.dumps(claimed_ids)

    db.commit()
    db.refresh(user)

    return ClaimQuestResponse(
        message=f"Successfully claimed reward for '{q_def['title']}'!",
        quest_id=quest_id,
        claimed=True,
        reward_type=q_def["reward_type"],
        reward_amount=q_def["reward_amount"],
        gems=user.gems,
        hearts=user.hearts
    )
