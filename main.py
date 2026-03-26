from fastapi import FastAPI
from database import engine,Base
from models import job,application,user

from routers import auth,jobs,users,applications


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)
app.include_router(auth.router,prefix="/auth",tags=["Auth"])
app.include_router(users.router,prefix="/users",tags=["Users"])
app.include_router(applications.router,prefix="/applicants",tags=["Applicants"])
app.include_router(jobs.router, prefix="/jobs" , tags=["Job"])