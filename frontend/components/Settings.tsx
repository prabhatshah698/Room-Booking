"use client"

import { useState } from "react"

import Navbar from "@/components/owner/Navbar"
import Sidebar from "@/components/owner/Sidebar"

import {
  Bell,
  Shield,
  Trash2,
  LogOut,
  Settings
} from "lucide-react"

export default function SettingsPage() {

  const [emailNotification,
    setEmailNotification] =
    useState(true)

  const [bookingNotification,
    setBookingNotification] =
    useState(true)

  const [whatsappNotification,
    setWhatsappNotification] =
    useState(false)

  return (

    <div className="min-h-screen bg-[#f4f7fe]">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-10">

          <div className="mb-10">

            <h1 className="text-5xl font-black">
              Settings
            </h1>

            <p className="text-gray-500 mt-3">
              Manage your account preferences.
            </p>

          </div>

          {/* Notifications */}

          <div className="bg-white rounded-3xl p-8 border mb-8">

            <div className="flex items-center gap-3 mb-6">

              <Bell />

              <h2 className="text-2xl font-bold">
                Notifications
              </h2>

            </div>

            <div className="space-y-5">

              <SettingToggle
                title="Email Notifications"
                enabled={emailNotification}
                onChange={
                  setEmailNotification
                }
              />

              <SettingToggle
                title="Booking Notifications"
                enabled={bookingNotification}
                onChange={
                  setBookingNotification
                }
              />

              <SettingToggle
                title="WhatsApp Notifications"
                enabled={whatsappNotification}
                onChange={
                  setWhatsappNotification
                }
              />

            </div>

          </div>

          {/* Security */}

          <div className="bg-white rounded-3xl p-8 border mb-8">

            <div className="flex items-center gap-3 mb-6">

              <Shield />

              <h2 className="text-2xl font-bold">
                Security
              </h2>

            </div>

            <button
              className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-2xl
              "
            >
              Change Password
            </button>

          </div>

          {/* Danger Zone */}

          <div className="bg-white rounded-3xl p-8 border">

            <div className="flex items-center gap-3 mb-6">

              <Settings />

              <h2 className="text-2xl font-bold text-red-600">
                Danger Zone
              </h2>

            </div>

            <div className="flex gap-4">

              <button
                className="
                flex
                items-center
                gap-2
                bg-orange-500
                text-white
                px-6
                py-3
                rounded-2xl
                "
              >
                <LogOut size={18} />
                Logout
              </button>

              <button
                className="
                flex
                items-center
                gap-2
                bg-red-600
                text-white
                px-6
                py-3
                rounded-2xl
                "
              >
                <Trash2 size={18} />
                Delete Account
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

function SettingToggle({
  title,
  enabled,
  onChange
}: any) {

  return (

    <div className="flex items-center justify-between">

      <span className="font-medium">
        {title}
      </span>

      <button
        onClick={() =>
          onChange(!enabled)
        }
        className={`
          w-14
          h-8
          rounded-full
          transition
          ${
            enabled
              ? "bg-green-500"
              : "bg-gray-300"
          }
        `}
      >
        <div
          className={`
            w-6
            h-6
            bg-white
            rounded-full
            transition
            ${
              enabled
                ? "translate-x-7"
                : "translate-x-1"
            }
          `}
        />
      </button>

    </div>

  )
}