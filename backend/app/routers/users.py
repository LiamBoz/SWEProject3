from fastapi import APIRouter, Depends, status
from typing import Annotated, Any
from app.services.user_service import *
from app.schemas.user import *
from app.db.session import get_db

router = APIRouter(prefix="/users")

@router.post("/", status_code=status.HTTP_201_CREATED)
async def register(payload: UserCreate, db: Annotated[Any, Depends(get_db)]):
    username = await create_user(db, payload.username, payload.password)
    return username

@router.post("/login", status_code=status.HTTP_200_OK)
async def login(payload: UserLogin, db: Annotated[Any, Depends(get_db)]):
    username = await login_user(db, payload.username, payload.password)
    return username
