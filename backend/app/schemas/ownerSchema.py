from pydantic import BaseModel
from typing import Optional

class OwnerSchema(BaseModel):
    name: str
    email: str
    phone: str
    city: str

    bio: Optional[str] = ""
    profile_image: Optional[str] = ""

    password: Optional[str] = None


class OwnerUpdateSchema(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    bio: Optional[str] = None
    profile_image: Optional[str] = None