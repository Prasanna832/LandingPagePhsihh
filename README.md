# Agentic SOC Platform

A full-stack AI-powered SOC platform with multi-agent threat processing, FastAPI backend, and cinematic React UI.

## Architecture

- **Backend (FastAPI)**: `backend/`
  - `agents/` (ingestion, triage, investigation, response, governance)
  - `services/` (auth, realtime websockets, mock LLM/intel/email)
  - `api/` (REST + websocket routes)
  - `models/` (SQLAlchemy ORM models)
  - `utils/` (config, security)
  - `workflows/` (async orchestration and state storage)
- **Frontend (React + Tailwind + Framer Motion + Recharts)**: `frontend/`

## Features

- End-to-end SOC pipeline: **alert → triage → investigation → response → audit**
- JWT auth + roles: **Admin / Analyst / Viewer**
- PostgreSQL-ready SQLAlchemy models (`users`, `alerts`, `incidents`, `actions`, `audit_logs`)
- WebSocket real-time channels (`alerts`, `incidents`, `actions`, `audit`)
- Cinematic dark UI, glassmorphism cards, animated gradient backdrop, live feed, charts, typing effect

## Run Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Optional PostgreSQL

```bash
export SOC_DATABASE_URL="postgresql+psycopg2://postgres:postgres@localhost:5432/agentic_soc"
```

If not set, SQLite (`backend/agentic_soc.db`) is used.

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Optional API URL override:

```bash
export VITE_API_URL="http://localhost:8000"
```

## Test Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pytest -q
```

## Sample Alert Ingestion

- Login as Admin/Analyst
- Open Dashboard
- Click **Ingest Sample Alert** to run full multi-agent pipeline
- Observe Incident, Response Panel, and Audit Logs updates in real time
