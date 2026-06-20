from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
from random import randint

from app.database import db
from app.utils.send_email import send_otp_email
from app.auth.hash_password import hash_password

router = APIRouter(
    prefix="/forgot-password",
    tags=["Forgot Password"]
)

users_collection = db.users
owners_collection = db.owners
otp_collection = db.password_otps

########################
# SEND OTP
#########################

@router.post("/send-otp")
async def send_otp(data: dict):

    email = data["email"]

    user = await users_collection.find_one(
        {"email": email}
    )

    owner = await owners_collection.find_one(
        {"email": email}
    )

    if not user and not owner:
        raise HTTPException(
            status_code=404,
            detail="Email not found"
        )

    otp = str(randint(100000, 999999))

    expiry = datetime.utcnow() + timedelta(minutes=15)

    await otp_collection.delete_many(
        {"email": email}
    )

    await otp_collection.insert_one({
        "email": email,
        "otp": otp,
        "expires_at": expiry,
        "attempts": 0,          # ADD THIS
        "verified": False       # OPTIONAL
    })

    await send_otp_email(
        email,
        otp
    )

    return {
        "success": True,
        "message": "OTP sent successfully"
    }


########################
# VERIFY OTP
#########################

@router.post("/verify-otp")
async def verify_otp(data: dict):

    email = data["email"]
    otp = data["otp"]

    record = await otp_collection.find_one({
        "email": email
    })

    if not record:
        raise HTTPException(
            status_code=400,
            detail="OTP not found"
        )

    if datetime.utcnow() > record["expires_at"]:
        raise HTTPException(
            status_code=400,
            detail="OTP expired"
        )

    if record.get("attempts", 0) >= 5:
        raise HTTPException(
            status_code=400,
            detail="Too many attempts. Request new OTP."
        )

    if record["otp"] != otp:

        await otp_collection.update_one(
            {"_id": record["_id"]},
            {
                "$inc": {
                    "attempts": 1
                }
            }
        )

        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    await otp_collection.update_one(
        {"_id": record["_id"]},
        {
            "$set": {
                "verified": True
            }
        }
    )

    return {
        "success": True,
        "message": "OTP verified successfully"
    }


########################
# RESEND OTP
#########################

@router.post("/resend-otp")
async def resend_otp(data: dict):

    email = data["email"]

    user = await users_collection.find_one(
        {"email": email}
    )

    owner = await owners_collection.find_one(
        {"email": email}
    )

    if not user and not owner:
        raise HTTPException(
            status_code=404,
            detail="Email not found"
        )

    # Remove old OTP
    await otp_collection.delete_many({
        "email": email
    })

    otp = str(randint(100000, 999999))

    expiry = datetime.utcnow() + timedelta(
        minutes=15
    )

    await otp_collection.insert_one({
        "email": email,
        "otp": otp,
        "expires_at": expiry,
        "attempts": 0,
        "verified": False
    })

    await send_otp_email(
        email,
        otp
    )

    return {
        "success": True,
        "message": "New OTP sent successfully"
    }

########################
# RESET PASSWORD
#########################

@router.post("/reset")
async def reset_password(data: dict):

    email = data["email"]
    password = data["password"]

    otp_record = await otp_collection.find_one({
        "email": email,
        "verified": True
    })

    if not otp_record:
        raise HTTPException(
            status_code=400,
            detail="OTP verification required"
        )

    if datetime.utcnow() > otp_record["expires_at"]:
        raise HTTPException(
            status_code=400,
            detail="OTP expired"
        )

    if len(password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 characters"
        )

    hashed = hash_password(password)

    user = await users_collection.find_one(
        {"email": email}
    )

    owner = await owners_collection.find_one(
        {"email": email}
    )

    if user:

        await users_collection.update_one(
            {"email": email},
            {
                "$set": {
                    "password": hashed
                }
            }
        )

    elif owner:

        await owners_collection.update_one(
            {"email": email},
            {
                "$set": {
                    "password": hashed
                }
            }
        )

    else:
        raise HTTPException(
            status_code=404,
            detail="Account not found"
        )

    await otp_collection.delete_many({
        "email": email
    })

    return {
        "success": True,
        "message": "Password reset successful"
    }