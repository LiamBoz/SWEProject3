from app.models.user import User
from app.models.recipe import Recipe
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from fastapi import HTTPException
from pwdlib import PasswordHash
import secrets

hasher = PasswordHash.recommended()

def get_password_hash(password):
   return hasher.hash(password)

def verify_password(plain_password, hashed_password):
   return hasher.verify(plain_password, hashed_password)

def create_token() -> str:
    return secrets.token_urlsafe(32)

async def create_user(db, username: str, password: str):
    exists = db.execute(select(User).where(User.username == username)).scalar_one_or_none()
    if exists:
        raise HTTPException(status_code=404, detail="User already exists")
    
    user = User(username=username, password_hash=get_password_hash(password))
    db.add(user)
    try:
        db.commit()
        token = create_token()
        return {"username": user.username, "token": token}
    except Exception:
        raise HTTPException(status_code=500, detail="Server error")

async def login_user(db, username: str, password: str):
    exists = db.execute(select(User).where(User.username == username)).scalar_one_or_none()
    if not exists:
        raise HTTPException(status_code=401, detail="Username or password incorrect")

    if verify_password(password, exists.password_hash) is False:
        raise HTTPException(status_code=401, detail="Username or password incorrect")

    try:
        token = create_token()
        return {"username": exists.username, "token": token}
    except Exception:
        raise HTTPException(status_code=500, detail="Server error")


def add_recipe(db, username: str, recipe_id: int):
    # Check user exists
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(404, "User not found")
    
    # Check recipe exists
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(404, "Recipe not found")
    
    if recipe in user.favorites:
        return {"message": "Already favorited recipe"}
    
    try:
        user.favorites.append(recipe)
        db.commit()
        db.refresh(user)
        return {"message": "Recipe added to favorites"}
    except:
        raise HTTPException(500, "Server error")

def remove_favorite(db, username: str, recipe_id: int):
    # Check user exists
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(404, "User not found")
    
    # Check recipe exists
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(404, "Recipe not found")
    
    if recipe not in user.favorites:
        raise HTTPException(400, "Recipe is not a favorite")
    
    try:
        user.favorites.remove(recipe)
        db.commit()
        return {"message": "Recipe successfully removed from favorites"}
    except:
        raise HTTPException(500, "Server error")
    
def user_favorites_recipe(db, username: str, recipe_id: int):
    # Check user exists
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(404, "User not found")
    
    # Check recipe exists
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(404, "Recipe not found")
    
    if recipe in user.favorites:
        return True
    else:
        return False

def user_get_favorites(db, username: str):
    user = (
        db.query(User)
        .options(joinedload(User.favorites))
        .filter(User.username == username)
        .first()
    )
    if not user:
        raise HTTPException(404, "User not found")
    
    if len(user.favorites) == 0:
        return []
    return user.favorites
