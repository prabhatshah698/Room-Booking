"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import Navbar from "@/components/owner/Navbar"
import Sidebar from "@/components/owner/Sidebar"

import API from "@/lib/api"
import toast from "react-hot-toast"
import ConfirmModal from "@/components/ConfirmModal"

import {
  Shield,
  Settings,
  LogOut
} from "lucide-react"

// -------------------------
// SKELETON UI
// -------------------------
function SettingsSkeleton() {
  return (
    <div className="min-h-screen bg-[#f4f7fe] animate-pulse">

      {/* Navbar */}
      <div className="h-16 bg-white border-b" />

      <div className="flex">

        {/* Sidebar */}
        <div className="w-64 bg-white border-r min-h-screen" />

        {/* Content */}
        <div className="flex-1 p-10 space-y-10">

          {/* Header */}
          <div className="space-y-3">
            <div className="h-10 w-60 bg-gray-200 rounded-xl" />
            <div className="h-4 w-96 bg-gray-200 rounded-lg" />
          </div>

          {/* Security card */}
          <div className="bg-white border rounded-3xl p-8 space-y-6">
            <div className="h-6 w-40 bg-gray-200 rounded-lg" />
            <div className="h-14 w-full bg-gray-200 rounded-2xl" />
          </div>

          {/* Danger zone */}
          <div className="bg-white border rounded-3xl p-8 space-y-6">
            <div className="h-6 w-48 bg-gray-200 rounded-lg" />
            <div className="flex gap-4">
              <div className="h-14 flex-1 bg-gray-200 rounded-2xl" />
              <div className="h-14 flex-1 bg-gray-200 rounded-2xl" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// -------------------------
// MAIN PAGE
// -------------------------
export default function OwnerSettingsPage() {
  const [loading, setLoading] = useState(true)

  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    // simulate hydration / auth check delay
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    window.location.href = "/login/owner"
  }

  const deleteAccount = async () => {
    try {
      const ownerId = localStorage.getItem("ownerId")

      if (!ownerId) {
        toast.error("Owner not found")
        return
      }

      await API.delete(`/owners/delete/${ownerId}`)

      localStorage.clear()

      toast.success("Account deleted successfully")
      window.location.href = "/"

    } catch (err) {
      console.log(err)
      toast.error("Failed to delete account")
    }
  }

  // -------------------------
  // SKELETON STATE
  // -------------------------
  if (loading) return <SettingsSkeleton />

  // -------------------------
  // MAIN UI
  // -------------------------
  return (
    <div className="min-h-screen bg-[#f4f7fe]">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-10">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-5xl font-black">
              Settings
            </h1>
            <p className="text-gray-500 mt-3">
              Manage your account preferences.
            </p>
          </div>

          {/* SECURITY */}
          <div className="bg-white rounded-3xl p-8 border mb-8">

            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-blue-600" />
              <h2 className="text-2xl font-bold">
                Security
              </h2>
            </div>

            <Link
              href="/owner/settings/password"
              className="block bg-gray-50 p-5 rounded-2xl border hover:shadow-md transition"
            >
              Change Password
            </Link>

          </div>

          {/* DANGER ZONE */}
          <div className="bg-white rounded-3xl p-8 border">

            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-red-500" />
              <h2 className="text-2xl font-bold text-red-600">
                Danger Zone
              </h2>
            </div>

            <div className="flex gap-4">

              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition font-medium"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl text-red-600 hover:bg-red-50 transition font-medium"
              >
                Delete Account
              </button>

            </div>

          </div>

        </div>
      </div>cd ""

      {/* MODALS */}
      <ConfirmModal
        isOpen={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout from your account?"
        confirmText="Logout"
        cancelText="Cancel"
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false)
          logout()
        }}
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Account"
        message="This action is permanent. All your data will be deleted."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          setShowDeleteModal(false)
          await deleteAccount()
        }}
      />

    </div>
  )
}