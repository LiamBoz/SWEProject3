from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
import os

engine = create_engine(os.getenv("DATABASE_URL"), echo=False)

Session = sessionmaker(bind=engine)

class Base(DeclarativeBase):
    pass
