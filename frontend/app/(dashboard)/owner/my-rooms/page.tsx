"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

import API from "@/lib/api"
import toast from "react-hot-toast"

import Navbar from "@/components/owner/Navbar"
import Sidebar from "@/components/owner/Sidebar"
import RoomCard from "@/components/RoomCard"

import { Home, CheckCircle2, XCircle } from "lucide-react"

export default function OwnerRoomsPage() {
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // const fetchRooms = async () => {
  //   try {
  //     setLoading(true)
  //     const res = await API.get("/rooms")
  //     setRooms(res.data.rooms || [])
  //   } catch (error) {
  //     console.log(error)
  //     toast.error("Failed to fetch rooms")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  
  const fetchRooms = async () => {
  try {
    setLoading(true);

    const ownerData =
      localStorage.getItem("owner") ||
      sessionStorage.getItem("owner");

    if (!ownerData) {
      toast.error("Please login first");
      return;
    }

    const owner = JSON.parse(ownerData);

    console.log("OWNER DATA:", owner);

    const res = await API.get(
      `/rooms/owner/${owner._id}/rooms`
    );

    setRooms(res.data.rooms || []);
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch rooms");
  } finally {
    setLoading(false);
  }
};

  const deleteRoom = async (slug: string) => {
    const ok = window.confirm("Delete this room permanently?")
    if (!ok) return

    try {
      await API.delete(`/rooms/delete/${slug}`)
      setRooms((prev) => prev.filter((r) => r.slug !== slug))
      toast.success("Room deleted successfully")
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.detail || "Delete failed")
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const stats = useMemo(() => {
    const total = rooms.length
    const available = rooms.filter((r) => r.available).length
    const booked = total - available
    return { total, available, booked }
  }, [rooms])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-10 space-y-8">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Rooms</h1>
              <p className="text-gray-500 mt-1">
                Manage your property listings
              </p>
            </div>

            <Link
              href="/owner/add-room"
              className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-900 transition"
            >
              + Add Room
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {loading ? (
              <>
                <StatSkeleton />
                <StatSkeleton />
                <StatSkeleton />
              </>
            ) : (
              <>
                <StatCard title="Total Rooms" value={stats.total} icon={<Home />} />
                <StatCard title="Available" value={stats.available} icon={<CheckCircle2 className="text-green-600" />} />
                <StatCard title="Booked" value={stats.booked} icon={<XCircle className="text-red-600" />} />
              </>
            )}
          </div>

          {/* GRID */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <RoomSkeleton key={i} />
              ))}
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center bg-white border rounded-2xl p-16">
              <div className="text-5xl mb-3">🏠</div>
              <h2 className="text-2xl font-semibold">No rooms found</h2>
              <p className="text-gray-500 mt-2">
                Create your first listing
              </p>

              <Link
                href="/owner/add-room"
                className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-xl"
              >
                Create Room
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <RoomCard
                  key={room._id}
                  room={room}
                  isOwner
                  onDelete={deleteRoom}
                />
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

/* =========================
   STAT CARD
========================= */
function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white border rounded-2xl p-5 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
  )
}

/* =========================
   STAT SKELETON
========================= */
function StatSkeleton() {
  return (
    <div className="bg-white border rounded-2xl p-5 animate-pulse">
      <div className="h-3 w-24 bg-gray-200 rounded" />
      <div className="h-7 w-16 bg-gray-300 rounded mt-3" />
    </div>
  )
}

/* =========================
   ROOM CARD SKELETON
========================= */
function RoomSkeleton() {
  return (
    <div className="bg-white border rounded-2xl overflow-hidden animate-pulse">
      <div className="h-40 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-gray-300 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 rounded" />
        <div className="h-8 w-full bg-gray-300 rounded" />
      </div>
    </div>
  )
}