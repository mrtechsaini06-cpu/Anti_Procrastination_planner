from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import tasks

app = FastAPI(title="Anti-Procrastination Planner API", version="1.0.0")

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router, prefix="/api", tags=["tasks"])


@app.get("/")
def root():
    return {"message": "Anti-Procrastination Planner API is running!"}
