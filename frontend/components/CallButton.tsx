"use client"

import { Phone } from "lucide-react"

interface Props {
  phone: string
}

export default function CallButton({
  phone
}: Props) {

  return (

    <a
      href={`tel:${phone}`}
      className="
        flex-1
        flex
        items-center
        justify-center
        gap-2
        bg-blue-600
        hover:bg-blue-700
        text-white
        py-3
        rounded-2xl
        font-semibold
        transition
      "
    >

      <Phone size={18} />

      Call

    </a>
  )
}