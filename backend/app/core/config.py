import os
# from dotenv import load_dotenv
from pathlib import Path
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
	# These will be taken from environment variables from docker container
	database_url: str
	secret_key: str
	algorithm: str
	access_token_expire_minutes: int = 60

	class Config:
		# backup option:
		# use local .env for local dev - process env vars override these from docker
		env_file = Path(__file__).resolve().parents[2] / ".env"
		env_file_encoding = 'utf-8'

settings = Settings()

# to get a secret string run:
# openssl rand -hex 32
