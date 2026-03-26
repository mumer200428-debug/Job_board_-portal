from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)  
    name  = Column(String(100))
    email = Column(String(100))  
    password = Column(String(200))  
    role  = Column(String(20), default="candidate")
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active  = Column(Boolean, default=True)