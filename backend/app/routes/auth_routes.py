from bson import ObjectId
from fastapi import HTTPException

from fastapi import APIRouter, HTTPException, Depends
from app.schemas.user_schema import UserRegister, UserLogin
from app.database import db
from app.auth.hash_password import (
    hash_password,
    verify_password
)
from app.auth.jwt_handler import create_access_token
from app.auth.dependencies import verify_token

from app.schemas.change_password_schema import ChangePasswordSchema
from app.auth.hash_password import verify_password, hash_password

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# =========================
# REGISTER
# =========================
@router.post("/register")
async def register(user: UserRegister):

    existing_user = await db.users.find_one({
        "email": user.email
    })

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_pwd = hash_password(user.password)

    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hashed_pwd,
        "role": user.role
    }

    await db.users.insert_one(user_data)

    return {
        "success": True,
        "message": "User Registered Successfully"
    }


# =========================
# LOGIN
# =========================
@router.post("/login")
async def login(user: UserLogin):

    db_user = await db.users.find_one({
        "email": user.email
    })

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    valid_password = verify_password(
        user.password,
        db_user["password"]
    )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token({
        "id": str(db_user["_id"]),
        "email": db_user["email"],
        "role": db_user["role"]
    })

    return {
        "success": True,
        "access_token": token,
        "role": db_user["role"]
    }


# =========================
# CURRENT USER
# =========================
@router.get("/me")
async def get_current_user(
    user_data: dict = Depends(verify_token)
):

    return {
        "success": True,
        "user": user_data
    }


# =========================
# ADMIN ONLY
# =========================
@router.get("/admin")
async def admin_dashboard(
    user_data: dict = Depends(verify_token)
):

    if user_data["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return {
        "success": True,
        "message": "Welcome Admin"
    }

# =========================
# ADMIN ANALYTICS
# =========================

@router.get("/admin/analytics")
async def admin_analytics():

    total_users = await db.users.count_documents({})

    total_rooms = await db.rooms.count_documents({})

    total_bookings = await db.bookings.count_documents({})

    bookings = []

    async for booking in db.bookings.find():
        bookings.append(booking)

    total_revenue = sum([
        booking.get("total_price", 0)
        for booking in bookings
    ])

    return {
        "success": True,
        "analytics": {
            "total_users": total_users,
            "total_rooms": total_rooms,
            "total_bookings": total_bookings,
            "total_revenue": total_revenue
        }
    }

# =========================
# ADMIN CHANGE PASSWORD
# =========================

@router.put("/admin/change-password")
async def change_admin_password(
    data: ChangePasswordSchema
):

    admin = await db.admins.find_one({
        "_id": ObjectId(data.user_id)
    })

    if not admin:
        raise HTTPException(
            status_code=404,
            detail="Admin not found"
        )

    if not verify_password(
        data.old_password,
        admin["password"]
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password incorrect"
        )

    await db.admins.update_one(
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
# OWNER ONLY
# =========================
@router.get("/owner")
async def owner_dashboard(
    user_data: dict = Depends(verify_token)
):

    if user_data["role"] != "owner":
        raise HTTPException(
            status_code=403,
            detail="Only owners allowed"
        )

    return {
        "success": True,
        "message": "Welcome Owner"
    }