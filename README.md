# 🧠 Anti-Procrastination Planner

An AI-powered web app that breaks down overwhelming tasks into tiny, psychologically-optimized micro-steps — so you stop overthinking and start doing.

## Features
- 🤖 AI task breakdown using Gemini
- 😊 Mood-based task adaptation
- ⏱️ Built-in focus timer per task
- ✅ Task completion tracking with progress bar
- 💬 Motivational nudges throughout

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: FastAPI (Python)
- **AI**: Google Gemini 1.5 Flash

---

## Setup Instructions

### 1. Get a Gemini API Key
- Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- Create a free API key

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt

# Copy the example env file and add your key
copy .env.example .env
# Open .env and replace "your_gemini_api_key_here" with your actual key

# Start the backend
uvicorn main:app --reload
```
Backend runs at: http://localhost:8000

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

---

## Project Structure
```
anti-procrastination-planner/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── routes/tasks.py      # API route for task breakdown
│   ├── prompts/             # AI prompt templates
│   ├── requirements.txt
│   └── .env                 # Your API key goes here (create from .env.example)
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api/tasks.js     # API calls
│   │   └── components/
│   │       ├── Header.jsx
│   │       ├── TaskInput.jsx
│   │       ├── TaskList.jsx
│   │       └── FocusTimer.jsx
│   └── package.json
└── README.md
```
