from fastapi import APIRouter, Depends, status, HTTPException
from typing import Annotated, Any
from app.services.recipe_service import *
from app.db.session import get_db
from app.schemas.recipe import Recipe as RecipeSchema

router = APIRouter(prefix="/recipes")

@router.get("/")
def get_recipes(db: Annotated[Any, Depends(get_db)]):
    return get_all_recipes(db)

@router.get("/{recipe_id}", response_model=RecipeSchema)
def get_recipe(recipe_id: int, db: Annotated[Any, Depends(get_db)]):
    recipe = get_recipe_by_id(db, recipe_id)
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@router.post("/", response_model=RecipeSchema, status_code=status.HTTP_201_CREATED)
def post_recipe(payload: RecipeSchema, db: Annotated[Any, Depends(get_db)]):
    return create_recipe(db, payload)