from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import settings

# low level connection factory used to connect to our database
engine = create_engine(settings.database_url, echo=False)

# a session factory that is callable and returns new Session objects
SessionLocal = sessionmaker(bind=engine)

# the class to inherit from to create ORM models
class Base(DeclarativeBase):
    pass
