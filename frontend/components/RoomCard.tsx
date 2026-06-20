"use client"

import Link from "next/link"

import FavoriteButton from "./FavoriteButton"

import EditRoomButton from "../components/owner/EditRoomButton"
import DeleteRoomButton from "./DeleteButton"
import RoomStatusToggle from "./owner/RoomStatusToggle"

import {
  MapPin,
  Bath,
  BedDouble
} from "lucide-react"

interface RoomCardProps {
  room: any
  isOwner?: boolean
  onDelete?: (slug: string) => void
}

export default function RoomCard({
  room,
  isOwner = false,
  onDelete
}: RoomCardProps) {

  const image =
    room.images?.find(
      (img: string) =>
        img &&
        img.trim() !== ""
    ) ||
    room.image ||
    "/placeholder.png"

  const CardContent = (

    <div
      className="
      bg-white
      border
      border-gray-300
      rounded-lg
      overflow-hidden
      hover:shadow-lg
      transition-all
      duration-300
      cursor-pointer
      "
    >

      {/* IMAGE */}

      <div className="p-2 pb-0">

        <div className="relative">

          <img
            src={image}
            alt={room.title}
            className="
      w-full
      h-[140px]
      object-cover
      rounded-md
      "
          />

          {!isOwner && (

            <div
              className="absolute top-2 right-2"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <FavoriteButton
                roomSlug={room.slug}
              />
            </div>

          )}

          <div className="absolute bottom-2 left-2">

            {isOwner ? (

              <RoomStatusToggle
                slug={room.slug}
                available={room.available}
              />

            ) : (

              <span
                className={`
        px-2
        py-1
        rounded-full
        text-[10px]
        font-bold
        ${room.available
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  }
      `}
              >
                {room.available
                  ? "Available"
                  : "Booked"}
              </span>

            )}

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-3">

        {/* PRICE */}

        <h3
          className="
  font-bold
  text-base
  mt-2
  line-clamp-1
  "
        >
          {room.title}
        </h3>
        <h2
          className="
          text-2xl
          font-extrabold
          text-black
          "
        >
          ₹ {room.price}
        </h2>

        {/* DETAILS */}

        <div
          className="
  flex
  flex-wrap
  items-center
  gap-2
  mt-2
  text-gray-700
  text-xs
  "
        >

          <BedDouble size={13} />

          <span>
            {room.room_type}
          </span>

          {room.area_name && (
            <>
              <span>•</span>
              <span>
                {room.area_name}
              </span>
            </>
          )}

        </div>

        {/* DESCRIPTION */}

        <p
  className="
  text-gray-500
  text-xs
  mt-2
  "
>
  {room.description
    ?.split(" ")
    .slice(0, 7)
    .join(" ")}
  {room.description &&
    room.description.split(" ").length > 7 &&
    " ......"}
</p>

        <p
          className="
  text-xs
  text-blue-600
  mt-2
  font-medium
  "
        >
          Electricity: ₹{room.electricity_charge}/month
        </p>

        {/* LOCATION */}

        <div
          className="
          flex
          justify-between
          items-center
          mt-3
          "
        >

          <div
            className="
            flex
            items-center
            gap-1
            text-[10px]
            uppercase
            text-gray-500
            "
          >

            <MapPin size={10} />

            <span className="truncate">
              {room.location}
            </span>

          </div>

          <span
            className="
            text-[10px]
            text-gray-500
            uppercase
            "
          >
            TODAY
          </span>

        </div>

        {/* OWNER BUTTONS */}

        {isOwner && (

          <div
            className="
            flex
            gap-2
            mt-3
            "
            onClick={(e) =>
              e.preventDefault()
            }
          >

            <EditRoomButton
              slug={room.slug}
            />

            <DeleteRoomButton
              slug={room.slug}
              onDelete={onDelete!}
            />

          </div>

        )}

      </div>

    </div>

  )

  if (isOwner) {
    return CardContent
  }

  return (

    <Link
      href={`/room-details/${room.slug}`}
      className="block"
    >
      {CardContent}
    </Link>

  )
}