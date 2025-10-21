from typing import Annotated
from fastapi import FastAPI
from pydantic import BaseModel

class Recipes(BaseModel):
    id: int
    recipe_name: str
    total_time: str
    rating: float
    url: str
    img_src: str 


