"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useOwner } from "@/app/context/OwnerContext"

import {
  Menu,
  X,
  ChevronDown,
  Home,
  Building2,
  LayoutDashboard,
  BedDouble,
  PlusCircle,
  Settings,
} from "lucide-react"

export default function Navbar() {
  const { ownerName, profileImage, loading } = useOwner() as any
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    {
      href: "/owner",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      href: "/owner/add-room",
      icon: <PlusCircle className="w-5 h-5" />,
      label: "Add Room",
    },
    {
      href: "/owner/my-rooms",
      icon: <BedDouble className="w-5 h-5" />,
      label: "My Rooms",
    },
    {
      href: "/rooms",
      icon: <Building2 className="w-5 h-5" />,
      label: "Browse Rooms",
    },
    {
      href: "/owner/settings",
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
    },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center justify-between px-4 lg:px-8 h-20">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl  from-blue-600 to-indigo-600 flex items-center justify-center">
                <img src="/favicon.ico" alt="Logo" />
              </div>

              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  RentAL
                </h1>

                <p className="hidden sm:block text-xs text-gray-500">
                  Property Management Dashboard
                </p>
              </div>
        </Link>
          </div>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </nav>

        {/* PROFILE */}
        <Link
          href="/owner/profile"
          className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-3 py-2 hover:shadow-sm hover:bg-gray-50 transition"
        >
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          ) : (
            <Image
              src={profileImage || "/avatar.png"}
              alt={ownerName || "Owner"}
              width={40}
              height={40}
              className="rounded-full object-cover"
              unoptimized
            />
          )}

          <div className="hidden md:block">
            {loading ? (
              <div className="space-y-2">
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-2 w-16 bg-gray-100 rounded animate-pulse" />
              </div>
            ) : (
              <>
                <p className="text-sm font-semibold text-gray-900">
                  {ownerName}
                </p>
                <p className="text-xs text-gray-500">
                  Property Owner
                </p>
              </>
            )}
          </div>

          <ChevronDown className="hidden md:block w-4 h-4 text-gray-400" />
        </Link>
      </div>
    </header >

      {/* MOBILE SIDEBAR */ }
      < div
  className = {`fixed inset-0 z-[100] transition-all duration-300 ${mobileOpen
      ? "visible bg-black/40"
      : "invisible bg-transparent"
    }`
}
onClick = {() => setMobileOpen(false)}
      >
  <div
    onClick={(e) => e.stopPropagation()}
    className={`absolute left-0 top-0 h-full w-[280px] bg-white shadow-xl transition-transform duration-300 ${mobileOpen
        ? "translate-x-0"
        : "-translate-x-full"
      }`}
  >
    <div className="flex items-center justify-between p-5 border-b">
      <h2 className="font-bold text-lg">
        Owner Menu
      </h2>

      <button
        onClick={() => setMobileOpen(false)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <X className="w-5 h-5" />
      </button>
    </div>

    <div className="p-4 space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
        >
          {item.icon}
          <span className="font-medium">
            {item.label}
          </span>
        </Link>
      ))}

      <Link
        href="/"
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
      >
        <Home className="w-5 h-5" />
        Home
      </Link>
    </div>
  </div>
      </div >
    </>
  )
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition font-medium"
    >
      {icon}
      {label}
    </Link>
  )
}