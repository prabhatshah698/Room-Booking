// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"

// export default function useAuth() {

//   const router = useRouter()

//   useEffect(() => {

//     const token = localStorage.getItem("token")

//     if (!token) {
//       router.push("/login")
//     }

//   }, [])
// }

"use client"

export default function useAuth() {

  // AUTH DISABLED TEMPORARILY

  return true
}