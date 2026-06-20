"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  BarChart3,
  Settings,
  UserCircle,
  LogOut,
  SlidersHorizontal,
  X,
} from "lucide-react"

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    label: "Owners",
    icon: Building2,
    href: "/admin/owners",
  },
  {
    label: "Filters",
    icon: SlidersHorizontal,
    href: "/admin/filters",
  },
  {
    label: "Bookings",
    icon: CalendarDays,
    href: "/admin/bookings",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
  },
  {
    label: "Profile",
    icon: UserCircle,
    href: "/admin/profile",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const pathname = usePathname()

  const logout = () => {

  localStorage.removeItem("adminToken")

  localStorage.removeItem("adminRole")

  localStorage.removeItem("deviceId")

  localStorage.removeItem("adminDevice")

  window.location.href = "/admin/login"
}

  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden

          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          h-screen
          w-72
          bg-white
          border-r
          shadow-xl lg:shadow-none

          flex
          flex-col

          transition-transform
          duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* HEADER */}
        <div className="border-b p-6 flex items-center justify-between">

          <div>
            <h1
              className="
                text-2xl
                font-black
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                bg-clip-text
                text-transparent
              "
            >
              Admin Panel
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage Platform
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              lg:hidden
              w-10
              h-10
              rounded-xl
              hover:bg-gray-100
              flex
              items-center
              justify-center
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon

              const active =
                pathname === item.href ||
                (item.href !== "/admin" &&
                  pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onClose()
                    }
                  }}
                  className={`
                    flex
                    items-center
                    gap-4
                    px-4
                    py-3.5
                    rounded-2xl
                    transition-all
                    font-medium

                    ${
                      active
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon size={20} />

                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3

              py-3.5
              rounded-2xl

              bg-red-50
              text-red-600

              font-semibold

              hover:bg-red-100

              transition
            "
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}