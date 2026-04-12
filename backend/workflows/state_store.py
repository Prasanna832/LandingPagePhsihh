from typing import Any


class InMemoryStateStore:
    def __init__(self):
        self._state: dict[str, dict[str, Any]] = {}

    async def set_state(self, key: str, value: dict[str, Any]):
        self._state[key] = value

    async def get_state(self, key: str) -> dict[str, Any] | None:
        return self._state.get(key)


state_store = InMemoryStateStore()
