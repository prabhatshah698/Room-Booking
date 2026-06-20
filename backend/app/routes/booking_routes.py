from fastapi import APIRouter, Depends, HTTPException
from app.schemas.booking_schema import Booking
from app.auth.dependencies import verify_token
from app.database import db
from datetime import datetime

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)

# =========================
# BOOK ROOM
# =========================
@router.post("/book")
async def book_room(
    booking: Booking,
    user_data: dict = Depends(verify_token)
):

    room = await db.rooms.find_one({
        "slug": booking.room_slug
    })

    if not room:
        raise HTTPException(
            status_code=404,
            detail="Room not found"
        )

    check_in_date = datetime.strptime(
        booking.check_in,
        "%Y-%m-%d"
    )

    check_out_date = datetime.strptime(
        booking.check_out,
        "%Y-%m-%d"
    )

    if check_out_date <= check_in_date:
        raise HTTPException(
            status_code=400,
            detail="Invalid booking dates"
        )

    existing_booking = await db.bookings.find_one({
        "room_slug": booking.room_slug,
        "$or": [
            {
                "check_in": {
                    "$lte": booking.check_out
                },
                "check_out": {
                    "$gte": booking.check_in
                }
            }
        ]
    })

    if existing_booking:
        raise HTTPException(
            status_code=400,
            detail="Room already booked for these dates"
        )

    booking_data = {
        "room_slug": booking.room_slug,
        "room_title": room["title"],
        "user_email": user_data["email"],
        "owner_email": room["owner_email"],
        "check_in": booking.check_in,
        "check_out": booking.check_out,
        "price": room["price"],
        "status": "confirmed",
        "created_at": str(datetime.now())
    }

    await db.bookings.insert_one(
        booking_data
    )

    return {
        "success": True,
        "message": "Room booked successfully"
    }

# =========================
# USER BOOKINGS
# =========================
@router.get("/my-bookings")
async def my_bookings(
    user_data: dict = Depends(verify_token)
):

    bookings = []

    async for booking in db.bookings.find({
        "user_email": user_data["email"]
    }):

        booking["_id"] = str(
            booking["_id"]
        )

        bookings.append(booking)

    return {
        "success": True,
        "bookings": bookings
    }

# =========================
# OWNER BOOKINGS
# =========================
@router.get("/owner-bookings")
async def owner_bookings(
    user_data: dict = Depends(verify_token)
):

    if user_data["role"] != "owner":

        raise HTTPException(
            status_code=403,
            detail="Only owners allowed"
        )

    bookings = []

    async for booking in db.bookings.find({
        "owner_email": user_data["email"]
    }):

        booking["_id"] = str(
            booking["_id"]
        )

        bookings.append(booking)

    return {
        "success": True,
        "bookings": bookings
    }