import os
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
from models.user import User
from models.job import Job
from auth import hash_password

def seed_data():
    db = SessionLocal()
    
    # Check if there are any companies
    company = db.query(User).filter(User.role == "company").first()
    
    if not company:
        print("Creating dummy company...")
        company = User(
            name="Acme Corp",
            email="hr@acmecorp.com",
            role="company",
            password=hash_password("password123")
        )
        db.add(company)
        db.commit()
        db.refresh(company)
        
    # Check if jobs exist
    jobs_count = db.query(Job).count()
    if jobs_count == 0:
        print("Seeding dummy jobs...")
        dummy_jobs = [
            Job(
                title="Senior Frontend Engineer",
                description="We are looking for an experienced React/Next.js developer to join our remote team. Must have strong skills in building responsive, accessible UIs.",
                company_id=company.id,
                location="Remote",
                salary="$120k - $150k"
            ),
            Job(
                title="Python Backend Developer",
                description="Join our data engineering team to build high-performance APIs using FastAPI and PostgreSQL. Great benefits included.",
                company_id=company.id,
                location="New York, NY",
                salary="$130k - $160k"
            ),
            Job(
                title="Part-time UX Researcher",
                description="Help us understand our users better. Part-time contract role requiring 20 hours a week conducting user interviews and usability testing.",
                company_id=company.id,
                location="Remote",
                salary="Under $100k"
            ),
            Job(
                title="Full-Stack Web Developer",
                description="Looking for an amazing full-stack developer who knows TypeScript, Node.js, and complex system architectures.",
                company_id=company.id,
                location="San Francisco, CA",
                salary="$150k+"
            )
        ]
        db.add_all(dummy_jobs)
        db.commit()
        print("Added 4 dummy jobs successfully.")
    else:
        print(f"Database already contains {jobs_count} jobs.")
        
    db.close()

if __name__ == "__main__":
    seed_data()
