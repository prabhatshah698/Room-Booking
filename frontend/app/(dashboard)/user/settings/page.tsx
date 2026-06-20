"use client";

import { useState } from "react";
import Link from "next/link";

import Navbar from "@/components/user/Navbar";
// import Sidebar from "@/components/owner/Sidebar";

import API from "@/lib/api";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ConfirmModal";

import {
  Shield,
  LogOut,
  Settings,
} from "lucide-react";

export default function UserSettingsPage() {
  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    window.location.href = "/login";
  };

  const deleteAccount = async () => {
    try {
      const userId =
        localStorage.getItem("userId");

      if (!userId) {
        toast.error("User not found");
        return;
      }

      await API.delete(
        `/users/delete/${userId}`
      );

      localStorage.clear();

      toast.success(
        "Account deleted successfully"
      );

      window.location.href = "/";
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to delete account"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe]">
      <Navbar />

      <div className="flex">
        {/* <Sidebar /> */}

        <div className="flex-1 p-10">
          <div className="mb-10">
            <h1 className="text-5xl font-black">
              Settings
            </h1>

            <p className="text-gray-500 mt-3">
              Manage your account preferences.
            </p>
          </div>

          {/* Security Section */}

          <div className="bg-white rounded-3xl p-8 border mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield />

              <h2 className="text-2xl font-bold">
                Security
              </h2>
            </div>

            <Link
              href="/user/settings/password"
              className="
                block
                bg-white
                p-6
                rounded-2xl
                border
                hover:shadow-lg
                transition-all
              "
            >
              Change Password
            </Link>
          </div>

          {/* Danger Zone */}

          <div className="bg-white rounded-3xl p-8 border">
            <div className="flex items-center gap-3 mb-6">
              <Settings />

              <h2 className="text-2xl font-bold text-red-600">
                Danger Zone
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() =>
                  setShowLogoutModal(true)
                }
                className="
                  w-full
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  text-red-500
                  hover:bg-red-50
                  transition-all
                  duration-300
                  font-medium
                "
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>

              <button
                onClick={() =>
                  setShowDeleteModal(true)
                }
                className="
                  w-full
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  text-red-600
                  hover:bg-red-50
                  transition-all
                  duration-300
                  font-medium
                "
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout from your account?"
        confirmText="Logout"
        cancelText="Cancel"
        onCancel={() =>
          setShowLogoutModal(false)
        }
        onConfirm={() => {
          setShowLogoutModal(false);
          logout();
        }}
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Account"
        message="This action is permanent. All your rooms, profile information and account data will be deleted."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() =>
          setShowDeleteModal(false)
        }
        onConfirm={async () => {
          setShowDeleteModal(false);
          await deleteAccount();
        }}
      />
    </div>
  );
}

function SettingToggle({
  title,
  enabled,
  onChange,
}: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">
        {title}
      </span>

      <button
        onClick={() =>
          onChange(!enabled)
        }
        className={`
          w-14
          h-8
          rounded-full
          transition
          ${
            enabled
              ? "bg-green-500"
              : "bg-gray-300"
          }
        `}
      >
        <div
          className={`
            w-6
            h-6
            bg-white
            rounded-full
            transition
            ${
              enabled
                ? "translate-x-7"
                : "translate-x-1"
            }
          `}
        />
      </button>
    </div>
  );
}