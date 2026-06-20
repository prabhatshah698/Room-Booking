"use client"

import { useState, useEffect } from "react"

import Navbar from "@/components/owner/Navbar"
import Sidebar from "@/components/owner/Sidebar"
import RoomForm from "@/components/owner/RoomForm"

function AddRoomPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#f4f7fe] animate-pulse">
      <div className="h-16 bg-white border-b" />

      <div className="flex">
        <div className="hidden lg:block w-64 bg-white border-r min-h-screen" />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="h-10 w-40 bg-gray-200 rounded-xl mb-6" />

          <div className="grid xl:grid-cols-2 gap-6">
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-200 rounded-xl"
                />
              ))}
            </div>

            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded-xl" />
              <div className="h-12 bg-gray-200 rounded-xl" />
              <div className="h-40 bg-gray-200 rounded-xl" />
              <div className="h-40 bg-gray-200 rounded-xl" />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <div className="h-12 w-40 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AddRoomPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <AddRoomPageSkeleton />
  }

  return (
    <div className="min-h-screen bg-[#f4f7fe]">
      <Navbar />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <main className="flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
              Add Room
            </h1>

            <RoomForm />

          </div>
        </main>
      </div>
    </div>
  )
}