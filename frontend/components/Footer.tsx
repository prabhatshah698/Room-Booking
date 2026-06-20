"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-950 to-black text-white">

      {/* Top CTA */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              Find Your Perfect Room Today
            </h2>
            <p className="text-gray-400 mt-2">
              Thousands of rooms, flats available across Nepal.
            </p>
          </div>

          <Link
            href="/rooms"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition"
          >
            Browse Rooms
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              href="/"
              className="text-3xl font-black"
            >
              <span className="text-blue-500">RentAL</span>
              {/* <span>Finder</span> */}
            </Link>

            <p className="mt-5 text-gray-400 leading-relaxed max-w-md">
              RoomFinder connects tenants with trusted property owners,
              making room rentals simple, secure, and accessible throughout Nepal.
            </p>

          </div>

          {/* Explore */}
          <div>

            <h3 className="font-semibold text-lg mb-5 text-white">
              Explore
            </h3>

            <div className="space-y-3">

              <Link href="/" className="block text-gray-400 hover:text-blue-400 transition">
                Home
              </Link>

              <Link href="/rooms" className="block text-gray-400 hover:text-blue-400 transition">
                Browse Rooms
              </Link>

            </div>

          </div>

          {/* For Owners */}
          <div>

            <h3 className="font-semibold text-lg mb-5 text-white">
              For Owners
            </h3>

            <div className="space-y-3">

              <Link href="/register/owner" className="block text-gray-400 hover:text-blue-400 transition">
                Register as Owner
              </Link>

              <Link href="/login/owner" className="block text-gray-400 hover:text-blue-400 transition">
                Owner Login
              </Link>

              <Link href="/owner/add-room" className="block text-gray-400 hover:text-blue-400 transition">
                List Property
              </Link>

              <Link href="/owner/dashboard" className="block text-gray-400 hover:text-blue-400 transition">
                Dashboard
              </Link>

            </div>

          </div>

          {/* For Users */}
          <div>

            <h3 className="font-semibold text-lg mb-5 text-white">
              For Users
            </h3>

            <div className="space-y-3">

              <Link href="/register/user" className="block text-gray-400 hover:text-blue-400 transition">
                Register as User
              </Link>

              <Link href="/login/user" className="block text-gray-400 hover:text-blue-400 transition">
                User Login
              </Link>

              <Link href="/user/faorites" className="block text-gray-400 hover:text-blue-400 transition">
                List Wishlist
              </Link>

              <Link href="/user/dashboard" className="block text-gray-400 hover:text-blue-400 transition">
                Dashboard
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Rental. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Designed & Developed by
            <span className="text-blue-500 ml-1 font-medium">
              Prabhat Shah
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm">

            <Link
              href="/privacy-policy"
              className="text-gray-500 hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-gray-500 hover:text-white transition"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/help"
              className="text-gray-500 hover:text-white transition"
            >
              Help Center
            </Link>

            <Link
              href="/faq"
              className="text-gray-500 hover:text-white transition"
            >
              FAQ
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}