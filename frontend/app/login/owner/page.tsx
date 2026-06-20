"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import API from "@/lib/api";

import toast from "react-hot-toast";
import Link from "next/link"

import {
  Eye,
  EyeOff,
  Loader2,
  Building2,
  Mail,
  Lock,
} from "lucide-react";

export default function OwnerLoginPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(true);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  // =========================
  // OWNER LOGIN
  // =========================

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      return toast.error(
        "Email is required"
      );
    }

    if (!formData.password.trim()) {
      return toast.error(
        "Password is required"
      );
    }

    try {
      setLoading(true);

      const response =
        await API.post(
          "/owners/login",
          formData
        );

      const owner = response.data.owner;

      const storage =
        rememberMe
          ? localStorage
          : sessionStorage;

      // storage.setItem(
      //   "owner",
      //   JSON.stringify(owner)

      //   // storage.setItem(
      //   //   "ownerId",
      //   //   owner._id
      //   // )
      // );

      storage.setItem(
  "owner",
  JSON.stringify(owner)
)

storage.setItem(
  "ownerId",
  owner._id
)

      if (response.data.token) {
        storage.setItem(
          "ownerToken",
          response.data.token
        );
      }

      toast.success(
        `Welcome back ${owner.name || ""
        }`
      );

      router.push(
        "/owner/profile"
      );
    }
    catch (error: any) {
      // console.error(error);

      // toast.error(
      //   error?.response?.data
      //     ?.message ||
      //   "Login Failed"
      // );

      console.log(
        "LOGIN ERROR:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.detail ||
        "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-blue-50
          via-white
          to-indigo-100
          flex
          items-center
          justify-center
          px-4
          py-24
        "
      >
        <div
          className="
            w-full
            max-w-md
            bg-white/90
            backdrop-blur-xl
            rounded-[32px]
            border
            border-white
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
            p-8
          "
        >
          {/* LOGO */}

          <div className="flex justify-center">
            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-gradient-to-br
                from-blue-600
                to-indigo-600
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <Building2
                size={40}
                className="text-white"
              />
            </div>
          </div>

          {/* HEADER */}

          <div className="mt-6 text-center">
            <h1
              className="
                text-3xl
                font-black
                text-gray-900
              "
            >
              Welcome Back
            </h1>

            <p
              className="
                mt-2
                text-gray-500
                text-sm
              "
            >
              Sign in to manage your
              rooms, bookings &
              earnings
            </p>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >
            {/* EMAIL */}

            <div>
              <label
                className="
                  text-sm
                  font-semibold
                  text-gray-700
                "
              >
                Email Address
              </label>

              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="owner@example.com"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-3.5
                    border
                    border-gray-200
                    rounded-2xl
                    outline-none
                    transition
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-500
                  "
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label
                className="
                  text-sm
                  font-semibold
                  text-gray-700
                "
              >
                Password
              </label>

              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter password"
                  className="
                    w-full
                    pl-12
                    pr-12
                    py-3.5
                    border
                    border-gray-200
                    rounded-2xl
                    outline-none
                    transition
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-500
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-gray-700
                  "
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                    />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* OPTIONS */}

            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <label
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-gray-600
                  cursor-pointer
                "
              >
                <input
                  type="checkbox"
                  checked={
                    rememberMe
                  }
                  onChange={(e) =>
                    setRememberMe(
                      e.target
                        .checked
                    )
                  }
                  className="
                    w-4
                    h-4
                  "
                />

                Remember Me
              </label>

              <Link href="/forgot-password">
                <button
                  type="button"
                  className="
                  text-sm
                  text-blue-600
                  hover:text-blue-700
                  hover:underline
                "
                >
                  Forgot Password?
                </button>
              </Link>
            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-3.5
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                hover:from-blue-700
                hover:to-indigo-700
                text-white
                font-bold
                transition-all
                shadow-lg
                disabled:opacity-70
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Signing In...
                </>
              ) : (
                "Login as Owner"
              )}
            </button>
          </form>

          {/* REGISTER */}

          <div className="mt-6 text-center">
            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Don't have an owner
              account?

              <span
                onClick={() =>
                  router.push(
                    "/register/owner"
                  )
                }
                className="
                  ml-2
                  text-blue-600
                  font-semibold
                  cursor-pointer
                  hover:underline
                "
              >
                Register Now
              </span>
            </p>
          </div>

          {/* FOOTER */}

          <div
            className="
              mt-8
              pt-6
              border-t
              text-center
            "
          >
            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                text-xs
                text-gray-400
              "
            >
              <Building2
                size={14}
              />
              Secure Owner Portal
            </div>

            <p
              className="
                mt-2
                text-xs
                text-gray-400
              "
            >
              Manage Properties,
              Rooms & Bookings
            </p>
          </div>
        </div>
      </div>
    </>
  );
}