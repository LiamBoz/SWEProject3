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
    nutrition: str = "NaN"
    overview: str = "NaN"
    rating: int = 0
    url: str = "NaN"
    img_src: str = "NaN"
    cuisine_path: str = "NaN"

class RecipeResponse(Recipes):
    prep_time: str
    cook_time: str
    servings: int
    ingredients: str
    directions: str
    nutrition: str
    overview: str

    class Config:
        from_attributes = True