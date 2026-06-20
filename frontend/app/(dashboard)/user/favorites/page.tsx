"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Navbar from "@/components/user/Navbar"
import RoomCard from "@/components/RoomCard"
import API from "@/lib/api"

import {
  Heart,
  Loader2,
} from "lucide-react"

export default function FavoritesPage() {

  const router = useRouter()

  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const loadFavorites = async () => {
    try {
      const userId = localStorage.getItem("userId")

      const favRes = await API.get(
        `/favorites/${userId}`
      )

      const favoriteRooms =
        await Promise.all(
          favRes.data.favorites.map(
            async (fav: any) => {
              const roomRes =
                await API.get(
                  `/rooms/${fav.room_slug}`
                )

              return roomRes.data.room
            }
          )
        )

      setFavorites(favoriteRooms)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  loadFavorites()
}, [])

  const removeFavorite = async (
    roomSlug: string
  ) => {

    try {

      const userId =
        localStorage.getItem("userId")

      await API.delete(
        `/favorites/remove/${userId}/${roomSlug}`
      )

      setFavorites((prev) =>
        prev.filter(
          (item) =>
            item.room_slug !== roomSlug
        )
      )

    } catch (error) {

      console.error(
        "Failed to remove favorite:",
        error
      )
    }
  }

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Header */}

        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-3xl p-8 text-white shadow-xl mb-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
                <Heart className="w-10 h-10 fill-white" />
              </div>

              <div>

                <h1 className="text-3xl md:text-4xl font-black">
                  My Favorites
                </h1>

                <p className="text-white/90 mt-1">
                  Your saved rooms in one place ❤️
                </p>

              </div>

            </div>

            <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl">

              <p className="text-sm text-white/80">
                Total Saved
              </p>

              <h2 className="text-3xl font-bold">
                {favorites.length}
              </h2>

            </div>

          </div>

        </div>

        {/* Loading */}

        {loading && (

          <div className="flex justify-center items-center py-24">

            <Loader2
              size={50}
              className="animate-spin text-pink-500"
            />

          </div>

        )}

        {/* Empty State */}

        {!loading &&
          favorites.length === 0 && (

            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

              <Heart
                size={80}
                className="mx-auto text-pink-400 mb-5"
              />

              <h2 className="text-3xl font-bold text-slate-800 mb-3">
                No Favorite Rooms Yet
              </h2>

              <p className="text-gray-500 mb-8">
                Start exploring rooms and save
                your favorite ones here.
              </p>

              <button
                onClick={() =>
                  router.push("/rooms")
                }
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-2xl transition"
              >
                Explore Rooms
              </button>

            </div>

          )}

        {/* Favorites Grid */}

        {!loading &&
          favorites.length > 0 && (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {favorites.map((room) => (

  <RoomCard
    key={room.slug}
    room={room}
  />

))}

            </div>

          )}

      </div>

    </div>

  )
}