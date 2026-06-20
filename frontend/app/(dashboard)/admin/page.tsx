"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"
import Link from "next/link"
import { redirect } from "next/navigation"

import {
  Users,
  Building2,
  BedDouble,
  CalendarDays,
  ArrowUpRight
} from "lucide-react"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts"

export default function AdminDashboard() {

  //  redirect(
  //   "/admin/secure-panel-8x92k-login"
  // )

  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/auth/admin/analytics")
        setAnalytics(response.data.analytics)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm sm:text-base">
        Loading...
      </div>
    )
  }

  const chartData = [
    { name: "Users", value: analytics.total_users },
    { name: "Owners", value: analytics.total_owners },
    { name: "Rooms", value: analytics.total_rooms },
    { name: "Bookings", value: analytics.total_bookings }
  ]

  return (
    <div className="min-h-screen bg-[#f4f7fe]">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">

        {/* HEADER */}
        <div className="mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Platform overview & analytics
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard title="Users" value={analytics.total_users} icon={<Users />} />
          <StatCard title="Owners" value={analytics.total_owners} icon={<Building2 />} />
          <StatCard title="Rooms" value={analytics.total_rooms} icon={<BedDouble />} />
          <StatCard title="Bookings" value={analytics.total_bookings} icon={<CalendarDays />} />
        </div>

        {/* CHART + ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">

          {/* CHART */}
          <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Platform Growth
            </h2>

            <div className="h-[250px] sm:h-[300px] lg:h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Quick Actions
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <ActionButton label="Manage Users" href="/admin/users" />
              <ActionButton label="Manage Owners" href="/admin/owners" />
              <ActionButton label="Manage Filters" href="/admin/filters" />
              <ActionButton label="Manage Settings" href="/admin/settings" />
            </div>
          </div>
        </div>

        {/* RECENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">

          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Recent Owners
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Connect backend recent owners API here
            </p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Recent Rooms
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Connect backend recent rooms API here
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}

/* ================= STAT CARD ================= */

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm sm:text-base">{title}</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-2 sm:mt-3">
            {value}
          </h2>
        </div>

        <div className="bg-blue-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
          {icon}
        </div>
      </div>
    </div>
  )
}

/* ================= ACTION BUTTON ================= */

function ActionButton({ label, href }: any) {
  return (
    <Link
      href={href}
      className="
        w-full
        flex
        items-center
        justify-between
        px-4 sm:px-5
        py-3 sm:py-4
        text-sm sm:text-base
        rounded-xl sm:rounded-2xl
        border
        hover:bg-gray-50
        transition
        active:scale-[0.98]
      "
    >
      {label}
      <ArrowUpRight size={18} />
    </Link>
  )
}
