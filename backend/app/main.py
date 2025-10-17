from fastapi import FastAPI, APIRouter
from app.routers import recipes, users

router = APIRouter(prefix="/api/v1")
router.include_router(recipes.router)
#router.include_router(users.router)

app = FastAPI(title="Recipes API")
app.include_router(router)
