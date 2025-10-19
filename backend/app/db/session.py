from .base import SessionLocal

# A generator that yields a database session and ensures it's closed after use
# When used as a dependency in FastAPI, it provides a session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
