from fastapi import APIRouter, HTTPException
from bson import ObjectId
from passlib.context import CryptContext

import cloudinary
import cloudinary.uploader

def extract_public_id(url: str):

    try:

        public_id = (
            url.split("/upload/")[1]
            .split(".")[0]
        )

        parts = public_id.split("/")

        if parts[0].startswith("v"):
            public_id = "/".join(parts[1:])

        return public_id

    except Exception:
        return None

from app.models.ownerModel import owners_collection
from app.models.favoriteModel import favorites_collection

from app.database import db

rooms_collection = db.rooms
bookings_collection = db.bookings

from app.schemas.change_password_schema import ChangePasswordSchema
from app.auth.hash_password import verify_password, hash_password

from app.models.ownerModel import owners_collection
from app.schemas.ownerSchema import (
    OwnerSchema,
    OwnerUpdateSchema
)

router = APIRouter(
    prefix="/owners",
    tags=["Owners"]
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# =========================
# LOGIN OWNER
# =========================

@router.post("/login")
async def login_owner(data: dict):

    print("EMAIL:", data["email"])

    owner = await owners_collection.find_one(
        {"email": data["email"]}
    )

    print("OWNER FOUND:", owner)

    if not owner:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    
    print("INPUT PASSWORD:", data["password"])
    print("DB HASH:", owner["password"])

    stored_password = owner["password"]

    # OLD plain text passwords
    if not stored_password.startswith("$2"):
        if stored_password != data["password"]:
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )

        # Auto convert to hash
        hashed = pwd_context.hash(
            data["password"]
        )

        await owners_collection.update_one(
            {"_id": owner["_id"]},
            {"$set": {"password": hashed}}
        )

        password_match = pwd_context.verify(
            data["password"],
            owner["password"]
)

        print("PASSWORD MATCH:", password_match)

    else:
        if not pwd_context.verify(
            data["password"],
            stored_password
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )

    owner["_id"] = str(owner["_id"])

    return {
        "success": True,
        "message": "Login Success",
        "owner": {
            "_id": owner["_id"],
            "name": owner["name"],
            "email": owner["email"],
            "phone": owner["phone"]
        }
    }

# =========================
# CREATE OWNER
# =========================

@router.post("/create")
async def create_owner(data: OwnerSchema):

    existing_owner = await owners_collection.find_one({
        "email": data.email
    })

    if existing_owner:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    owner = data.dict()

    owner["password"] = pwd_context.hash(
        owner["password"]
    )

    result = await owners_collection.insert_one(
        owner
    )

    owner["_id"] = str(result.inserted_id)

    return {
        "success": True,
        "owner": owner
    }

# =========================
# GET ALL OWNERS
# =========================
@router.get("/")
async def get_all_owners():

    owners = []

    async for owner in owners_collection.find():

        owner["_id"] = str(owner["_id"])

        owners.append(owner)

    return {
        "success": True,
        "owners": owners
    }


# =========================
# GET OWNER ROOMS
# =========================

# @router.get("/owner/{owner_id}/rooms")
# async def get_owner_rooms(owner_id: str):

#     try:
#         owner = await owners_collection.find_one({
#             "_id": ObjectId(owner_id)
#         })

#     except Exception:

#         raise HTTPException(
#             status_code=400,
#             detail="Invalid owner id"
#         )

#     if not owner:

#         raise HTTPException(
#             status_code=404,
#             detail="Owner not found"
#         )

#     owner_email = owner["email"]

#     rooms = []

#     async for room in rooms_collection.find({
#         "owner_id": owner_id
#     }):

#         room["_id"] = str(room["_id"])

#         rooms.append(room)

#     return {
#         "success": True,
#         "rooms": rooms
#     }

@router.get("/owner/{owner_id}/rooms")
async def get_owner_rooms(owner_id: str):

    try:

        owner = await owners_collection.find_one({
            "_id": ObjectId(owner_id)
        })

    except Exception:

        raise HTTPException(
            status_code=400,
            detail="Invalid owner id"
        )

    if not owner:

        raise HTTPException(
            status_code=404,
            detail="Owner not found"
        )

    rooms = []

    async for room in rooms_collection.find({
        "owner_id": owner_id
    }):

        room["_id"] = str(room["_id"])

        rooms.append(room)

    return {
        "success": True,
        "rooms": rooms
    }


# =========================
# GET OWNER
# =========================

from fastapi import HTTPException

@router.get("/{owner_id}")
async def get_owner(owner_id: str):

    try:
        owner = await owners_collection.find_one({
            "_id": ObjectId(owner_id)
        })
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid owner id"
        )

    if not owner:
        raise HTTPException(
            status_code=404,
            detail="Owner not found"
        )

    owner["_id"] = str(owner["_id"])

    return {"owner": owner}


# =========================
# UPDATE OWNER
# =========================

@router.put("/update/{owner_id}")
async def update_owner(
    owner_id: str,
    data: OwnerUpdateSchema
):

    owner = await owners_collection.find_one(
        {"_id": ObjectId(owner_id)}
    )

    if not owner:
        raise HTTPException(
            status_code=404,
            detail="Owner not found"
        )

    update_data = {
        k: v
        for k, v in data.dict().items()
        if v is not None
    }

    # =========================
    # DELETE OLD CLOUDINARY IMAGE
    # =========================

    if (
        "profile_image" in update_data
        and owner.get("profile_image")
        and owner["profile_image"] != update_data["profile_image"]
    ):

        old_url = owner["profile_image"]

        try:
            public_id = extract_public_id(
                old_url
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

    # =========================
    # UPDATE OWNER
    # =========================

    await owners_collection.update_one(
        {"_id": ObjectId(owner_id)},
        {"$set": update_data}
    )

    updated_owner = await owners_collection.find_one(
        {"_id": ObjectId(owner_id)}
    )

    updated_owner["_id"] = str(
        updated_owner["_id"]
    )

    return {
        "success": True,
        "owner": updated_owner
    }


# =========================
# UPDATE OWNER
# =========================

@router.put("/change-password")
async def change_owner_password(
    data: ChangePasswordSchema
):

    owner = await owners_collection.find_one({
        "_id": ObjectId(data.user_id)
    })

    if not owner:
        raise HTTPException(
            status_code=404,
            detail="Owner not found"
        )

    if not verify_password(
        data.old_password,
        owner["password"]
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password incorrect"
        )

    await owners_collection.update_one(
        {"_id": ObjectId(data.user_id)},
        {
            "$set": {
                "password": hash_password(
                    data.new_password
                )
            }
        }
    )

    return {
        "success": True,
        "message": "Password updated successfully"
    }
    

# =========================
# DELETE OWNER
# =========================

@router.delete("/delete/{owner_id}")
async def delete_owner(owner_id: str):

    try:

        owner = await owners_collection.find_one(
            {"_id": ObjectId(owner_id)}
        )

        if not owner:
            raise HTTPException(
                status_code=404,
                detail="Owner not found"
            )

        # ======================
        # DELETE PROFILE IMAGE
        # ======================

        if owner.get("profile_image"):

            try:

                public_id = extract_public_id(
                    owner["profile_image"]
                )

                if public_id:
                    cloudinary.uploader.destroy(
                        public_id
                    )

            except Exception as e:

                print(
                    "Profile image delete error:",
                    e
                )

        owner_email = owner["email"]

        # ======================
        # GET OWNER ROOMS
        # ======================

        room_ids = []

        async for room in rooms_collection.find(
            {"owner_email": owner_email}
        ):

            room_ids.append(
                str(room["_id"])
            )

            # ======================
            # DELETE MULTIPLE IMAGES
            # ======================

            for image_url in room.get(
                "images",
                []
            ):

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
                        "Room image delete error:",
                        e
                    )

            # ======================
            # DELETE SINGLE IMAGE
            # ======================

            if room.get("image"):

                try:

                    public_id = extract_public_id(
                        room["image"]
                    )

                    if public_id:
                        cloudinary.uploader.destroy(
                            public_id
                        )

                except Exception as e:

                    print(
                        "Room image delete error:",
                        e
                    )

        # ======================
        # DELETE BOOKINGS
        # ======================

        if room_ids:

            await bookings_collection.delete_many({
                "room_id": {
                    "$in": room_ids
                }
            })

        # ======================
        # DELETE FAVORITES
        # ======================

        if room_ids:

            await favorites_collection.delete_many({
                "room_id": {
                    "$in": room_ids
                }
            })

        # ======================
        # DELETE ROOMS
        # ======================

        await rooms_collection.delete_many({
            "owner_id": owner_id
        })

        # ======================
        # DELETE OWNER
        # ======================

        await owners_collection.delete_one({
            "_id": ObjectId(owner_id)
        })

        return {
            "success": True,
            "message": "Owner and all related data deleted"
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )