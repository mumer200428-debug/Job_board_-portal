from sqlalchemy import Column,Integer,String,Boolean,DateTime,ForeignKey
from datetime import datetime
from database import Base

class Application(Base):
    __tablename__ = "applicants"
    id  = Column(Integer , primary_key=True  ,index=True)
    job_id = Column(Integer,ForeignKey ("jobs.id"))
    candidate_id = Column(Integer,ForeignKey ("users.id"))
    status = Column(String(20), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow) 


