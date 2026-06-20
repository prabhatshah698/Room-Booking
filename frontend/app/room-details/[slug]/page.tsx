"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import Navbar from "@/components/Navbar"
import API from "@/lib/api"
import Image from "next/image"

import {
  MapPin,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function RoomDetailsPage() {
  const params = useParams()
  const slug = params.slug as string

  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)

  const [room, setRoom] = useState<any>(null)
  const [owner, setOwner] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(0)
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return

    const distance = touchStartX - touchEndX

    if (distance > minSwipeDistance) {
      nextImage()
    }

    if (distance < -minSwipeDistance) {
      prevImage()
    }
  }

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await API.get(`/rooms/${slug}`)
        const roomData = res.data.room

        setRoom(roomData)

        if (roomData?.owner_id) {
          const ownerRes = await API.get(`/owners/${roomData.owner_id}`)
          setOwner(ownerRes.data.owner)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchRoom()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Room not found
      </div>
    )
  }

  const images =
    room.images?.length > 0
      ? room.images
      : room.image
        ? [room.image]
        : []

  const nextImage = () => {
    if (!images.length) return
    setCurrentImage((p) => (p === images.length - 1 ? 0 : p + 1))
  }

  const prevImage = () => {
    if (!images.length) return
    setCurrentImage((p) => (p === 0 ? images.length - 1 : p - 1))
  }

  const ownerName = owner?.name || "Owner"
  const ownerPhone = owner?.phone || ""
  const ownerCity = owner?.city || ""
  const ownerImage = owner?.profile_image || owner?.image || "/avatar.png"

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">

          {/* TITLE */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {room.title}
            </h1>

            <div className="flex items-center gap-2 mt-3 text-gray-600">
              <MapPin size={18} />
              <span>{room.location}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">

              {/* IMAGE SLIDER */}
              {images.length > 0 && (
                <div className="bg-white rounded-3xl overflow-hidden shadow">

                  <div
                    className="relative h-[400px] sm:h-[500px] select-none"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    <img
                      src={images[currentImage]}
                      className="w-full h-full object-cover transition-all duration-300"
                      alt="room"
                      draggable={false}
                    />

                    {images.length > 1 && (
                      <>
                        {/* LEFT */}
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                        >
                          <ChevronLeft />
                        </button>

                        {/* RIGHT */}
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                        >
                          <ChevronRight />
                        </button>
                      </>
                    )}
                  </div>

                  {/* THUMBNAILS */}
                  <div className="flex gap-3 p-4 overflow-x-auto">
                    {images.map((img: string, i: number) => (
                      <img
                        key={i}
                        src={img}
                        onClick={() => setCurrentImage(i)}
                        className={`w-24 h-20 object-cover rounded-xl cursor-pointer border-2 transition ${currentImage === i
                            ? "border-blue-600 scale-[1.03]"
                            : "border-transparent"
                          }`}
                      />
                    ))}
                  </div>

                </div>
              )}

              {/* DESCRIPTION */}
              <div className="bg-white rounded-3xl p-6 shadow">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-700 leading-7">
                  {room.description}
                </p>
              </div>

              {/* AMENITIES */}
              {room.amenities?.length > 0 && (
                <div className="bg-white rounded-3xl p-6 shadow">
                  <h2 className="text-2xl font-bold mb-4">Amenities</h2>

                  <div className="flex flex-wrap gap-3">
                    {room.amenities.map((a: string, i: number) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* NEARBY */}
              {room.nearby_places?.length > 0 && (
                <div className="bg-white rounded-3xl p-6 shadow">
                  <h2 className="text-2xl font-bold mb-4">
                    Nearby Places
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {room.nearby_places.map((p: string, i: number) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-4 py-2 rounded-xl"
                      >
                        📍 {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">

              {/* PRICE */}
              <div className="bg-white rounded-3xl p-6 shadow">
                <div className="flex items-center gap-2">
                  <IndianRupee />
                  <span className="text-4xl font-bold">
                    {room.price}
                  </span>
                </div>

                <p className="mt-3 text-gray-600">
                  Electricity: ₹{room.electricity_charge}
                </p>

                <p className="text-gray-600">
                  Type: {room.room_type}
                </p>

                <p className="text-gray-600">
                  Area: {room.area_name}
                </p>
              </div>

              {/* OWNER CARD */}
              <div className="bg-white rounded-3xl p-6 shadow">
                <h2 className="text-xl font-bold mb-4">
                  Contact Owner
                </h2>

                <div className="flex items-center gap-4">
                  <Image
                    src={ownerImage}
                    alt={ownerName}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                    unoptimized
                  />

                  <div>
                    <h3 className="font-bold">{ownerName}</h3>
                    <p className="text-sm text-gray-500">
                      Property Owner
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">City</p>
                    <p className="font-semibold">
                      {ownerCity || "N/A"}
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold">
                      {ownerPhone || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <a
                    href={`tel:${ownerPhone}`}
                    className="block text-center bg-black text-white py-3 rounded-xl"
                  >
                    📞 Call Owner
                  </a>

                  <a
                    href={`https://wa.me/${ownerPhone}?text=${encodeURIComponent(
                      `Hello, I am interested in your room: ${room.title}`
                    )}`}
                    target="_blank"
                    className="block text-center bg-green-600 text-white py-3 rounded-xl"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* MAP */}
              {room.latitude && room.longitude && (
                <div className="bg-white rounded-3xl p-6 shadow">
                  <h2 className="text-xl font-bold mb-4">
                    Location
                  </h2>

                  <iframe
                    className="w-full h-[300px] rounded-xl border"
                    loading="lazy"
                    src={`https://maps.google.com/maps?q=${room.latitude},${room.longitude}&z=16&output=embed`}
                  />
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </>
  )
}