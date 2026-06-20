from fastapi import (
    APIRouter,
    HTTPException,
    UploadFile,
    File
)

from bson import ObjectId
import cloudinary.uploader

def extract_public_id(url: str):

    try:

        parts = url.split("/upload/")[1]

        public_id = parts.split(".")[0]

        public_id = "/".join(
            public_id.split("/")[1:]
        )

        return public_id

    except Exception:

        return None

from app.schemas.room_schema import Room
from app.schemas.room_schema import RoomStatusUpdate
from app.database import db

from slugify import slugify
from datetime import datetime

import cloudinary.uploader
from app.cloudinary_config import *

router = APIRouter(
    prefix="/rooms",
    tags=["Rooms"]
)

@router.post("/add")
async def add_room(room: Room):

    owner = await db.owners.find_one({
        "_id": ObjectId(room.owner_id)
    })

    if not owner:
        raise HTTPException(
            status_code=404,
            detail="Owner not found"
        )

    # CREATE UNIQUE SLUG

    base_slug = slugify(room.title)

    room_slug = base_slug

    counter = 1

    while await db.rooms.find_one({
        "slug": room_slug
    }):

        room_slug = f"{base_slug}-{counter}"

        counter += 1

    # IMAGES

    room_images = (
        room.images
        if room.images
        else [room.image]
    )

    room_data = {

        "owner_id": room.owner_id,
        "owner_email": owner["email"],

        "title": room.title,
        "slug": room_slug,
        "description": room.description,

        "price": room.price,
        "electricity_charge": room.electricity_charge,

        "location": room.location,

        "image": room_images[0] if room_images else "",
        "images": room_images,

        "room_type": room.room_type,

        "amenities": room.amenities or [],

        "nearby_places": room.nearby_places or [],

        "area_name": room.area_name,

        "latitude": room.latitude,
        "longitude": room.longitude,

        "available": True,

        "created_at": datetime.utcnow()
    }

    await db.rooms.insert_one(room_data)

    return {
        "success": True,
        "message": "Room Added Successfully"
    }


@router.get("/owner/{owner_id}/rooms")
async def get_owner_rooms(owner_id: str):

    rooms = []

    async for room in db.rooms.find({
        "owner_id": owner_id
    }):

        room["_id"] = str(room["_id"])

        rooms.append(room)

    return {
        "success": True,
        "rooms": rooms
    }


# =========================
# UPDATE ROOM
# =========================
# 


@router.put("/update/{slug}")
async def update_room(
    slug: str,
    room: Room
):

    existing_room = await db.rooms.find_one({
        "slug": slug
    })

    if not existing_room:

        raise HTTPException(
            status_code=404,
            detail="Room not found"
        )

    old_images = existing_room.get(
        "images",
        []
    )

    new_images = room.images or []

    deleted_images = [

        img

        for img in old_images

        if img not in new_images
    ]

    for image_url in deleted_images:

        try:

            public_id = extract_public_id(
                image_url
            )

            if public_id:

                cloudinary.uploader.destroy(
                    public_id
                )

        except Exception as e:

            print(
                "Cloudinary delete error:",
                e
            )

    updated_data = {

        "title":
            room.title,

        "description":
            room.description,

        "price":
            room.price,

        "electricity_charge":
            room.electricity_charge,

        "location":
            room.location,

        "image":
            new_images[0] if new_images else "",

        "images":
            new_images,

        "latitude":
            room.latitude,

        "longitude":
            room.longitude,

        "nearby_places":
            room.nearby_places,

        "area_name":
            room.area_name,

        "room_type":
            room.room_type,

        "amenities":
            room.amenities,

        "updated_at":
            datetime.utcnow()
    }

    await db.rooms.update_one(

        {"slug": slug},

        {
            "$set": updated_data
        }
    )

    return {

        "success": True,

        "message":
            "Room Updated Successfully"
    }


@router.put("/update-status/{slug}")
async def update_room_status(
    slug: str,
    data: RoomStatusUpdate
):

    room = await db.rooms.find_one({
        "slug": slug
    })

    if not room:
        raise HTTPException(
            status_code=404,
            detail="Room not found"
        )

    await db.rooms.update_one(
        {"slug": slug},
        {
            "$set": {
                "available": data.available,
                "updated_at": datetime.utcnow()
            }
        }
    )

    return {
        "success": True,
        "message": "Status updated"
    }

# =========================
# GET ALL ROOMS
# =========================
@router.get("/")
async def get_rooms():

    rooms = []

    async for room in db.rooms.find():

        room["_id"] = str(
            room["_id"]
        )

        room["images"] = room.get(
            "images",
            []
        )

        rooms.append(room)

    return {

        "success": True,

        "rooms": rooms
    }


# =========================
# GET SINGLE ROOM
# =========================
@router.get("/{slug}")
async def get_single_room(
    slug: str
):

    room = await db.rooms.find_one({
        "slug": slug
    })

    if not room:

        raise HTTPException(
            status_code=404,
            detail="Room not found"
        )

    room["_id"] = str(
        room["_id"]
    )

    room["images"] = room.get(
        "images",
        []
    )

    room["amenities"] = room.get(
        "amenities",
        []
    )

    return {

        "success": True,

        "room": room
    }


# =========================
# DELETE ROOM
# =========================

@router.delete("/delete/{slug}")
async def delete_room(
    slug: str
):

    room = await db.rooms.find_one({
        "slug": slug
    })

    if not room:

        raise HTTPException(
            status_code=404,
            detail="Room not found"
        )

    images = room.get(
        "images",
        []
    )

    for image_url in images:

        try:

            public_id = extract_public_id(
                image_url
            )

            if public_id:

                cloudinary.uploader.destroy(
                    public_id
                )

        except Exception as e:

            print(
                "Cloudinary delete error:",
                e
            )

    await db.rooms.delete_one({
        "slug": slug
    })

    return {

        "success": True,

        "message":
            "Room Deleted Successfully"
    }


# =========================
# IMAGE UPLOAD
# =========================
@router.post("/upload-image")
async def upload_room_image(
    file: UploadFile = File(...)
):

    result = cloudinary.uploader.upload(
        file.file,
        folder="room-booking"
    )

    return {

        "success": True,

        "image_url":
            result["secure_url"]
    }