from sqlalchemy import Column,Integer,String,Boolean,DateTime,ForeignKey
from datetime import datetime
from  database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(String, nullable=False)
    
    company_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    location = Column(String(100))
    salary = Column(String(50))  # "1000-2000"
    
    is_active = Column(Boolean, default=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)