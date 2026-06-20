from pydantic import BaseModel
from typing import List


class FilterResponse(BaseModel):
    cities: List[str]
    room_types: List[str]
    amenities: List[str]
    nearby_places: List[str]