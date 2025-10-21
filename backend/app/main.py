from fastapi import FastAPI, APIRouter
from app.routers import recipes, users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Recipes API")

origins = [
    "http://localhost:8000",
    "http://localhost:5173",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(prefix="/api/v1")
router.include_router(recipes.router)
router.include_router(users.router)
app.include_router(router)
