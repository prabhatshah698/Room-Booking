"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"
import toast from "react-hot-toast"

import {
  Search,
  Trash2,
  Users,
} from "lucide-react"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  // =========================
  // FETCH USERS
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true)

      const response = await API.get("/users")
      setUsers(response.data.users || [])
    } catch (error) {
      console.log(error)
      toast.error("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // =========================
  // DELETE USER
  // =========================
  const deleteUser = async (userId: string) => {
    const confirmDelete = window.confirm("Delete this user?")
    if (!confirmDelete) return

    try {
      await API.delete(`/users/delete/${userId}`)

      toast.success("User deleted successfully")

      setUsers((prev) =>
        prev.filter((user) => user._id !== userId)
      )
    } catch (error) {
      console.log(error)
      toast.error("Delete failed")
    }
  }

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black">
            Users
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage all registered users
          </p>
        </div>

        <div className="bg-white px-4 py-3 rounded-2xl shadow-sm flex items-center gap-2 w-fit">
          <Users size={18} />
          <span className="font-bold text-sm sm:text-base">
            {users.length} Users
          </span>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm sm:text-base"
          />
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No users found
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b bg-gray-50 text-sm">
                  <th className="p-4 sm:p-5 text-left">User</th>
                  <th className="p-4 sm:p-5 text-left">Email</th>
                  <th className="p-4 sm:p-5 text-left">Phone</th>
                  <th className="p-4 sm:p-5 text-left">City</th>
                  <th className="p-4 sm:p-5 text-left">Joined</th>
                  <th className="p-4 sm:p-5 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* USER */}
                    <td className="p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.profile_image || "/avatar.png"}
                          alt=""
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />

                        <div className="font-semibold text-sm sm:text-base">
                          {user.name}
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="p-4 sm:p-5 text-sm">
                      {user.email}
                    </td>

                    {/* PHONE */}
                    <td className="p-4 sm:p-5 text-sm">
                      {user.phone || "-"}
                    </td>

                    {/* CITY */}
                    <td className="p-4 sm:p-5 text-sm">
                      {user.city || "-"}
                    </td>

                    {/* JOINED */}
                    <td className="p-4 sm:p-5 text-sm">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* ACTION */}
                    <td className="p-4 sm:p-5 text-right">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}
      </div>
    </div>
  )
}