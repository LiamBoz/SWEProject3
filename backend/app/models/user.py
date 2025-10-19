from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from app.db.base import Base
from app.models.association import user_recipes_favorites

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(64), nullable=False, index=True) 
    password_hash = Column(String(256), nullable=False)

    # many-to-many relationship with Recipe for favorites
    favorite_recipes = relationship(
        "Recipe",
        secondary=user_recipes_favorites,
        back_populates="favorited_by",
    )
