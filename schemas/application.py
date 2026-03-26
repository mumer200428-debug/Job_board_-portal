from pydantic import BaseModel
from datetime import datetime


class ApplicationCreate(BaseModel):
    job_id : int



class ApplicationResponse(BaseModel):
    id: int
    job_id: int
    candidate_id: int
    status: str
    created_at: datetime
