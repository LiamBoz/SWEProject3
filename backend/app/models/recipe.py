from sqlalchemy import Column, Integer, Text, Float
from sqlalchemy.orm import relationship
from app.db.base import Base
from app.models.association import user_recipes_favorites

class Recipe(Base):
    __tablename__ = "recipes"

    #todo add nullable (depends on data if any of them are blank or can be in future)
    #make some of the Text be String(length) depending on how long some of the data is
    id = Column(Integer, primary_key=True, index=True)
    recipe_name = Column(Text, nullable=False) 
    ingredients = Column(Text, nullable=False)
    directions = Column(Text, nullable=False)
    prep_time = Column(Text)
    cook_time = Column(Text)
    total_time = Column(Text)
    servings = Column(Integer)
    rating = Column(Float)
    url = Column(Text)
    cuisine_path = Column(Text)
    nutrition = Column(Text)
    overview = Column(Text)
    img_src = Column(Text)

    favorited_by = relationship(
        "User",
        secondary=user_recipes_favorites,
        back_populates="favorite_recipes",
    )

# from sqlalchemy.orm import selectinload

# example usage to load a user with their favorite recipes in one go
# user = db.query(User).options(selectinload(User.favorite_recipes)).filter(User.id==uid).one()

