from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from jose import jwt
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")


class AdminLoginSchema(BaseModel):
    email: str
    password: str


@router.post("/login")
async def admin_login(data: AdminLoginSchema):

    if (
        data.email != ADMIN_EMAIL
        or
        data.password != ADMIN_PASSWORD
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = jwt.encode(
        {
            "email": ADMIN_EMAIL,
            "role": "admin"
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