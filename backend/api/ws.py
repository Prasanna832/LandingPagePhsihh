from fastapi import APIRouter, WebSocket

from services.realtime import manager

router = APIRouter(tags=["ws"])


@router.websocket("/ws/{channel}")
async def websocket_channel(websocket: WebSocket, channel: str):
    await manager.connect(websocket, channel)
    try:
        while True:
            await websocket.receive_text()
    except Exception:
        await manager.disconnect(websocket, channel)
