from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from schemas.user import UserCreate, UserLogin, UserResponse
from auth import hash_password, verify_password, create_token

router = APIRouter()


@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    
    # ✅ Check if email already exists
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    # ✅ Hash the password
    hashed_password = hash_password(user.password)

    # ✅ Create new user
    new_user = User(
        name=user.name,
        email=user.email,
        role=user.role,
        password=hashed_password
    )

    # ✅ Save to DB
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    # ✅ Check if user exists
    existing = db.query(User).filter(User.email == user.email).first()
    if not existing:
        raise HTTPException(status_code=404, detail="User not found")

    # ✅ Verify password
    if not verify_password(user.password, existing.password):
        raise HTTPException(status_code=401, detail="Wrong password")

    # ✅ Create token
    token = create_token({
        "user_id": existing.id,
        "role": existing.role
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }