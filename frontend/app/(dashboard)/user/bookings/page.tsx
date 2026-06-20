"use client"

import { useEffect, useState } from "react"

import Navbar from "@/components/user/Navbar"

import {
  CalendarDays,
  MapPin,
  Phone,
  IndianRupee,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react"

export default function UserBookingsPage() {

  const [bookings, setBookings] =
    useState([
      {
        _id: "1",
        room_title: "Modern Single Room",
        location: "Delhi",
        rent: 8500,
        owner_name: "Raj Sharma",
        owner_phone: "9876543210",
        move_in_date: "2026-06-15",
        status: "approved"
      },
      {
        _id: "2",
        room_title: "Luxury Flat",
        location: "Mumbai",
        rent: 18000,
        owner_name: "Amit Singh",
        owner_phone: "9123456789",
        move_in_date: "2026-07-01",
        status: "pending"
      }
    ])

  const getStatusBadge = (
    status: string
  ) => {

    switch (status) {

      case "approved":
        return (
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <CheckCircle size={18} />
            Approved
          </div>
        )

      case "rejected":
        return (
          <div className="flex items-center gap-2 text-red-600 font-semibold">
            <XCircle size={18} />
            Rejected
          </div>
        )

      default:
        return (
          <div className="flex items-center gap-2 text-yellow-600 font-semibold">
            <Clock size={18} />
            Pending
          </div>
        )
    }
  }

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-black text-gray-900">

            My Bookings

          </h1>

          <p className="text-gray-500 mt-2">

            Track all room booking requests

          </p>

        </div>

        {/* BOOKINGS */}

        <div className="grid lg:grid-cols-2 gap-8">

          {
            bookings.map((booking) => (

              <div
                key={booking._id}
                className="bg-white rounded-3xl shadow-sm border p-6"
              >

                <div className="flex justify-between items-center">

                  <h2 className="text-2xl font-bold">

                    {booking.room_title}

                  </h2>

                  {getStatusBadge(
                    booking.status
                  )}

                </div>

                <div className="space-y-4 mt-6">

                  <div className="flex items-center gap-3 text-gray-600">

                    <MapPin size={18} />

                    {booking.location}

                  </div>

                  <div className="flex items-center gap-3 text-gray-600">

                    <IndianRupee size={18} />

                    ₹ {booking.rent}/month

                  </div>

                  <div className="flex items-center gap-3 text-gray-600">

                    <CalendarDays size={18} />

                    Move In:
                    {booking.move_in_date}

                  </div>

                  <div className="flex items-center gap-3 text-gray-600">

                    <Phone size={18} />

                    {booking.owner_phone}

                  </div>

                </div>

                <div className="border-t mt-6 pt-6">

                  <h3 className="font-bold">

                    Owner

                  </h3>

                  <p className="text-gray-600">

                    {booking.owner_name}

                  </p>

                </div>

                <div className="flex gap-4 mt-6">

                  <button
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold"
                  >
                    View Details
                  </button>

                  <button
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}