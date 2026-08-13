from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import PracticeResponse
from app.routers.users import get_current_user
from app.services import gamification_service

router = APIRouter(prefix="/api", tags=["Practice & Hearts"])

@router.post("/practice", response_model=PracticeResponse)
def practice_heart_refill(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    prev_hearts = user.hearts
    new_hearts = gamification_service.refill_heart(user, amount=1)
    db.commit()
    db.refresh(user)

    restored = new_hearts - prev_hearts
    msg = f"Restored {restored} heart! Total hearts: {new_hearts}" if restored > 0 else "Hearts are already full!"

    return PracticeResponse(
        message=msg,
        hearts_restored=restored,
        hearts_remaining=new_hearts
    )
