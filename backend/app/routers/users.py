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

@router.post("/{user_id}/favorites/{recipe_id}")
def add_favorite_recipe(user_id: int, recipe_id: int, db: Annotated[Any, Depends(get_db)]):
    res = add_recipe(db, user_id, recipe_id)
    return res

@router.delete("/{user_id}/favorites/{recipe_id}")
def unfavorite_recipe(user_id: int, recipe_id: int, db: Annotated[Any, Depends(get_db)]):
    res = remove_favorite(db, user_id, recipe_id)
    return res