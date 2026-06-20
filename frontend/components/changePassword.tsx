"use client";

import { useState } from "react";
import API from "@/lib/api";
import toast from "react-hot-toast";

import { Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

export default function ChangePassword({
  role = "user",
}: {
  role?: "user" | "owner" | "admin";
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword)
      return toast.error("Please fill all fields");

    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    if (newPassword.length < 6)
      return toast.error("Password must be at least 6 characters");

    if (oldPassword === newPassword)
      return toast.error("New password must be different");

    try {
      setLoading(true);

      let id = "";
let endpoint = "";

if (role === "user") {
  id = localStorage.getItem("userId") || "";
  endpoint = "/users/change-password";
}

if (role === "owner") {
  id = localStorage.getItem("ownerId") || "";
  endpoint = "/owners/change-password";
}

if (role === "admin") {
  id = localStorage.getItem("adminId") || "";
  endpoint = "/auth/admin/change-password";
}

if (!id)
  return toast.error(`${role} not found`);

await API.put(endpoint, {
  user_id: id,
  old_password: oldPassword,
  new_password: newPassword,
});

      toast.success("Password changed successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-gray-100 shadow-xl rounded-3xl p-6 sm:p-8">

      {/* HEADER */}
      <div className="flex gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center">
          <ShieldCheck className="text-blue-600" size={20} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Change Password
          </h2>
          <p className="text-sm text-gray-500">
            Update your account password securely
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* CURRENT */}
        <PasswordInput
          label="Current Password"
          value={oldPassword}
          setValue={setOldPassword}
          show={showOld}
          setShow={setShowOld}
        />

        {/* NEW */}
        <PasswordInput
          label="New Password"
          value={newPassword}
          setValue={setNewPassword}
          show={showNew}
          setShow={setShowNew}
        />

        {/* CONFIRM */}
        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          show={showConfirm}
          setShow={setShowConfirm}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Updating...
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </form>
    </div>
  );
}

// reusable input
function PasswordInput({
  label,
  value,
  setValue,
  show,
  setShow,
}: any) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative mt-2">
        <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full pl-11 pr-12 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-3.5 text-gray-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}