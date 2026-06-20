"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  LogIn,
  ChevronDown,
  Home,
  Heart,
  Building2,
  Users,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
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

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <Link
              href="/"
              className="font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>

            <Link
              href="/rooms"
              className="font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Browse Rooms
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Register */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition font-medium text-gray-700">
                <User size={18} />
                Register
                <ChevronDown size={16} />
              </button>

              <div className="absolute right-0 top-full mt-3 w-80 bg-white border border-gray-100 rounded-3xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-3">
                  <Link
                    href="/register/owner"
                    className="group/item flex items-center justify-between p-4 rounded-2xl hover:bg-blue-50 transition"
                  >
                    <div className="flex gap-3">
                      <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Property Owner
                        </h3>

                        <p className="text-sm text-gray-500">
                          List rooms and manage tenants
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover/item:text-blue-600 group-hover/item:translate-x-1 transition" />
                  </Link>

                  <Link
                    href="/register/user"
                    className="group/item flex items-center justify-between p-4 rounded-2xl hover:bg-green-50 transition"
                  >
                    <div className="flex gap-3">
                      <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Tenant / User
                        </h3>

                        <p className="text-sm text-gray-500">
                          Discover rooms and save favourites
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover/item:text-green-600 group-hover/item:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Login */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition font-medium text-gray-700">
                <LogIn size={18} />
                Login
                <ChevronDown size={16} />
              </button>

              <div className="absolute right-0 top-full mt-3 w-80 bg-white border border-gray-100 rounded-3xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-3">
                  <Link
                    href="/login/owner"
                    className="group/item flex items-center justify-between p-4 rounded-2xl hover:bg-blue-50 transition"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Owner Login
                      </h3>
                      <p className="text-sm text-gray-500">
                        Manage listings and bookings
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover/item:text-blue-600 group-hover/item:translate-x-1 transition" />
                  </Link>

                  <Link
                    href="/login/user"
                    className="group/item flex items-center justify-between p-4 rounded-2xl hover:bg-green-50 transition"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        User Login
                      </h3>
                      <p className="text-sm text-gray-500">
                        View wishlist and bookings
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover/item:text-green-600 group-hover/item:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/register/user"
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              <Heart size={18} />
              Wishlist
            </Link>

            <Link
              href="/register/owner"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
            >
              <Home size={18} />
              List Property
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden h-11 w-11 rounded-xl border border-gray-200 flex items-center justify-center"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden pb-6 border-t border-gray-100">
            <div className="flex flex-col gap-2 pt-4">
              <Link
                href="/"
                className="px-4 py-3 rounded-xl hover:bg-gray-100 font-medium"
              >
                Home
              </Link>

              <Link
                href="/rooms"
                className="px-4 py-3 rounded-xl hover:bg-gray-100 font-medium"
              >
                Browse Rooms
              </Link>

              {/* Register */}
              <button
                onClick={() => setRegisterOpen(!registerOpen)}
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-100 font-medium"
              >
                Register
                <ChevronDown
                  className={`transition ${
                    registerOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {registerOpen && (
                <div className="ml-4 flex flex-col gap-2">
                  <Link
                    href="/register/owner"
                    className="p-3 rounded-xl bg-blue-50"
                  >
                    Property Owner
                  </Link>

                  <Link
                    href="/register/user"
                    className="p-3 rounded-xl bg-green-50"
                  >
                    Tenant / User
                  </Link>
                </div>
              )}

              {/* Login */}
              <button
                onClick={() => setLoginOpen(!loginOpen)}
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-100 font-medium"
              >
                Login
                <ChevronDown
                  className={`transition ${
                    loginOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {loginOpen && (
                <div className="ml-4 flex flex-col gap-2">
                  <Link
                    href="/login/owner"
                    className="p-3 rounded-xl bg-blue-50"
                  >
                    Owner Login
                  </Link>

                  <Link
                    href="/login/user"
                    className="p-3 rounded-xl bg-green-50"
                  >
                    User Login
                  </Link>
                </div>
              )}

              <Link
                href="/wishlist"
                className="mt-2 px-4 py-3 rounded-xl border border-gray-200 font-medium"
              >
                Wishlist
              </Link>

              <Link
                href="/register/owner"
                className="mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-center"
              >
                List Property
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}