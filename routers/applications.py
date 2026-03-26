from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from database import get_db
from models.application import Application
from models.job import Job
from schemas.application import ApplicationCreate, ApplicationResponse
from auth import verify_token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# =========================
# AUTH
# =========================

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


# =========================
# APPLY FOR JOB (Candidate)
# =========================

@router.post("/", response_model=ApplicationResponse)
def apply_for_job(
    data: ApplicationCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    if user["role"] != "candidate":
        raise HTTPException(status_code=403, detail="Only candidates can apply")

    job = db.query(Job).filter(Job.id == data.job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    existing = db.query(Application).filter(
        Application.job_id == data.job_id,
        Application.user_id == user["user_id"]
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Already applied")

    new_application = Application(
        job_id=data.job_id,
        user_id=user["user_id"],
        status="pending"
    )

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return new_application


# =========================
# GET MY APPLICATIONS
# =========================

@router.get("/", response_model=list[ApplicationResponse])
def get_my_applications(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    if user["role"] != "candidate":
        raise HTTPException(status_code=403, detail="Only candidates allowed")

    apps = db.query(Application).filter(
        Application.user_id == user["user_id"]
    ).all()

    return apps


# =========================
# GET SINGLE APPLICATION
# =========================

@router.get("/{application_id}", response_model=ApplicationResponse)
def get_application(
    application_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    app = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    if user["role"] == "candidate" and app.user_id != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    return app


# =========================
# UPDATE STATUS (Company)
# =========================

@router.put("/{application_id}/status", response_model=ApplicationResponse)
def update_status(
    application_id: int,
    status: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    if user["role"] != "company":
        raise HTTPException(status_code=403, detail="Only companies allowed")

    app = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    job = db.query(Job).filter(Job.id == app.job_id).first()

    if job.company_id != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    if status not in ["accepted", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    app.status = status

    db.commit()
    db.refresh(app)

    return app