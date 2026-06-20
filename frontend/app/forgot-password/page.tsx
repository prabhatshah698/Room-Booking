"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import API from "@/lib/api";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    try {

      setLoading(true);

      await API.post(
        "/forgot-password/send-otp",
        { email }
      );

      toast.success(
        "OTP sent successfully"
      );

      localStorage.setItem(
        "otpExpiry",
        (Date.now() + 60000).toString()
      );

      localStorage.setItem(
        "otpExpiry",
        (Date.now() + 60000).toString()
      );

      router.push(
        `/verify-otp?email=${encodeURIComponent(email)}`
      );

    } catch (error: any) {

      toast.error(
        error?.response?.data?.detail ||
        "Failed to send OTP"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        justify-center
        items-center
        bg-gray-100
        px-4
      "
    >
      <div
        className="
          bg-white
          p-8
          rounded-3xl
          w-full
          max-w-md
          shadow-lg
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            mb-6
            text-center
          "
        >
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-xl
            outline-none
          "
        />

        <button
          onClick={sendOtp}
          disabled={loading}
          className="
            w-full
            bg-blue-600
            text-white
            mt-5
            p-3
            rounded-xl
            font-semibold
            disabled:opacity-50
          "
        >
          {loading
            ? "Sending..."
            : "Send OTP"}
        </button>
      </div>
    </div>
  );
}