// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"

// import Sidebar from "@/components/admin/sidebar"
// import AdminNavbar from "@/components/admin/Navbar"

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {

//   const router = useRouter()

//   const [authorized, setAuthorized] =
//     useState(false)


//   useEffect(() => {
  
//     const token =
//       localStorage.getItem(
//         "adminToken"
//       )

//     const role =
//       localStorage.getItem(
//         "adminRole"
//       )

//     if (
//       !token ||
//       role !== "admin"
//     ) {

//       router.replace(
//   "/admin/secure-panel-8x92k-login"
// )

//       return
//     }

//     setAuthorized(true)

//   }, [router])

//   if (!authorized) {

//     return (
//       <div className="
//         h-screen
//         flex
//         items-center
//         justify-center
//       ">
//         Loading...
//       </div>
//     )
//   }

//   return (

//     <div className="flex min-h-screen bg-gray-50">


//       <div className="flex-1 min-w-0">


//         <main className="p-4 md:p-6 lg:p-8">
//           {children}
//         </main>

//       </div>

//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"

import Sidebar from "@/components/admin/sidebar"
import AdminNavbar from "@/components/admin/Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* <Sidebar /> */}
             <Sidebar
          open={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />

      <div className="flex-1">

        {/* <AdminNavbar /> */}
                 <AdminNavbar
                      onMenuClick={() =>
                        setSidebarOpen(true)
                      }
                    />

        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  )
}