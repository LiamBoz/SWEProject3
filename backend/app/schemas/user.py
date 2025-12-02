from typing import Annotated
from fastapi import FastAPI
from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    username: str

class RegisterResponse(BaseModel):
    username: str
    token: str
    is_admin: bool

class LoginResponse(BaseModel):
    username: str
    token: str
    is_admin: bool
