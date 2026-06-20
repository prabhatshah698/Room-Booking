from fastapi import APIRouter
from app.models.favoriteModel import favorites_collection

router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)

# =========================
# ADD TO FAVORITES
# =========================

@router.post("/add")
async def add_favorite(data: dict):

    existing = await favorites_collection.find_one({
        "user_id": data["user_id"],
        "room_slug": data["room_slug"]
    })

    if existing:
        return {
            "success": False,
            "message": "Already in favorites"
        }

    favorite = {
        "user_id": data["user_id"],
        "room_slug": data["room_slug"],
        "title": data.get("title"),
        "image": data.get("image"),
        "location": data.get("location"),
        "price": data.get("price"),
        "bedrooms": data.get("bedrooms")
    }

    result = await favorites_collection.insert_one(
        favorite
    )

    return {
        "success": True,
        "message": "Added to favorites",
        "favorite_id": str(result.inserted_id)
    }


# =========================
# GET USER FAVORITES
# =========================

@router.get("/{user_id}")
async def get_favorites(user_id: str):

    favorites = []

    cursor = favorites_collection.find({
        "user_id": user_id
    })

    async for item in cursor:

        item["_id"] = str(item["_id"])

        favorites.append(item)

    return {
        "success": True,
        "count": len(favorites),
        "favorites": favorites
    }


# =========================
# REMOVE FAVORITE
# =========================

@router.delete("/remove/{user_id}/{room_slug}")
async def remove_favorite(
    user_id: str,
    room_slug: str
):

    result = await favorites_collection.delete_one({
        "user_id": user_id,
        "room_slug": room_slug
    })

    if result.deleted_count == 0:
        return {
            "success": False,
            "message": "Favorite not found"
        }

    return {
        "success": True,
        "message": "Removed from favorites"
    }


# =========================
# CHECK FAVORITE STATUS
# =========================

@router.get("/check/{user_id}/{room_slug}")
async def check_favorite(
    user_id: str,
    room_slug: str
):

    favorite = await favorites_collection.find_one({
        "user_id": user_id,
        "room_slug": room_slug
    })

    return {
        "isFavorite": favorite is not None
    }


# =========================
# CLEAR ALL FAVORITES
# =========================

@router.delete("/clear/{user_id}")
async def clear_favorites(user_id: str):

    result = await favorites_collection.delete_many({
        "user_id": user_id
    })

    return {
        "success": True,
        "deleted": result.deleted_count,
        "message": "All favorites cleared"
    }