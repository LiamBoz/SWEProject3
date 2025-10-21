#this is where the functions that fetch data & handle it for the api routes will go
from app.models.recipe import Recipe

def get_all_recipes(db):
    return db.query(Recipe).all()

def get_recipe_by_id(db, recipe_id: int):
    return db.query(Recipe).filter(Recipe.id == recipe_id).one_or_none()

def create_recipe(db, payload: Recipe):
    new_recipe = Recipe(**payload.model_dump())
    db.add(new_recipe)
    try:
        db.commit()
        db.refresh(new_recipe)
        return new_recipe
    except Exception:
        db.rollback()
        raise