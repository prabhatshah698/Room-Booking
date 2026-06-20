"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { useUser } from "@/app/context/UserContext"

import {
  Home,
  Heart,
  CalendarDays,
  User,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react"

export default function Navbar() {
  const { userName, profileImage } = useUser()
  const router = useRouter()

  const [mobileOpen, setMobileOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem("userId")
    router.push("/login/user")
  }

  const closeMenu = () => setMobileOpen(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="h-11 w-11 rounded-2xl  from-blue-600 to-indigo-600 flex items-center justify-center">
            <img src="/favicon.ico" alt="Logo" />
            </div>
          <div>
              <h1 className="text-xl sm:text-2xl font-black leading-none">
                <span className="text-blue-600">RentAL</span>
                {/* <span className="text-gray-900">All</span> */}
              </h1>

              <p className="text-xs text-gray-500 hidden sm:block">
                Find Your Perfect Stay
              </p>
            </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">

          <Link href="/" className="flex items-center gap-2 hover:text-blue-600">
            <Home size={18} />
            Home
          </Link>

          <Link href="/user" className="flex items-center gap-2 hover:text-blue-600">
            <User size={18} />
            Dashboard
          </Link>

          <Link href="/user/favorites" className="flex items-center gap-2 hover:text-blue-600">
            <Heart size={18} />
            Favorites
          </Link>

          <Link href="/user/settings" className="flex items-center gap-2 hover:text-blue-600">
            <Bell size={18} />
            Settings
          </Link>
        </div>

        {/* RIGHT SIDE (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">

          <Link
            href="/user/profile"
            className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden"
          >
            <Image
              src={profileImage || "/avatar.png"}
              alt={userName || "User"}
              width={44}
              height={44}
              className="rounded-full object-cover"
              unoptimized
            />
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 rounded-lg border"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4 animate-in slide-in-from-top">

          <Link onClick={closeMenu} href="/" className="flex items-center gap-2">
            <Home size={18} /> Home
          </Link>

          <Link onClick={closeMenu} href="/user" className="flex items-center gap-2">
            <User size={18} /> Dashboard
          </Link>

          <Link onClick={closeMenu} href="/user/favorites" className="flex items-center gap-2">
            <Heart size={18} /> Favorites
          </Link>

          <Link onClick={closeMenu} href="/user/settings" className="flex items-center gap-2">
            <Bell size={18} /> Settings
          </Link>

          <div className="flex items-center justify-between pt-4 border-t">

            <Link
              onClick={closeMenu}
              href="/user/profile"
              className="flex items-center gap-2"
            >
              <Image
                src={profileImage || "/avatar.png"}
                alt={userName || "User"}
                width={32}
                height={32}
                className="rounded-full"
                unoptimized
              />
              Profile
            </Link>

            <button
              onClick={() => {
                closeMenu()
                logout()
              }}
              className="flex items-center gap-2 text-red-500"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        </div>
      )}
    </nav>
  )
}