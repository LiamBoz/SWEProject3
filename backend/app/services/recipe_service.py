#this is where the functions that fetch data & handle it for the api routes will go
from app.models.recipe import Recipe
from app.schemas.recipe import RecipeCreate

def get_all_recipes(db):
    return db.query(Recipe).all()

def create_recipe(db, payload: RecipeCreate):
    new_recipe = Recipe(**payload.model_dump())
    db.add(new_recipe)
    try:
        db.commit()
        db.refresh(new_recipe)
        return new_recipe
    except Exception:
        db.rollback()
        raise