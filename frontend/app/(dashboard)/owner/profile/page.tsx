"use client"

import { useEffect, useState } from "react"

import Navbar from "@/components/owner/Navbar"
import Sidebar from "@/components/owner/Sidebar"
import { useOwner } from "@/app/context/OwnerContext"
import EditButton from "@/components/EditButton"
import API from "@/lib/api"

import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Pencil,
  Loader2,
  Camera
} from "lucide-react"

import toast from "react-hot-toast"

// -------------------------
// SKELETON UI
// -------------------------
function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#f4f7fe] animate-pulse">

      <div className="h-16 bg-white border-b" />

      <div className="flex">

        <div className="w-64 bg-white border-r min-h-screen" />

        <div className="flex-1 p-10 space-y-10">

          {/* Header */}
          <div className="space-y-3">
            <div className="h-12 w-64 bg-gray-200 rounded-xl" />
            <div className="h-5 w-96 bg-gray-200 rounded-lg" />
          </div>

          {/* Profile card */}
          <div className="bg-white border rounded-[35px] p-10 space-y-10">

            {/* Top section */}
            <div className="flex items-center gap-8">

              <div className="w-44 h-44 rounded-full bg-gray-200" />

              <div className="space-y-3">
                <div className="h-10 w-56 bg-gray-200 rounded-xl" />
                <div className="h-5 w-40 bg-gray-200 rounded-lg" />
              </div>

              <div className="ml-auto h-12 w-40 bg-gray-200 rounded-2xl" />

            </div>

            {/* Form */}
            <div className="grid md:grid-cols-2 gap-8">

              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-5 w-32 bg-gray-200 rounded-lg" />
                  <div className="h-14 bg-gray-200 rounded-2xl" />
                </div>
              ))}

            </div>

            {/* Bio */}
            <div className="space-y-3">
              <div className="h-5 w-20 bg-gray-200 rounded-lg" />
              <div className="h-40 bg-gray-200 rounded-2xl" />
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <div className="h-12 w-44 bg-gray-200 rounded-2xl" />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// -------------------------
// MAIN PAGE
// -------------------------
export default function OwnerProfilePage() {
  const { setOwnerName, setProfileImage } = useOwner()

  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [editing, setEditing] = useState(false)

  const [imageVersion, setImageVersion] = useState(0)

  const [profile, setProfile] = useState({
    name: "",
    city: "",
    email: "",
    phone: "",
    bio: "",
    profile_image: ""
  })

  const [originalProfile, setOriginalProfile] = useState(profile)

  // -------------------------
  // FETCH PROFILE
  // -------------------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const ownerId = localStorage.getItem("ownerId")
        // if (!ownerId) return

        // const { data } = await API.get(`/owners/${ownerId}`)

        const ownerData =
          localStorage.getItem("owner") ||
          sessionStorage.getItem("owner")

        if (!ownerData) {
          toast.error("Please login first")
          return
        }

        const ownerInfo = JSON.parse(ownerData)

        const { data } = await API.get(
          `/owners/${ownerInfo._id}`
        )

        // const owner = data.owner

        const owner = data.owner

        const mapped = {
          name: owner.name || "",
          city: owner.city || "",
          email: owner.email || "",
          phone: owner.phone || "",
          bio: owner.bio || "",
          profile_image: owner.profile_image || ""
        }

        setProfile(mapped)
        setOriginalProfile(mapped)

        setOwnerName(owner.name || "Owner")
        setProfileImage(owner.profile_image || "/avatar.png")

      } catch (err) {
        console.log(err)
        toast.error("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [setOwnerName, setProfileImage])

  // -------------------------
  // HANDLE CHANGE
  // -------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // -------------------------
  // IMAGE UPLOAD (same logic, cleaned)
  // -------------------------
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return

      // const ownerId = localStorage.getItem("ownerId")
      // if (!ownerId) return toast.error("Owner not found")

      const ownerData =
        localStorage.getItem("owner") ||
        sessionStorage.getItem("owner")

      if (!ownerData)
        return toast.error("Owner not found")

      const owner = JSON.parse(ownerData)
      const ownerId = owner._id

      // preview
      const preview = URL.createObjectURL(file)

      setProfile(prev => ({ ...prev, profile_image: preview }))
      setImageVersion(v => v + 1)

      const form = new FormData()
      form.append("file", file)

      const { data } = await API.post("/rooms/upload-image", form)

      const imageUrl = data.image_url

      setProfile(prev => ({ ...prev, profile_image: imageUrl }))
      setOriginalProfile(prev => ({ ...prev, profile_image: imageUrl }))

      setProfileImage(imageUrl)

      await API.put(`/owners/update/${ownerId}`, {
        profile_image: imageUrl
      })

      setImageVersion(v => v + 1)

      toast.success("Profile image updated")

    } catch (err) {
      console.log(err)
      toast.error("Upload failed")
    }
  }

  // -------------------------
  // UPDATE PROFILE
  // -------------------------
  const updateProfile = async () => {
    try {
      setUpdating(true)

      // const ownerId = localStorage.getItem("ownerId")
      // if (!ownerId) return

      const ownerData =
        localStorage.getItem("owner") ||
        sessionStorage.getItem("owner")

      if (!ownerData) return

      // const owner = JSON.parse(ownerData)
      // const ownerId = owner._id

      // const payload = {
      //   ...profile
      // }

      // const { data } = await API.put(`/owners/update/${ownerId}`, payload)

      // // const owner = data.owner

      // const updated = {
      //   name: owner.name || "",
      //   city: owner.city || "",
      //   email: owner.email || "",
      //   phone: owner.phone || "",
      //   bio: owner.bio || "",
      //   profile_image: owner.profile_image || ""
      // }

      // setProfile(updated)
      // setOriginalProfile(updated)

      // setOwnerName(owner.name)
      // setProfileImage(owner.profile_image || "/avatar.png")

      const loggedOwner = JSON.parse(ownerData)

      const ownerId = loggedOwner._id

      const payload = {
        ...profile
      }

      const { data } = await API.put(
        `/owners/update/${ownerId}`,
        payload
      )

      const updatedOwner = data.owner

      const updated = {
        name: updatedOwner.name || "",
        city: updatedOwner.city || "",
        email: updatedOwner.email || "",
        phone: updatedOwner.phone || "",
        bio: updatedOwner.bio || "",
        profile_image: updatedOwner.profile_image || ""
      }

      setProfile(updated)
      setOriginalProfile(updated)

      setOwnerName(updatedOwner.name)
      setProfileImage(
        updatedOwner.profile_image || "/avatar.png"
      )

      toast.success("Profile updated")

    } catch (err) {
      console.log(err)
      toast.error("Update failed")
    } finally {
      setUpdating(false)
    }
  }

  // -------------------------
  // LOADING STATE
  // -------------------------
  if (loading) return <ProfileSkeleton />

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="min-h-screen bg-[#f4f7fe]">

      <Navbar />

      <div className="flex flex-col md:flex-row">

        {/* SIDEBAR */}
        <div className="md:block hidden">
          <Sidebar />
        </div>

        {/* MOBILE TOP SPACING FIX */}
        <div className="flex-1 p-4 sm:p-6 lg:p-10">

          {/* HEADER */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
              My Profile
            </h1>
            <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg">
              Manage your personal information.
            </p>
          </div>

          {/* CARD */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border p-5 sm:p-8 lg:p-10 space-y-8">

            {/* TOP SECTION */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">

              {/* IMAGE */}
              <div className="relative mx-auto sm:mx-0">

                <img
                  src={profile.profile_image || "/avatar.png"}
                  className="
                  w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44
                  rounded-full object-cover border-4 border-blue-100
                "
                />

                {editing && (
                  <label className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-blue-600 text-white p-2 sm:p-3 rounded-full cursor-pointer">
                    <Camera size={18} />
                    <input type="file" onChange={uploadImage} hidden />
                  </label>
                )}

              </div>

              {/* NAME */}
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                  {profile.name || "Owner"}
                </h2>

                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-blue-600 font-semibold text-sm sm:text-base">
                  <ShieldCheck size={16} />
                  Verified Owner
                </div>
              </div>

              {/* EDIT BUTTON */}
              <div className="sm:ml-auto w-full sm:w-auto">
                <EditButton
                  label={editing ? "Cancel" : "Edit Profile"}
                  onClick={() => {
                    if (editing) setProfile(originalProfile)
                    setEditing(!editing)
                  }}
                />
              </div>

            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">

              <Input icon={<User />} name="name" value={profile.name} onChange={handleChange} editing={editing} label="Full Name" />
              <Input icon={<MapPin />} name="city" value={profile.city} onChange={handleChange} editing={false} label="City" />
              <Input icon={<Mail />} name="email" value={profile.email} onChange={handleChange} editing={editing} label="Email" />
              <Input icon={<Phone />} name="phone" value={profile.phone} onChange={handleChange} editing={editing} label="Phone" />

            </div>

            {/* BIO */}
            <div>
              <label className="font-bold text-base sm:text-lg">Bio</label>

              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                readOnly={!editing}
                rows={5}
                className="
                w-full mt-3 bg-gray-100 rounded-xl sm:rounded-2xl
                px-4 sm:px-5 py-3 sm:py-4 outline-none text-sm sm:text-base
              "
              />
            </div>

            {/* SAVE */}
            {editing && (
              <div className="flex justify-end">
                <button
                  onClick={async () => {
                    await updateProfile()
                    setEditing(false)
                  }}
                  disabled={updating}
                  className="
                  w-full sm:w-auto
                  bg-gradient-to-r from-blue-600 to-purple-600
                  text-white px-6 sm:px-10 py-3 sm:py-4
                  rounded-xl sm:rounded-2xl font-bold
                  flex items-center justify-center gap-3
                "
                >
                  {updating && <Loader2 className="animate-spin" />}
                  <Pencil size={18} />
                  Save Changes
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

// -------------------------
function Input({ icon, name, value, onChange, label, editing }: any) {
  return (
    <div>
      <label className="font-bold text-sm sm:text-base lg:text-lg">
        {label}
      </label>

      <div className="flex items-center bg-gray-100 rounded-xl sm:rounded-2xl mt-2 sm:mt-3 px-3 sm:px-5">

        <div className="scale-90 sm:scale-100">
          {icon}
        </div>

        <input
          name={name}
          value={value}
          onChange={onChange}
          readOnly={!editing}
          className="
            w-full bg-transparent px-3 sm:px-4 py-3 sm:py-4
            text-sm sm:text-base outline-none
          "
        />
      </div>
    </div>
  )
}