import asyncio
import json
from collections import defaultdict
from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        self.connections: dict[str, set[WebSocket]] = defaultdict(set)
        self._lock = asyncio.Lock()

    async def connect(self, websocket: WebSocket, channel: str):
        await websocket.accept()
        async with self._lock:
            self.connections[channel].add(websocket)

    async def disconnect(self, websocket: WebSocket, channel: str):
        async with self._lock:
            if channel in self.connections and websocket in self.connections[channel]:
                self.connections[channel].remove(websocket)

    async def broadcast(self, channel: str, payload: dict):
        message = json.dumps(payload, default=str)
        sockets = list(self.connections.get(channel, set()))
        for socket in sockets:
            try:
                await socket.send_text(message)
            except Exception:
                await self.disconnect(socket, channel)


manager = ConnectionManager()
