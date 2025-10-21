from fastapi import APIRouter, Depends, status
from typing import Annotated, Any
from app.services.user_service import *
from app.schemas.user import *
from app.db.session import get_db

router = APIRouter(prefix="/users")

@router.post("/", status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Annotated[Any, Depends(get_db)]):
    username = create_user(db, payload.username, payload.password)
    return username

@router.post("/login", status_code=status.HTTP_200_OK)
def login(payload: UserLogin, db: Annotated[Any, Depends(get_db)]):
    username = login_user(db, payload.username, payload.password)
    return username
