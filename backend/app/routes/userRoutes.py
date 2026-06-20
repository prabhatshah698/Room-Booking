from fastapi import APIRouter, HTTPException
from bson import ObjectId
from passlib.context import CryptContext

import cloudinary
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

from app.models.userModel import users_collection
from app.schemas.user_schema import UserSchema
from app.schemas.change_password_schema import ChangePasswordSchema
from app.auth.hash_password import verify_password, hash_password
from app.schemas.user_schema import (
    UserSchema,
    UserUpdateSchema
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# =========================
# REGISTER USER
# =========================

@router.post("/register")
async def create_owner(data: UserSchema):

    user = data.dict()

    user["password"] = pwd_context.hash(
        user["password"]
    )

    result = await users_collection.insert_one(
        user
    )

    user["_id"] = str(result.inserted_id)

    return {
        "success": True,
        "user": user
    }

# =========================
# LOGIN USER
# =========================

@router.post("/login")
async def login_owner(data: dict):

    user = await users_collection.find_one(
        {"email": data["email"]}
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    stored_password = user["password"]

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

        await users_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"password": hashed}}
        )

    else:
        if not pwd_context.verify(
            data["password"],
            stored_password
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )

    user["_id"] = str(user["_id"])

    return {
        "success": True,
        "message": "Login Success",
        "user": {
            "_id": user["_id"],
            "name": user["name"],
            "email": user["email"],
            "phone": user["phone"]
        }
    }

# =========================
# GET ALL USERS
# =========================
@router.get("/")
async def get_all_users():

    users = []

    async for user in users_collection.find():

        user["_id"] = str(user["_id"])

        users.append(user)

    return {
        "success": True,
        "users": users
    }

# =========================
# GET USER
# =========================
@router.get("/{user_id}")
async def get_user(user_id: str):

    user = await users_collection.find_one({"_id": ObjectId(user_id)})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user["_id"] = str(user["_id"])

    return {"user": user}


# =========================
# UPDATE USER
# =========================
@router.put("/update/{user_id}")
async def update_user(
    user_id: str,
    data: UserUpdateSchema
):
    
    update_data = {
        k: v
        for k, v in data.dict().items()
        if v is not None
    }

    await users_collection.update_one(
        {
            "_id": ObjectId(user_id)
        },
        {
            "$set": update_data
        }
    )

    user = await users_collection.find_one(
        {
            "_id": ObjectId(user_id)
        }
    )

    user["_id"] = str(user["_id"])

    return {
        "message": "Profile Updated",
        "user": user
    }

# =========================
# CHANGE PASSWORD
# =========================

@router.put("/change-password")
async def change_user_password(data: ChangePasswordSchema):

    user = await users_collection.find_one({
        "_id": ObjectId(data.user_id)
    })

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        data.old_password,
        user["password"]
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password incorrect"
        )

    await users_collection.update_one(
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
# DELETE USER
# =========================
# @router.delete("/delete/{user_id}")
# async def delete_user(user_id: str):

#     result = await users_collection.delete_one(
#         {"_id": ObjectId(user_id)}
#     )

#     if result.deleted_count == 0:
#         raise HTTPException(
#             status_code=404,
#             detail="User not found"
#         )

#     return {
#         "success": True,
#         "message": "User deleted successfully"
#     }


@router.delete("/delete/{user_id}")
async def delete_user(user_id: str):

    try:

        user = await users_collection.find_one(
            {"_id": ObjectId(user_id)}
        )

        if not user:

            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        # DELETE PROFILE IMAGE FROM CLOUDINARY

        if user.get("profile_image"):

            try:

                public_id = extract_public_id(
                    user["profile_image"]
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

        # DELETE USER

        await users_collection.delete_one(
            {"_id": ObjectId(user_id)}
        )

        return {
            "success": True,
            "message": "User deleted successfully"
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )