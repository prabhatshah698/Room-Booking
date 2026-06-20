"use client"

import { useState } from "react"
import API from "@/lib/api"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"

interface RoomStatusToggleProps {
  slug: string
  available: boolean
  onStatusChange?: (status: boolean) => void
}

export default function RoomStatusToggle({
  slug,
  available,
  onStatusChange
}: RoomStatusToggleProps) {

  const [status, setStatus] = useState(available)

  const [loading, setLoading] = useState(false)

  const toggleStatus = async () => {
  try {

    await API.put(
      `/rooms/update-status/${slug}`,
      {
        available: !status
      }
    )

    setStatus(!status)

    toast.success(
      !status
      ? "Room marked available"
        : "Room marked booked"
    )

  } catch (error) {

    toast.error(
      "Failed to update status"
    )

  }
}

  return (

    <button
      onClick={toggleStatus}
      disabled={loading}
      className={`
        px-4
        py-2
        rounded-xl
        text-sm
        font-bold
        text-white
        transition
        flex
        items-center
        gap-2
        ${status
          ? "bg-green-600 hover:bg-green-700"
          : "bg-red-600 hover:bg-red-700"}
      `}
    >

      {loading && (
        <Loader2
          size={16}
          className="animate-spin"
        />
      )}

      {status
        ? "Available"
        : "Booked"}

    </button>

  )
}