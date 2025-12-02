#this is where the functions that fetch data & handle it for the api routes will go
from app.models.recipe import Recipe
from app.schemas.recipe import RecipeCreate
from fastapi import HTTPException

def get_all_recipes(db):
    return db.query(Recipe).all()

def create_recipe(db, payload: RecipeCreate):
    new_recipe = Recipe(**payload.model_dump())
    db.add(new_recipe)
    try:
        db.commit()
        db.refresh(new_recipe)
        return True
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create recipe")
    
def get_recipe(db, id: int):
    recipe = db.query(Recipe).filter(Recipe.id == id).first()
    if not recipe:
        raise HTTPException(status=404, detail="Recipe not found")
    return recipe

def delete_recipe(db, recipe_id: int):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        return False
    
    db.delete(recipe)
    db.commit()
    return True
