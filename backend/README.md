# Agentic SOC Backend

## Run

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Test

```bash
pytest -q
```

## PostgreSQL

Set:

```bash
export SOC_DATABASE_URL="postgresql+psycopg2://postgres:postgres@localhost:5432/agentic_soc"
```

Then restart app. Tables:
- users
- alerts
- incidents
- actions
- audit_logs
