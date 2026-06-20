from fastapi import APIRouter

router = APIRouter()

@router.get("/rooms")
async def get_rooms():
    return [
        {"name": "Luxury Room", "price": 1200},
        {"name": "Deluxe Room", "price": 2000}
    ]