from fastapi import APIRouter

router = APIRouter(prefix="/recipes")

@router.get("/")
async def get_recipes():
    return "todo"
