"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"

import {
  Heart,
  Loader2
} from "lucide-react"

import toast from "react-hot-toast"

interface FavoriteButtonProps {
  roomSlug: string
}

export default function FavoriteButton({
  roomSlug
}: FavoriteButtonProps) {

  const [loading, setLoading] =
    useState(false)

  const [favorited, setFavorited] =
    useState(false)

  // =========================
  // CHECK FAVORITE STATUS
  // =========================

  useEffect(() => {

    const checkFavorite = async () => {

      try {

        const userId =
          localStorage.getItem(
            "userId"
          )

        if (!userId) return

        const response =
          await API.get(
            `/favorites/check/${userId}/${roomSlug}`
          )

        setFavorited(
          response.data.isFavorite
        )

      } catch (error) {

        console.log(error)
      }
    }

    checkFavorite()

  }, [roomSlug])

  // =========================
  // TOGGLE FAVORITE
  // =========================

  const toggleFavorite = async () => {

    try {

      const userId =
        localStorage.getItem(
          "userId"
        )

      if (!userId) {

        toast.error(
          "Please login first"
        )

        return
      }

      setLoading(true)

      // REMOVE

      if (favorited) {

        await API.delete(
          `/favorites/remove/${userId}/${roomSlug}`
        )

        setFavorited(false)

        toast.success(
          "Removed from favorites"
        )

      } else {

        // ADD

        await API.post(
          "/favorites/add",
          {
            user_id: userId,
            room_slug: roomSlug
          }
        )

        setFavorited(true)

        toast.success(
          "Added to favorites ❤️"
        )
      }

    } catch (error) {

      console.log(error)

      toast.error(
        "Something went wrong"
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`
        group
        relative
        flex
        items-center
        justify-center
        w-12
        h-12
        rounded-full
        backdrop-blur-md
        shadow-lg
        border
        transition-all
        duration-300
        hover:scale-110
        active:scale-95

        ${
          favorited
            ? "bg-gradient-to-r from-red-500 to-pink-500 border-red-400"
            : "bg-white/90 border-gray-200 hover:border-red-300"
        }
      `}
    >

      {loading ? (

        <Loader2
          size={20}
          className="animate-spin text-red-500"
        />

      ) : (

        <Heart
          size={22}
          className={`
            transition-all
            duration-300

            ${
              favorited
                ? "text-white fill-white"
                : "text-red-500"
            }
          `}
        />

      )}

    </button>
  )
}