# from pydantic import BaseModel
# from typing import List, Optional

# class Room(BaseModel):

#     title: str

#     description: str

#     price: int

#     electricity_charge: int

#     location: str

#     nearby_places: Optional[List[str]] = []

#     area_name: Optional[str] = ""

#     latitude: Optional[float] = None
    
#     longitude: Optional[float] = None

#     image: Optional[str] = ""

#     images: Optional[List[str]] = []

#     room_type: str

#     amenities: Optional[List[str]] = []

#     available: Optional[bool] = True

#     owner_id: Optional[str] = None


# class Room(BaseModel):

#     title: str
#     description: str
#     price: int
#     electricity_charge: int
#     location: str

#     owner_id: str   # ADD THIS

#     nearby_places: Optional[List[str]] = []
#     area_name: Optional[str] = ""

#     latitude: Optional[float] = None
#     longitude: Optional[float] = None

#     image: Optional[str] = ""
#     images: Optional[List[str]] = []

#     room_type: str

#     amenities: Optional[List[str]] = []

#     # available: Optional[bool] = True

from pydantic import BaseModel
from typing import List, Optional

class Room(BaseModel):

    owner_id: str

    title: str
    description: str

    price: int
    electricity_charge: int

    location: str

    nearby_places: Optional[List[str]] = []

    area_name: Optional[str] = ""

    latitude: Optional[float] = None
    longitude: Optional[float] = None

    image: Optional[str] = ""
    images: Optional[List[str]] = []

    room_type: str

    amenities: Optional[List[str]] = []

class RoomStatusUpdate(BaseModel):
    available: bool
