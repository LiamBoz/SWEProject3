from sqlalchemy import Column, Integer, String, Text, ForeignKey, Float
from app.db.base import Base

class Recipe(Base):
    __tablename__ = "recipes"

    #todo add nullable (depends on data if any of them are blank or can be in future)
    #make some of the Text be String(length) depending on how long some of the data is
    id = Column(Integer, primary_key=True, index=True)
    recipe_name = Column(Text) 
    prep_time = Column(Text)
    cook_time = Column(Text)
    total_time = Column(Text)
    servings = Column(Integer)
    ingredients = Column(Text)
    directions = Column(Text)
    rating = Column(Float)
    url = Column(Text)
    cuisine_path = Column(Text)
    nutrition = Column(Text)
    overview = Column(Text)
    img_src = Column(Text)



