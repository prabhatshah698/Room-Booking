"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import API from "@/lib/api"
import Navbar from "@/components/user/Navbar"
import RecommendedRooms from "@/components/user/RecommendedRoom"

import {
  Home,
  Heart,
  CalendarDays,
  User,
  Loader2,
  Sparkles,
} from "lucide-react"

type Room = any

type StatCard = {
  title: string
  value: number
  icon: React.ElementType
  gradient: string
}

export default function UserDashboardPage() {
  const [recommendedRooms, setRecommendedRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState<StatCard[]>([
    {
      title: "Favorites",
      value: 0,
      icon: Heart,
      gradient: "from-rose-500 to-pink-500",
    },
    // {
    //   title: "Bookings",
    //   value: 0,
    //   icon: CalendarDays,
    //   gradient: "from-indigo-500 to-blue-500",
    // },
    // {
    //   title: "Profile Views",
    //   value: 0,
    //   icon: User,
    //   gradient: "from-emerald-500 to-teal-500",
    // },
  ])

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)

        const userId = localStorage.getItem("userId")

        const [roomsRes, favRes] = await Promise.all([
          API.get("/rooms"),
          userId ? API.get(`/favorites/${userId}`) : Promise.resolve({ data: { favorites: [] } }),
        ])

        const rooms = roomsRes.data.rooms || []

        setRecommendedRooms(
          [...rooms]
            .sort(() => Math.random() - 0.5)
            .slice(0, 6)
        )

        const favorites = favRes.data.favorites?.length || 0

        setStats((prev) =>
          prev.map((s) =>
            s.title === "Favorites" ? { ...s, value: favorites } : s
          )
        )
      } catch (error) {
        console.error("Dashboard load error:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HERO */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Welcome back 👋
            </h1>
            <p className="text-slate-500 mt-1">
              Here’s what’s happening with your activity
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl">
            <Sparkles size={18} />
            <span className="text-sm font-medium">Personalized Dashboard</span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 text-white shadow-md bg-gradient-to-br ${item.gradient} hover:shadow-xl transition`}
              >
                <Icon size={26} className="opacity-90" />

                <h2 className="text-2xl sm:text-3xl font-bold mt-4">
                  {loading ? (
                    <Loader2 className="animate-spin" size={22} />
                  ) : (
                    item.value
                  )}
                </h2>

                <p className="text-white/90 text-sm mt-1">
                  {item.title}
                </p>
              </div>
            )
          })}
        </div>

        {/* QUICK ACTIONS */}
        <section className="mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <ActionCard href="/rooms" icon={Home} title="Browse Rooms" />
            {/* <ActionCard href="/dashboard/user/bookings" icon={CalendarDays} title="My Bookings" /> */}
            <ActionCard href="/dashboard/user/favorites" icon={Heart} title="Favorites" />
            <ActionCard href="/dashboard/user/profile" icon={User} title="Profile" />
          </div>
        </section>

        {/* RECOMMENDED */}
        <section className="mt-12">
          <RecommendedRooms
            rooms={recommendedRooms}
            title="Recommended for you"
            subtitle="Based on your recent activity"
          />
        </section>

      </main>
    </div>
  )
}

/* ================= ACTION CARD ================= */

function ActionCard({
  href,
  icon: Icon,
  title,
}: {
  href: string
  icon: React.ElementType
  title: string
}) {
  return (
    <Link
      href={href}
      className="
        group bg-white border border-slate-100
        rounded-2xl p-5 sm:p-6
        shadow-sm hover:shadow-lg
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      <div className="text-slate-700 group-hover:text-indigo-600 transition">
        <Icon size={24} />
      </div>

      <h3 className="font-semibold text-base mt-4 text-slate-800">
        {title}
      </h3>

      <p className="text-xs text-slate-500 mt-1">
        Open section
      </p>
    </Link>
  )
}