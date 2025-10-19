from pydantic import BaseModel

class Recipe(BaseModel):
    id: int
    recipe_name: str
    ingredients: str
    directions: str
    prep_time: str | None = None
    cook_time: str | None = None
    total_time: str | None = None
    servings: int | None = None
    rating: float | None = None
    url: str | None = None
    cuisine_path: str | None = None
    nutrition: str | None = None
    overview: str | None = None
    img_src: str | None = None

    # allows UserOut to import Recipe successfully
    class Config:
        orm_mode = True
