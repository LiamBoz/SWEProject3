from typing import Annotated
from fastapi import FastAPI
from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserLoginOut(BaseModel):
    pass

class UserCreateOut(BaseModel):
    username: str

