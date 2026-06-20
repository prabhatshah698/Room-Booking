"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import API from "@/lib/api"
import toast from "react-hot-toast"
import ConfirmModal from "@/components/ConfirmModal"

import {
  LayoutDashboard,
  BedDouble,
  PlusCircle,
  User,
  Settings,
  LogOut
} from "lucide-react"

export default function Sidebar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const pathname = usePathname()

  const menuItems = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: LayoutDashboard
    },

    {
      name: "Profile",
      path: "/owner/profile",
      icon: User
    },
    
    {
      name: "My Rooms",
      path: "/owner/my-rooms",
      icon: BedDouble
    },

    {
      name: "Add Room",
      path: "/owner/add-room",
      icon: PlusCircle
    },


    {
      name: "Settings",
      path: "/owner/settings",
      icon: Settings
    }
  ]

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

      toast.success(
        "Account deleted successfully"
      )

      window.location.href = "/"
    } catch (error) {
      console.log(error)

      toast.error(
        "Failed to delete account"
      )
    }
  }

  return (
    <>
      <aside className="hidden lg:block w-[290px] min-h-screen bg-white border-r border-gray-200">

        {/* NAVIGATION */}
          <div className="px-4 py-6">

          <p className="px-3 mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Navigation
          </p>

          <div className="space-y-2">

            {menuItems.map((item, index) => {
              const Icon = item.icon

              const isActive =
                pathname === item.path

              return (
                <Link
                  key={index}
                  href={item.path}
                >
                  <div
                    className={`
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? "bg-blue-50 text-blue-700 border border-blue-100 font-semibold shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />

                    <span>
                      {item.name}
                    </span>
                  </div>
                </Link>
              )
            })}

          </div>
        </div>

        {/* ACCOUNT */}
<div className="mt-6 border-t border-gray-100 pt-4">

          <p className="px-2 mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Account
          </p>

          <div className="space-y-2">

            <button
              onClick={() =>
                setShowLogoutModal(true)
              }
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-gray-700
                hover:bg-gray-50
                transition
              "
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>

            {/* <button
              onClick={() =>
                setShowDeleteModal(true)
              }
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-red-600
                hover:bg-red-50
                transition
              "
            >
              Delete Account
            </button> */}

          </div>

        </div>
      </aside>

      {/* LOGOUT MODAL */}
      <ConfirmModal
        isOpen={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout from your account?"
        confirmText="Logout"
        cancelText="Cancel"
        onCancel={() =>
          setShowLogoutModal(false)
        }
        onConfirm={() => {
          setShowLogoutModal(false)
          logout()
        }}
      />

      {/* DELETE MODAL */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Account"
        message="This action is permanent. All your rooms, profile information and account data will be deleted."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() =>
          setShowDeleteModal(false)
        }
        onConfirm={async () => {
          setShowDeleteModal(false)
          await deleteAccount()
        }}
      />
    </>
  )
}