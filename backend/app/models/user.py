from sqlalchemy import Column, String, Integer, ForeignKey, Table
from app.db.base import Base
from sqlalchemy.orm import relationship

user_recipes_favorites = Table(
    "user_recipes_favorites",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
    Column("recipe_id", Integer, ForeignKey("recipes.id", ondelete="CASCADE"), primary_key=True),
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(64), nullable=False, index=True, unique=True) 
    password_hash = Column(String(64), nullable=False)

    favorites = relationship(
        "Recipe",
        secondary=user_recipes_favorites,
        back_populates="favorited_by"
    )

