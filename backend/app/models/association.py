from sqlalchemy import Table, Column, Integer, ForeignKey
from app.db.base import Base

user_recipes_favorites = Table(
    "user_recipes_favorites",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("recipe_id", Integer, ForeignKey("recipes.id"), primary_key=True),
)