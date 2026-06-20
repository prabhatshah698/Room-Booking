"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import API from "@/lib/api";
import toast from "react-hot-toast";

import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  UserCircle2,
} from "lucide-react";

export default function UserLoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");

    try {
      setLoading(true);

      const response = await API.post("/users/login", formData);
      const user = response.data.user;

      const storage = rememberMe ? localStorage : sessionStorage;

      // ✅ SAVE USER + USER ID (FIX)
      storage.setItem("user", JSON.stringify(user));
      storage.setItem("userId", user._id);

      toast.success("Login Successful");
      router.push("/user");

    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg"
        >
          {/* ICON */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center">
              <UserCircle2 className="text-white" size={40} />
            </div>
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label>Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 p-3 border rounded-xl"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label>Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 p-3 border rounded-xl"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-4">
  <button
    type="button"
    onClick={() => router.push("/forgot-password")}
    className="text-sm text-green-600 hover:underline"
  >
    Forgot Password?
  </button>
</div>

          {/* REMEMBER */}
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-xl flex justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}