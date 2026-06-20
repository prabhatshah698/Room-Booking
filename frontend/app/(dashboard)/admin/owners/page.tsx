"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"
import toast from "react-hot-toast"
import Link from "next/link"

import {
  Search,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Building2,
} from "lucide-react"

export default function AdminOwnersPage() {
  const [owners, setOwners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const fetchOwners = async () => {
    try {
      const response = await API.get("/owners")
      setOwners(response.data.owners || [])
    } catch (error) {
      console.log(error)
      toast.error("Failed to load owners")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOwners()
  }, [])

  const deleteOwner = async (ownerId: string) => {
    const confirmDelete = confirm("Delete this owner?")
    if (!confirmDelete) return

    try {
      await API.delete(`/owners/${ownerId}`)
      toast.success("Owner deleted")
      fetchOwners()
    } catch (error) {
      console.log(error)
      toast.error("Delete failed")
    }
  }

  const filteredOwners = owners.filter((owner) =>
    owner.name?.toLowerCase().includes(search.toLowerCase()) ||
    owner.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6 sm:mb-8">
        Manage Owners
      </h1>

      {/* SEARCH */}
      <div className="relative mb-6 sm:mb-8">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search owners by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border rounded-2xl pl-11 pr-4 py-3 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading owners...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

          {filteredOwners.map((owner) => (
            <div
              key={owner._id}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow hover:shadow-lg transition"
            >
              {/* HEADER */}
              <Link
                href={`/dashboard/admin/owners/${owner._id}`}
                className="flex items-center gap-3 sm:gap-4"
              >
                <img
                  src={owner.profile_image || "/avatar.png"}
                  alt=""
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                />

                <div>
                  <h2 className="font-bold text-base sm:text-xl">
                    {owner.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Property Owner
                  </p>
                </div>
              </Link>

              {/* DETAILS */}
              <div className="space-y-2 sm:space-y-3 mt-4 sm:mt-6 text-sm sm:text-base text-gray-700">
                <div className="flex gap-2 items-center break-all">
                  <Mail size={16} />
                  {owner.email}
                </div>

                <div className="flex gap-2 items-center">
                  <Phone size={16} />
                  {owner.phone}
                </div>

                <div className="flex gap-2 items-center">
                  <MapPin size={16} />
                  {owner.city}
                </div>

                <div className="flex gap-2 items-center">
                  <Building2 size={16} />
                  Owner Account
                </div>
              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() => deleteOwner(owner._id)}
                className="mt-4 sm:mt-6 w-full bg-red-600 hover:bg-red-700 transition text-white py-2.5 sm:py-3 rounded-xl flex justify-center items-center gap-2 text-sm sm:text-base"
              >
                <Trash2 size={16} />
                Delete Owner
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}