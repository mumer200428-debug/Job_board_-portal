from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
from models.job import Job
from schemas.job import JobCreate, JobResponse
from auth import verify_token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# =========================
# AUTH HELPERS
# =========================

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


def require_company(user=Depends(get_current_user)):
    if user.get("role") != "company":
        raise HTTPException(status_code=403, detail="Only companies allowed")
    return user


# =========================
# CREATE JOB (Company Only)
# =========================

@router.post("/", response_model=JobResponse)
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db),
    user=Depends(require_company)
):
    new_job = Job(
        title=job.title,
        salary=job.salary,
        description=job.description,
        location=job.location,
        company_id=user["user_id"]   # IMPORTANT
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return new_job


# =========================
# GET ALL JOBS (Public)
# =========================

@router.get("/", response_model=list[JobResponse])
def get_all_jobs(db: Session = Depends(get_db)):
    jobs = db.query(Job).all()
    return jobs


# =========================
# GET SINGLE JOB (Public)
# =========================

@router.get("/{job_id}", response_model=JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job


# =========================
# UPDATE JOB (Company Only)
# =========================

@router.put("/{job_id}", response_model=JobResponse)
def update_job(
    job_id: int,
    updated_job: JobCreate,
    db: Session = Depends(get_db),
    user=Depends(require_company)
):
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    # Ensure company owns the job
    if job.company_id != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    job.title = updated_job.title
    job.salary = updated_job.salary
    job.description = updated_job.description
    job.location = updated_job.location

    db.commit()
    db.refresh(job)

    return job


# =========================
# DELETE JOB (Company Only)
# =========================

@router.delete("/{job_id}")
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_company)
):
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    # Ownership check
    if job.company_id != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    db.delete(job)
    db.commit()

    return {"message": "Job deleted successfully"}