from typing import Annotated
from fastapi import FastAPI
from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str

class UserDB(User):
    id: int
    password_hash: str