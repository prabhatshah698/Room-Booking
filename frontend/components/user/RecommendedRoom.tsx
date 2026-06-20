"use client"

import RoomCard from "@/components/RoomCard"

interface RecommendedRoomsProps {
  rooms: any[]
  title?: string
  subtitle?: string
}

export default function RecommendedRooms({
  rooms,
  title = "Recommended Rooms",
  subtitle = "Rooms you may like"
}: RecommendedRoomsProps) {

  if (!rooms?.length) return null

  return (
    <section className="mt-16">

      <div className="flex items-end justify-between mb-8">

        <div>
          <h2 className="text-4xl font-black text-gray-900">
            {title}
          </h2>

          <p className="text-gray-500 mt-2">
            {subtitle}
          </p>
        </div>

      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-8
        "
      >
        {rooms.map((room) => (
          <RoomCard
            key={room.slug}
            room={room}
          />
        ))}
      </div>

    </section>
  )
}