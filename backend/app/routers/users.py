from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated, Any
from app.services.user_service import *
from app.schemas.user import *
from app.db.session import get_db

router = APIRouter(prefix="/users")

@router.post("/", status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Annotated[Any, Depends(get_db)]):
    username = create_user(db, payload.username, payload.password)
    return username

@router.post("/login", status_code=status.HTTP_200_OK)
def login(payload: UserLogin, db: Annotated[Any, Depends(get_db)]):
    username = login_user(db, payload.username, payload.password)
    return username

@router.post("/token")
def token(form_data: OAuth2PasswordRequestForm = Depends(), db = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me")
def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
    return {"username": current_user.username}