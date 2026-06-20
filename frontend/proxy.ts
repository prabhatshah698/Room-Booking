// import { NextRequest, NextResponse } from "next/server"

// export function proxy(
//   request: NextRequest
// ) {
//   const token =
//     request.cookies.get("adminToken")?.value

//   const pathname =
//     request.nextUrl.pathname

//   // Login page should stay public
//   if (
//     pathname ===
//     "/admin/secure-panel-8x92k-login"
//   ) {
//     return NextResponse.next()
//   }

//   // Protect dashboard
//   if (
//     pathname.startsWith("/admin")
//   ) {
//     if (!token) {
//       return NextResponse.redirect(
//         new URL(
//           "/admin/secure-panel-8x92k-login",
//           request.url
//         )
//       )
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/admin/:path*"]
// }


import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(
  request: NextRequest
) {

  const pathname =
    request.nextUrl.pathname

  const token =
    request.cookies.get(
      "adminToken"
    )?.value

  // allow login page
  if (
    pathname ===
    "/admin/secure-panel-8x92k-login"
  ) {
    return NextResponse.next()
  }

  // protect admin dashboard
  if (
    pathname.startsWith("/admin")
  ) {

    if (!token) {

      return NextResponse.redirect(
        new URL(
          "/admin/secure-panel-8x92k-login",
          request.url
        )
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
}