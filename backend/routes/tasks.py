import os
import json
import re
from groq import Groq
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

router = APIRouter()

# Load prompt template
prompt_path = Path(__file__).parent.parent / "prompts" / "breakdown_prompt.txt"
PROMPT_TEMPLATE = prompt_path.read_text(encoding="utf-8")


class TaskRequest(BaseModel):
    task: str
    mood: str = "neutral"
    available_time: int = 60  # minutes


class Task(BaseModel):
    id: int
    title: str
    description: str
    duration: int
    difficulty: str
    motivational_note: str | None = None


class TaskResponse(BaseModel):
    tasks: list[Task]
    encouragement: str
    estimated_total_time: int


@router.post("/breakdown", response_model=TaskResponse)
async def breakdown_task(request: TaskRequest):
    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="GROQ_API_KEY not configured. Please add it to your .env file."
        )

    if not request.task.strip():
        raise HTTPException(status_code=400, detail="Task cannot be empty.")

    # Build the prompt using safe string replacement
    prompt = (PROMPT_TEMPLATE
              .replace("{user_task}", request.task)
              .replace("{mood}", request.mood)
              .replace("{available_time}", str(request.available_time)))

    try:
        client = Groq(api_key=api_key)

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert anti-procrastination coach. Always respond with valid JSON only — no extra text, no markdown fences."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_tokens=2048,
        )

        raw_text = response.choices[0].message.content.strip()

        # Strip markdown code fences if present
        raw_text = re.sub(r"^```json\s*", "", raw_text)
        raw_text = re.sub(r"^```\s*", "", raw_text)
        raw_text = re.sub(r"\s*```$", "", raw_text)

        data = json.loads(raw_text)
        return TaskResponse(**data)

    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI returned an unexpected format. Please try again. ({str(e)})"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
