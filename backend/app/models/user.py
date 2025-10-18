from sqlalchemy import Column, String, Integer, ForeignKey
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(64), nullable=false, index=True) 
    password = Column(String(64), nullable=false)
