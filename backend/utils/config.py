from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Agentic SOC Platform"
    environment: str = "dev"
    secret_key: str = "change-me-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 120
    database_url: str = "sqlite:///./agentic_soc.db"
    use_redis: bool = False
    redis_url: str = "redis://localhost:6379/0"
    llm_mode: str = "mock"

    model_config = SettingsConfigDict(env_file=".env", env_prefix="SOC_")


settings = Settings()
