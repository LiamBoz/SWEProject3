from pydantic import BaseModel
from app.schemas.recipe import Recipe

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserLoginOut(BaseModel):
    pass

class UserCreateOut(BaseModel):
    username: str

# class UserIn(BaseModel):
#     username: str
#     password: str
# 
# class UserOut(BaseModel):
#     id: int
#     username: str
#     favorite_recipes: list[Recipe] = []

#     class Config:
#         orm_mode = True

# class UserDB(UserOut):
#     password_hash: str
