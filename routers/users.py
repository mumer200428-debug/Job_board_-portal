from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
from models.user import User
from auth import verify_token

router = APIRouter()

# =========================
# AUTH SETUP
# =========================

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


# =========================
# SCHEMAS
# =========================

from schemas.user import UserResponse

class UserUpdate(BaseModel):
    name: str


# =========================
# GET PROFILE
# =========================

@router.get("/me", response_model=UserResponse)
def get_profile(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    db_user = db.query(User).filter(User.id == user["user_id"]).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user


# =========================
# UPDATE PROFILE
# =========================

@router.put("/me", response_model=UserResponse)
def update_profile(
    data: UserUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    db_user = db.query(User).filter(User.id == user["user_id"]).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update only name
    db_user.name = data.name

    db.commit()
    db.refresh(db_user)

    return db_user