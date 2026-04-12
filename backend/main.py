from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import actions_router, alerts_router, audit_router, auth_router, incidents_router, ws_router
from database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Agentic SOC Platform", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(auth_router, prefix="/api")
app.include_router(alerts_router, prefix="/api")
app.include_router(incidents_router, prefix="/api")
app.include_router(actions_router, prefix="/api")
app.include_router(audit_router, prefix="/api")
app.include_router(ws_router)
