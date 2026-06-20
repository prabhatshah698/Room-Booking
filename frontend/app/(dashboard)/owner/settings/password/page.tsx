"use client";

import { useEffect, useState } from "react";

import ChangePassword from "@/components/changePassword";
import Navbar from "@/components/owner/Navbar";
import Sidebar from "@/components/owner/Sidebar";

// -------------------------
// SKELETON
// -------------------------
function ChangePasswordSkeleton() {
  return (
    <div className="min-h-screen bg-[#f4f7fe] animate-pulse">
      <div className="h-16 bg-white border-b" />

      <div className="flex">
        <div className="w-64 bg-white border-r min-h-screen" />

        <div className="flex-1 p-10">
          <div className="max-w-5xl mx-auto space-y-8">

            <div className="space-y-2">
              <div className="h-8 w-64 bg-gray-200 rounded" />
              <div className="h-4 w-96 bg-gray-200 rounded" />
            </div>

            <div className="max-w-xl bg-white p-8 rounded-3xl space-y-5">
              <div className="h-12 bg-gray-200 rounded-xl" />
              <div className="h-12 bg-gray-200 rounded-xl" />
              <div className="h-12 bg-gray-200 rounded-xl" />
              <div className="h-12 bg-gray-200 rounded-xl" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------
// PAGE
// -------------------------
export default function OwnerChangePasswordPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <ChangePasswordSkeleton />;

  return (
    <div className="min-h-screen bg-[#f4f7fe] flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 sm:p-8">
          
          {/* CLEAN CENTERED LAYOUT */}
          <div className="max-w-5xl mx-auto space-y-8">

            {/* HEADER */}
            <div>
              <h1 className="text-3xl font-black text-gray-900">
                Change Password
              </h1>
              <p className="text-gray-500 mt-1">
                Update your account password securely
              </p>
            </div>

            {/* CARD CENTER */}
            <div className="flex justify-center">
              <ChangePassword role="owner" />
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}