"use client";

import Link from "next/link";
import {
  Home,
  ShieldCheck,
  Building2,
  CheckCircle,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white pt-5 pb-5">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1605649487212-47bdab064df7"
          alt="Nepal Room Rental"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Premium Glow Effects */}
      <div className="absolute top-[-150px] left-[-150px] w-[450px] h-[450px] rounded-full bg-cyan-500/20 blur-[150px]" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] rounded-full bg-blue-500/20 blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
          <ShieldCheck size={18} className="text-green-400" />
          <span className="text-sm font-medium">
            Built for Room Seekers & Property Owners in Nepal
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Find Your Next
          <br />
          <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Room With Confidence
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          Discover rooms, flats, hostels and rental spaces across Nepal.
          Connect directly with property owners and explore listings in a
          simple, transparent and hassle-free way.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">

          <Link
            href="/rooms"
            className="px-8 py-4 rounded-xl bg-white text-black font-semibold flex items-center gap-2 hover:bg-gray-100 transition"
          >
            <Home size={20} />
            Explore Rooms
          </Link>

          <Link
            href="/register/owner"
            className="px-8 py-4 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition"
          >
            List Your Property
          </Link>

        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">

          <div className="px-4 py-2 rounded-full bg-green-500/15 border border-green-400/30 text-green-300 text-sm">
            ✓ Verified Listings
          </div>

          <div className="px-4 py-2 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-sm">
            ✓ Direct Owner Contact
          </div>

          <div className="px-4 py-2 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-sm">
            ✓ Easy Room Discovery
          </div>

          <div className="px-4 py-2 rounded-full bg-orange-500/15 border border-orange-400/30 text-orange-300 text-sm">
            ✓ Built For Nepal
          </div>

        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-5">
              <ShieldCheck size={28} className="text-cyan-300" />
            </div>

            <h3 className="text-xl font-semibold">
              Verified Listings
            </h3>

            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              Properties are reviewed before being published to help maintain
              listing quality and transparency.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-5">
              <Home size={28} className="text-green-300" />
            </div>

            <h3 className="text-xl font-semibold">
              Direct Owner Contact
            </h3>

            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              Communicate directly with property owners and make informed rental
              decisions without unnecessary barriers.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-5">
              <Building2 size={28} className="text-purple-300" />
            </div>

            <h3 className="text-xl font-semibold">
              Easy Discovery
            </h3>

            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              Explore rooms, flats, hostels and rental spaces from different
              locations through a simple browsing experience.
            </p>
          </div>

        </div>

        {/* Mission Section */}
        <div className="mt-16 max-w-4xl mx-auto">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10">

            <div className="flex justify-center mb-5">
              <CheckCircle size={40} className="text-cyan-300" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Our Mission
            </h2>

            <p className="text-white/80 text-lg leading-relaxed">
              Finding a room shouldn't be complicated. Our mission is to make
              room hunting easier by connecting tenants and property owners on
              one transparent platform. Whether you're moving to a new city,
              starting college, or searching for a better place to stay, we're
              building a simpler rental experience for Nepal.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}