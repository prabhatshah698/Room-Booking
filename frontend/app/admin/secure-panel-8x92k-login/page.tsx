"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import API from "@/lib/api";

import toast from "react-hot-toast";

import {
  Eye,
  EyeOff,
  Shield,
  Loader2
} from "lucide-react";

export default function AdminLoginPage() {

  const router = useRouter()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [showPassword, setShowPassword] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

const handleLogin = async (
  e: React.FormEvent
) => {

  e.preventDefault()

  try {

    setLoading(true)

    const response = await API.post(
      "/admin/login",
      {
        email,
        password
      }
    )

    console.log(response.data)

    // local storage
    localStorage.setItem(
      "adminToken",
      response.data.token
    )

    localStorage.setItem(
      "adminRole",
      "admin"
    )

    // cookie for proxy
    document.cookie =
      `adminToken=${response.data.token}; path=/; max-age=86400`

    toast.success(
      "Admin Login Successful"
    )

    // use hard redirect
    window.location.href =
      "/admin"

  } catch (error: any) {

    toast.error(
      error?.response?.data?.detail ||
      "Login Failed"
    )

  } finally {

    setLoading(false)
  }
}
  
  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      p-4
    ">

      <div className="
        bg-white
        w-full
        max-w-md
        rounded-3xl
        shadow-xl
        p-8
      ">

        <div className="
          flex
          flex-col
          items-center
          mb-8
        ">

          <div className="
            w-16
            h-16
            rounded-full
            bg-blue-100
            flex
            items-center
            justify-center
          ">
            <Shield
              className="text-blue-600"
              size={28}
            />
          </div>

          <h1 className="
            text-3xl
            font-black
            mt-4
          ">
            Admin Login
          </h1>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          />

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e)=>
                setPassword(e.target.value)
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
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
                top-4
              "
            >
              {
                showPassword
                ? <EyeOff size={18}/>
                : <Eye size={18}/>
              }
            </button>

          </div>

          <button
            disabled={loading}
            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-xl
              font-bold
            "
          >

            {loading ? (

              <span className="
                flex
                justify-center
                items-center
                gap-2
              ">
                <Loader2
                  className="animate-spin"
                  size={18}
                />
                Logging In...
              </span>

            ) : (

              "Login"

            )}

          </button>

        </form>

      </div>

    </div>
  )
}