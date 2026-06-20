"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import API from "@/lib/api"

import {
  User,
  Phone,
  Mail,
  MapPin,
  Home,
  CheckCircle,
  CalendarDays
} from "lucide-react"

export default function OwnerDetailsPage() {

  const params = useParams()

  const ownerId =
    params.ownerId as string

  const [owner, setOwner] =
    useState<any>(null)

  const [rooms, setRooms] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const fetchData = async () => {

      try {

        const ownerRes =
          await API.get(
            `/owners/${ownerId}`
          )

        setOwner(
          ownerRes.data.owner
        )

        const roomRes =
          await API.get(
            `/owners/owner/${ownerId}/rooms`
          )

        setRooms(
          roomRes.data.rooms || []
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

    if (ownerId) {
      fetchData()
    }

  }, [ownerId])

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    )
  }

  const availableRooms =
    rooms.filter(
      room => room.available
    )

  const bookedRooms =
    rooms.filter(
      room => !room.available
    )

  return (

    <div className="p-10">

      {/* OWNER INFO */}

      <div className="bg-white rounded-3xl p-8 shadow mb-10">

        <div className="flex items-center gap-6">

          <img
            src={
              owner?.profile_image ||
              "/avatar.png"
            }
            className="
              w-24
              h-24
              rounded-full
              object-cover
            "
          />

          <div>

            <h1 className="text-4xl font-bold">
              {owner?.name}
            </h1>

            <div className="mt-3 space-y-2">

              <p className="flex gap-2">
                <Mail size={18}/>
                {owner?.email}
              </p>

              <p className="flex gap-2">
                <Phone size={18}/>
                {owner?.phone}
              </p>

              <p className="flex gap-2">
                <MapPin size={18}/>
                {owner?.city}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-8 rounded-3xl shadow">

          <Home size={35}/>

          <h2 className="text-4xl font-bold mt-4">
            {rooms.length}
          </h2>

          <p>Total Rooms</p>

        </div>

        <div className="bg-white p-8 rounded-3xl shadow">

          <CheckCircle size={35}/>

          <h2 className="text-4xl font-bold mt-4">
            {availableRooms.length}
          </h2>

          <p>Available Rooms</p>

        </div>

        <div className="bg-white p-8 rounded-3xl shadow">

          <CalendarDays size={35}/>

          <h2 className="text-4xl font-bold mt-4">
            {bookedRooms.length}
          </h2>

          <p>Booked Rooms</p>

        </div>

      </div>

      {/* ROOMS */}

      <div className="bg-white rounded-3xl p-8 shadow">

        <h2 className="text-3xl font-bold mb-6">
          Added Rooms
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {rooms.map((room) => (

            <div
              key={room._id}
              className="
                border
                rounded-3xl
                overflow-hidden
              "
            >

              <img
                src={room.image}
                className="
                  h-52
                  w-full
                  object-cover
                "
              />

              <div className="p-5">

                <h3 className="font-bold text-xl">
                  {room.title}
                </h3>

                <p className="text-gray-500">
                  {room.location}
                </p>

                <p className="mt-2 font-bold">
                  ₹{room.price}
                </p>

                <div className="mt-4">

                  {room.available ? (

                    <span className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                    ">
                      Available
                    </span>

                  ) : (

                    <span className="
                      bg-red-100
                      text-red-700
                      px-3
                      py-1
                      rounded-full
                    ">
                      Booked
                    </span>

                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}