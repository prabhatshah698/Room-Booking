"use client"

import Link from "next/link"

import Navbar from "@/components/owner/Navbar"
import Sidebar from "@/components/owner/Sidebar"

import {
  BedDouble,
  CheckCircle2,
  ArrowUpRight,
  Search,
  Clock3,
  PlusCircle,
  Users,
  Star,
} from "lucide-react"

export default function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-[#f4f7fe]">
      <Navbar />

      <div className="flex">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN */}
        <div className="flex-1 p-6 lg:p-10">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Here’s what’s happening with your rooms today.
            </p>
          </div>

          {/* STATS */}
          {/* PLATFORM STATUS */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

  <div className="bg-white rounded-2xl p-5 shadow-sm border">
    <div className="flex items-center justify-between">
      <BedDouble className="text-blue-600" />
    </div>

    <h2 className="text-lg font-bold mt-4">
      Growing Platform
    </h2>

    <p className="text-sm text-gray-500 mt-2">
      More room seekers are joining every day. Your listings help us build a better rental marketplace.
    </p>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow-sm border">
    <div className="flex items-center justify-between">
      <Users className="text-purple-600" />
    </div>

    <h2 className="text-lg font-bold mt-4">
      Community First
    </h2>

    <p className="text-sm text-gray-500 mt-2">
      We are continuously improving search, booking, and communication features for owners and tenants.
    </p>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow-sm border">
    <div className="flex items-center justify-between">
      <CheckCircle2 className="text-green-600" />
    </div>

    <h2 className="text-lg font-bold mt-4">
      Better Visibility
    </h2>

    <p className="text-sm text-gray-500 mt-2">
      Complete room details and quality photos help your property get more visibility and inquiries.
    </p>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow-sm border">
    <div className="flex items-center justify-between">
      <Star className="text-yellow-500" />
    </div>

    <h2 className="text-lg font-bold mt-4">
      Thank You ❤️
    </h2>

    <p className="text-sm text-gray-500 mt-2">
      Your support helps us improve the platform. We are working hard to make room renting easier for everyone.
    </p>
  </div>

</div>

          {/* QUICK ACTIONS */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              <Link
                href="owner/add-room"
                className="bg-white p-5 rounded-2xl border hover:shadow-md transition flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <PlusCircle className="text-blue-600" />
                  <span className="font-medium">Add New Room</span>
                </div>
                <ArrowUpRight className="text-gray-400" />
              </Link>

              <Link
                href="/owner/my-rooms"
                className="bg-white p-5 rounded-2xl border hover:shadow-md transition flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <BedDouble className="text-green-600" />
                  <span className="font-medium">Manage Rooms</span>
                </div>
                <ArrowUpRight className="text-gray-400" />
              </Link>

              <Link
                href="/owner/profile"
                className="bg-white p-5 rounded-2xl border hover:shadow-md transition flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Search className="text-purple-600" />
                  <span className="font-medium">View Profile</span>
                </div>
                <ArrowUpRight className="text-gray-400" />
              </Link>

            </div>
          </div>

          {/* PLATFORM UPDATES */}
<div className="mt-10">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">
    Platform Updates
  </h2>

  <div className="bg-white rounded-2xl border shadow-sm divide-y">

    <div className="p-4 flex gap-3">
      <Clock3 className="text-blue-500 mt-1" />
      <div>
        <p className="font-medium text-gray-800">
          Better Search Experience Coming Soon
        </p>
        <p className="text-sm text-gray-500 mt-1">
          We are working on smarter location-based search to help tenants discover your rooms faster.
        </p>
      </div>
    </div>

    <div className="p-4 flex gap-3">
      <Clock3 className="text-green-500 mt-1" />
      <div>
        <p className="font-medium text-gray-800">
          Booking System Improvements
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Upcoming updates will make booking requests and owner responses more convenient.
        </p>
      </div>
    </div>

    <div className="p-4 flex gap-3">
      <Clock3 className="text-purple-500 mt-1" />
      <div>
        <p className="font-medium text-gray-800">
          Thank You For Supporting Us
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Every room listing helps us grow. We appreciate your trust and support as we continue improving the platform.
        </p>
      </div>
    </div>

  </div>
</div>

        </div>
      </div>
    </div>
  )
}