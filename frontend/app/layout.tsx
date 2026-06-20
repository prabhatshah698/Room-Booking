import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import { Toaster } from "react-hot-toast"

import { OwnerProvider } from "@/app/context/OwnerContext"
import { UserProvider } from "@/app/context/UserContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: {
    default: "RentAL - Find Rooms & Rentals Easily",
    template: "%s | RentAL",
  },

  description:
    "RentAL is a modern room and rental listing platform. Find affordable rooms, flats, and PGs near you with ease.",

    verification: {
    google: "tZHnvI13wUubxPIoQ-CzxdOHzZ9ozwzoO-lxnd3D8tM",
  },

  keywords: [
    "room rental",
    "PG in India",
    "flat for rent",
    "rent room online",
    "affordable housing",
    "room booking platform",
  ],

  authors: [{ name: "RentAL Team" }],

  creator: "RentAL",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rental-nepal.vercel.app",
    siteName: "RentAL",
    title: "RentAL - Find Rooms & Rentals Easily",
    description:
      "Find affordable rooms, PGs, and flats for rent in your city with RentAL.",
    images: [
      {
        url: "/favicon.png", // put this in /public
        width: 1200,
        height: 630,
        alt: "RentAL Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "RentAL - Find Rooms & Rentals Easily",
    description:
      "Find affordable rooms, PGs, and flats for rent in your city.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  metadataBase: new URL("https://rental-nepal.vercel.app"),
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" />

        {/* ✅ WRAP BOTH PROVIDERS */}
        <OwnerProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </OwnerProvider>
      </body>
    </html>
  )
}