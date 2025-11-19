from fastapi import APIRouter, Depends, status
from typing import Annotated, Any
from app.services.user_service import *
from app.schemas.user import *
from app.db.session import get_db

router = APIRouter(prefix="/users")

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=RegisterResponse)
async def register(payload: UserCreate, db: Annotated[Any, Depends(get_db)]):
    res = await create_user(db, payload.username, payload.password)
    return res

@router.post("/login", status_code=status.HTTP_200_OK, response_model=LoginResponse)
async def login(payload: UserLogin, db: Annotated[Any, Depends(get_db)]):
    res = await login_user(db, payload.username, payload.password)
    return res 

@router.post("/{username}/favorites/{recipe_id}", status_code=status.HTTP_200_OK)
def add_favorite_recipe(username: str, recipe_id: int, db: Annotated[Any, Depends(get_db)]):
    res = add_recipe(db, username, recipe_id)
    return res

@router.delete("/{username}/favorites/{recipe_id}")
def unfavorite_recipe(username: str, recipe_id: int, db: Annotated[Any, Depends(get_db)]):
    res = remove_favorite(db, username, recipe_id)
    return res

@router.get("/{username}/favorites/{recipe_id}")
def is_favorited(username: str, recipe_id: int, db: Annotated[Any, Depends(get_db)]):
    return user_favorites_recipe(db, username, recipe_id)

@router.get("/{username}/favorites")
def get_favorites(username: str, db: Annotated[Any, Depends(get_db)]):
    return user_get_favorites(db, username)
