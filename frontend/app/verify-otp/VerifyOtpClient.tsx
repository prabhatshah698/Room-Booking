"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import API from "@/lib/api";
import toast from "react-hot-toast";

export default function VerifyOtpPage() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const email =
    searchParams.get("email");

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [timer, setTimer] =
    useState(0);

  // Load timer from localStorage
  useEffect(() => {

    const expiry =
      localStorage.getItem("otpExpiry");

    if (!expiry) return;

    const remaining = Math.max(
      0,
      Math.floor(
        (Number(expiry) - Date.now()) / 1000
      )
    );

    setTimer(remaining);

  }, []);

  // Countdown
  useEffect(() => {

    if (timer <= 0) return;

    const interval = setInterval(() => {

      setTimer((prev) => {

        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });

    }, 1000);

    return () =>
      clearInterval(interval);

  }, [timer]);

  const verifyOtp = async () => {

    if (!otp.trim()) {
      return toast.error(
        "Please enter OTP"
      );
    }

    try {

      setLoading(true);

      await API.post(
        "/forgot-password/verify-otp",
        {
          email,
          otp
        }
      );

      toast.success(
        "OTP Verified"
      );

      router.push(
        `/reset-password?email=${encodeURIComponent(email || "")}`
      );

    } catch (error: any) {

      toast.error(
        error?.response?.data?.detail ||
        "Invalid OTP"
      );

    } finally {

      setLoading(false);
    }
  };

  const resendOtp = async () => {

    try {

      await API.post(
        "/forgot-password/send-otp",
        {
          email
        }
      );

      toast.success(
        "OTP Resent"
      );

      localStorage.setItem(
        "otpExpiry",
        (Date.now() + 60000).toString()
      );

      setTimer(60);

    } catch (error: any) {

      toast.error(
        error?.response?.data?.detail ||
        "Failed to resend OTP"
      );
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
          Verify OTP
        </h1>

        <input
          type="text"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          placeholder="Enter OTP"
          className="
            w-full
            border
            p-3
            rounded-xl
            outline-none
          "
        />

        <button
          onClick={verifyOtp}
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
            ? "Verifying..."
            : "Verify OTP"}
        </button>

        {timer > 0 ? (

          <button
            disabled
            className="
              w-full
              mt-4
              p-3
              rounded-xl
              bg-gray-300
              text-gray-700
              cursor-not-allowed
            "
          >
            Resend OTP in {timer}s
          </button>

        ) : (

          <button
            onClick={resendOtp}
            className="
              w-full
              mt-4
              p-3
              rounded-xl
              bg-green-600
              text-white
              font-semibold
            "
          >
            Resend OTP
          </button>

        )}

      </div>
    </div>
  );
}