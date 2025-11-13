from fastapi import APIRouter, Depends
from typing import Annotated, Any
from app.services.recipe_service import *
from app.db.session import get_db
from app.schemas.recipe import *

router = APIRouter(prefix="/recipes")

@router.get("/")
def get_recipes(db: Annotated[Any, Depends(get_db)]):
    return get_all_recipes(db)

@router.post("/")
def post_recipe(payload: RecipeCreate, db: Annotated[Any, Depends(get_db)]):
    return create_recipe(db, payload)

@router.get("/{recipe_id}", response_model=RecipeResponse)
def get_recipe_by_id(db: Annotated[Any, Depends(get_db)], recipe_id: int):
    return get_recipe(db, recipe_id)