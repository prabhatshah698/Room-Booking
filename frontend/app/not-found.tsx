"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-6">

      {/* Background Blur Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">

        {/* Icon */}
        <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-blue-100 shadow-lg">
          <Search className="h-12 w-12 text-blue-600" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-black tracking-tight text-blue-600">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-slate-900">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-lg text-slate-600 max-w-lg mx-auto">
          The page you're looking for may have been removed,
          renamed, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            href="/"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-blue-600
              text-white
              font-semibold
              shadow-lg
              hover:bg-blue-700
              hover:scale-105
              transition-all
            "
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-6
              py-3
              rounded-xl
              border
              border-slate-300
              bg-white
              text-slate-700
              font-semibold
              hover:bg-slate-50
              hover:scale-105
              transition-all
            "
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

        {/* Footer Text */}
        <p className="mt-10 text-sm text-slate-400">
          Need help finding a room? Browse available listings from verified owners.
        </p>

      </div>
    </div>
  );
}