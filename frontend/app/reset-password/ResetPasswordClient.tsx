"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import API from "@/lib/api";
import toast from "react-hot-toast";

import {
  Eye,
  EyeOff,
} from "lucide-react";

export default function ResetPasswordClient() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    if (!password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await API.post("/forgot-password/reset", {
        email,
        password,
      });

      toast.success("Password Updated");

      router.push("/login/user");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail || "Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Reset Password
        </h1>

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-3 rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <div className="relative">
          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <button
          onClick={resetPassword}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white mt-5 p-3 rounded-xl font-medium disabled:opacity-50"
        >
          {loading
            ? "Updating..."
            : "Update Password"}
        </button>
      </div>
    </div>
  );
}