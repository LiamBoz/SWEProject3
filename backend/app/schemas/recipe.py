from typing import Annotated
from fastapi import FastAPI
from pydantic import BaseModel

class Recipes(BaseModel):
    id: int
    recipe_name: str
    prep_time: str
    cook_time: str
    total_time: str
    servings: int
    ingredients: str
    directions: str
    rating: float
    url: str
    cuisine_path: str
    nutrition: str
    overview: str 
    img_src: str 


