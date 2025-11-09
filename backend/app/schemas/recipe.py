from typing import Annotated
from fastapi import FastAPI
from pydantic import BaseModel

class Recipes(BaseModel):
    id: int
    recipe_name: str
    total_time: str
    rating: float | None = None
    url: str | None = None
    img_src: str | None = None

class RecipeCreate(BaseModel):
    recipe_name: str
    prep_time: str
    cook_time: str
    total_time: str
    servings: int
    ingredients: str
    directions: str
    # nutrition: str | None = None
