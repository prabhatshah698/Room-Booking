"use client"

import { useEffect, useState } from "react"

import Navbar from "@/components/user/Navbar"
import { useUser } from "@/app/context/UserContext"
import EditButton from "@/components/EditButton"

import API from "@/lib/api"

import {
  User,
  Mail,
  Phone,
  MapPin,
  Pencil,
  Loader2,
  Camera,
  Heart,
  Home
} from "lucide-react"

import toast from "react-hot-toast"

export default function UserProfilePage() {
  const { setUserName, setProfileImage } = useUser()

  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    profile_image: ""
  })

  const [originalProfile, setOriginalProfile] = useState(profile)

  // ======================
  // FETCH PROFILE
  // ======================
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const userId = localStorage.getItem("userId");

      if (!userId) {
        toast.error("User not found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await API.get(`/users/${userId}`);
      const user = response?.data?.user;

      const profileData = {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        profile_image: user.profile_image || "",
      };

      setProfile(profileData);
      setOriginalProfile(profileData);

      setUserName(user.name || "User");
      setProfileImage(user.profile_image || "/avatar.png");

    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [setUserName, setProfileImage]);

  // ======================
  // HANDLE INPUT
  // ======================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // ======================
  // INSTANT IMAGE UPLOAD (OPTIMISTIC)
  // ======================
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let previousImage = profile.profile_image

    try {
      const file = e.target.files?.[0]
      if (!file) return

      const userId = localStorage.getItem("userId")
      if (!userId) {
        toast.error("User not found")
        return
      }

      // ⚡ Instant preview
      const localPreview = URL.createObjectURL(file)

      setProfile((prev) => ({
        ...prev,
        profile_image: localPreview
      }))

      setUploading(true)

      const formData = new FormData()
      formData.append("file", file)

      const uploadRes = await API.post("/rooms/upload-image", formData)
      const imageUrl = uploadRes?.data?.image_url

      if (!imageUrl) throw new Error("Upload failed")

      await API.put(`/users/update/${userId}`, {
        profile_image: imageUrl
      })

      setProfile((prev) => ({
        ...prev,
        profile_image: imageUrl
      }))

      setProfileImage(imageUrl)

      toast.success("Profile image updated")

    } catch (error) {
      console.log(error)

      // rollback
      setProfile((prev) => ({
        ...prev,
        profile_image: previousImage || "/avatar.png"
      }))

      toast.error("Upload failed")

    } finally {
      setUploading(false)
    }
  }

  // ======================
  // UPDATE PROFILE
  // ======================
  const updateProfile = async () => {
    try {
      setUpdating(true)

      const userId = localStorage.getItem("userId")
      if (!userId) {
        toast.error("User not found")
        return
      }

      const payload = {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio
      }

      const response = await API.put(
        `/users/update/${userId}`,
        payload
      )

      const user = response?.data?.user
      if (!user) throw new Error("Update failed")

      const updated = {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        profile_image: user.profile_image || ""
      }

      setProfile(updated)
      setOriginalProfile(updated)

      setUserName(user.name)
      setProfileImage(user.profile_image || "/avatar.png")

      toast.success("Profile updated")

    } catch (error) {
      console.log(error)
      toast.error("Update failed")
    } finally {
      setUpdating(false)
    }
  }

  // ======================
  // LOADING SCREEN
  // ======================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={45} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-3xl shadow-sm p-10">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row gap-10 items-center">

            <div className="relative">
              <img
                src={profile.profile_image || "/avatar.png"}
                className="w-44 h-44 rounded-full object-cover border-4 border-blue-100"
              />

              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                  <Loader2 className="animate-spin text-white" />
                </div>
              )}

              {editing && (
                <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-3 rounded-full cursor-pointer">
                  <Camera size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadImage}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-black">
                    {profile.name || "User"}
                  </h1>
                  <p className="text-gray-500 mt-2">
                    Manage your profile information
                  </p>
                </div>

                <EditButton
                  label={editing ? "Cancel" : "Edit Profile"}
                  onClick={() => {
                    if (editing) setProfile(originalProfile)
                    setEditing(!editing)
                  }}
                />
              </div>

              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2 text-red-500">
                  <Heart size={18} />
                  Favourite Rooms
                </div>

                {/* <div className="flex items-center gap-2 text-blue-500">
                  <Home size={18} />
                  Active Bookings
                </div> */}
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div>
              <label className="font-semibold">Full Name</label>
              <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 mt-2">
                <User size={18} />
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  readOnly={!editing}
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">Email</label>
              <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 mt-2">
                <Mail size={18} />
                <input
                name="email"
                  value={profile.email}
                  onChange={handleChange}
                  readOnly={!editing}
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">Phone</label>
              <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 mt-2">
                <Phone size={18} />
                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  readOnly={!editing}
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">Location</label>
              <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 mt-2">
                <MapPin size={18} />
                <input
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  readOnly={!editing}
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </div>
          </div>

          {/* BIO */}
          <div className="mt-6">
            <label className="font-semibold">Bio</label>
            <textarea
              rows={5}
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              readOnly={!editing}
              className="w-full bg-slate-100 rounded-xl p-4 mt-2 outline-none"
            />
          </div>

          {/* SAVE */}
          {editing && (
            <div className="flex justify-end mt-8">
              <button
                onClick={async () => {
                  await updateProfile()
                  setEditing(false)
                }}
                disabled={updating || uploading}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2"
              >
                {(updating || uploading) && (
                  <Loader2 className="animate-spin" />
                )}
                <Pencil size={18} />
                Save Changes
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}