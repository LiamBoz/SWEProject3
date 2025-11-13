from app.models.user import User
from sqlalchemy import select
from fastapi import HTTPException
from pwdlib import PasswordHash

hasher = PasswordHash.recommended()

def get_password_hash(password):
   return hasher.hash(password)

def verify_password(plain_password, hashed_password):
   return hasher.verify(plain_password, hashed_password)

async def create_user(db, username: str, password: str):
    exists = db.execute(select(User).where(User.username == username)).scalar_one_or_none()
    if exists:
        raise HTTPException(status_code=404, detail="User already exists")
    
    user = User(username=username, password_hash=get_password_hash(password))
    db.add(user)
    try:
        db.commit()
        return user.username
    except Exception:
        raise HTTPException(status_code=500, detail="Server error")

async def login_user(db, username: str, password: str):
    exists = db.execute(select(User).where(User.username == username)).scalar_one_or_none()
    if not exists:
        raise HTTPException(status_code=401, detail="Username or password incorrect")

    if verify_password(password, exists.password_hash) is False:
        raise HTTPException(status_code=401, detail="Username or password incorrect")

    try:
        return exists.username
    except Exception:
        raise HTTPException(status_code=500, detail="Server error")

