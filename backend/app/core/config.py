import json
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    anthropic_api_key: str
    allowed_origins: str = '["http://localhost:3000"]'
    demo_rate_limit_requests: int = 3
    demo_rate_limit_window_seconds: int = 86400

    @property
    def cors_origins(self) -> list[str]:
        return json.loads(self.allowed_origins)

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
