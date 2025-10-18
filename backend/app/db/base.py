from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
import os

engine = create_engine("postgresql://admin:password@postgres:5432/recipes_db", echo=False)

Session = sessionmaker(bind=engine)

class Base(DeclarativeBase):
    pass
