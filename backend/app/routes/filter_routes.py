from fastapi import APIRouter
from app.database import db

router = APIRouter(
    prefix="/filters",
    tags=["Filters"]
)

# @router.get("/")
# async def get_filters():
#     return {
#         "cities": [
#             "Kathmandu",
#             "Pokhara",
#             "Lalitpur",
#             "Bhaktapur",
#             "Biratnagar",
#             "Janakpur"
#         ],

#         "room_types": [
#             "Single Room",
#             "Double Room",
#             "Apartment"
#         ],

#         "amenities": [
#             "WiFi",
#             "Parking",
#             "Kitchen",
#             "Furnished",
#             "Attached Bathroom",
#             "AC",
#             "Laundry",
#             "CCTV",
#             "Lift",
#             "Water Supply"
#         ],

#         "nearby_places": [
#             "College",
#             "School",
#             "Hospital",
#             "Temple",
#             "Coaching",
#             "Hotel",
#             "Market",
#             "Mall",
#             "Bus Park",
#             "Railway Station"
#         ]
#     }

@router.get("/")
async def get_filters():

    filters = await db.filters.find_one(
        {"_id": "global_filters"}
    )

    if not filters:
        filters = {
            "_id": "global_filters",
            "cities": [],
            "room_types": [],
            "amenities": []
        }

        await db.filters.insert_one(filters)

    return filters

@router.post("/cities")
async def add_city(data: dict):

    city = data.get("city")

    await db.filters.update_one(
        {"_id": "global_filters"},
        {"$addToSet": {"cities": city}}
    )

    return {"message": "City added"}

@router.delete("/cities/{city}")
async def delete_city(city: str):

    await db.filters.update_one(
        {"_id": "global_filters"},
        {"$pull": {"cities": city}}
    )

    return {"message": "City deleted"}


@router.post("/amenities")
async def add_amenity(data: dict):

    amenity = data.get("amenity")

    await db.filters.update_one(
        {"_id": "global_filters"},
        {"$addToSet": {"amenities": amenity}}
    )

    return {"message": "Amenity added"}


@router.delete("/amenities/{amenity}")
async def delete_amenity(amenity: str):

    await db.filters.update_one(
        {"_id": "global_filters"},
        {"$pull": {"amenities": amenity}}
    )

    return {"message": "Amenity deleted"}


@router.post("/room-types")
async def add_room_type(data: dict):

    room_type = data.get("room_type")

    await db.filters.update_one(
        {"_id": "global_filters"},
        {"$addToSet": {"room_types": room_type}}
    )

    return {"message": "Room type added"}

@router.delete("/room-types/{room_type}")
async def delete_room_type(room_type: str):

    await db.filters.update_one(
        {"_id": "global_filters"},
        {"$pull": {"room_types": room_type}}
    )

    return {"message": "Room type deleted"}