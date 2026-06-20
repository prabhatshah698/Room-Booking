"use client"

import Link from "next/link"

import {
  ShieldCheck,
  Menu,
} from "lucide-react"

interface AdminNavbarProps {
  adminName?: string
  profileImage?: string
  onMenuClick?: () => void
}

export default function AdminNavbar({
  adminName = "Admin",
  profileImage = "/avatar.png",
  onMenuClick,
}: AdminNavbarProps) {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        bg-white/80
        backdrop-blur-xl
        border-b
        border-gray-200
      "
    >
      <div
        className="
          h-20
          px-4
          sm:px-6
          lg:px-8
          flex
          items-center
          justify-between
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">

          <button
            onClick={onMenuClick}
            className="
              lg:hidden
              h-11
              w-11
              rounded-xl
              bg-gray-100
              hover:bg-gray-200
              transition
              flex
              items-center
              justify-center
            "
          >
            <Menu size={20} />
          </button>

          <Link
            href="/dashboard/admin"
            className="flex items-center gap-3"
          >
            <div
              className="
                h-11
                w-11
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                text-white
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <ShieldCheck size={20} />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-lg font-black text-gray-900">
                Admin Panel
              </h1>

              <p className="text-xs text-gray-500">
                Full System Access
              </p>
            </div>
          </Link>

        </div>

        {/* RIGHT */}
        <Link
          href="/admin/profile"
          className="
            flex
            items-center
            gap-3
            bg-white
            border
            border-gray-200
            rounded-2xl
            px-2
            sm:px-3
            py-2
            hover:shadow-md
            hover:border-gray-300
            transition-all
          "
        >
          <img
            src={profileImage}
            alt="Admin"
            className="
              h-10
              w-10
              rounded-full
              object-cover
              border
            "
          />

          <div className="hidden md:block">
            <p className="text-xs text-gray-500">
              System Administrator
            </p>

            <h4 className="font-bold text-gray-900">
              {adminName}
            </h4>
          </div>
        </Link>
      </div>
    </header>
  )
}