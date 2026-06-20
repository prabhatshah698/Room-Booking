from pydantic import BaseModel

class Booking(BaseModel):

    room_slug: str
    check_in: str
    check_out: str