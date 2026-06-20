from pydantic import BaseModel, EmailStr
from typing import Optional


class UserSchema(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    location: Optional[str] = ""
    bio: Optional[str] = ""
    profile_image: Optional[str] = ""
    password: Optional[str] = None


class UserUpdateSchema(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    profile_image: Optional[str] = None
    password: Optional[str] = None


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str
