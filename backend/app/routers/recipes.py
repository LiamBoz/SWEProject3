from fastapi import APIRouter, Depends
from typing import Annotated, Any
from app.services.recipe_service import get_all_recipes
from app.db.session import get_db

router = APIRouter(prefix="/recipes")

@router.get("/")
async def get_recipes(db: Annotated[Any, Depends(get_db)]):
    return get_all_recipes(db)
