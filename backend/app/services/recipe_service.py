#this is where the functions that fetch data & handle it for the api routes will go
from app.models.recipe import Recipe

def get_all_recipes(db):
    return db.query(Recipe).all()