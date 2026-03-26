from datetime import datetime
from pydantic import BaseModel


class JobCreate(BaseModel):
    title: str
    description: str
    location: str
    salary: str


class JobResponse(BaseModel):
    id: int
    title: str
    description: str
    location: str
    salary: str
    company_id: int
    is_active: bool
    created_at: datetime