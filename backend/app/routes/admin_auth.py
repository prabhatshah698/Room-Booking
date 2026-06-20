from fastapi import APIRouter, HTTPException
from jose import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter(
    prefix="/admin",
    tags=["Admin Auth"]
)

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


@router.post("/login")
async def admin_login(data: dict):

    print("Received:", data)
    print("ADMIN_EMAIL:", ADMIN_EMAIL)
    print("ADMIN_PASSWORD:", ADMIN_PASSWORD)

    email = data.get("email")
    password = data.get("password")

    print("Received:", data)
    print("ADMIN_EMAIL:", ADMIN_EMAIL)
    print("ADMIN_PASSWORD:", ADMIN_PASSWORD)

    if (
        email != ADMIN_EMAIL
        or password != ADMIN_PASSWORD
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = jwt.encode(
        {
            "role": "admin",
            "email": ADMIN_EMAIL,
            "exp": datetime.utcnow() + timedelta(days=7)
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "success": True,
        "token": token,
        "admin": {
            "email": ADMIN_EMAIL,
            "role": "admin"
        }
    }