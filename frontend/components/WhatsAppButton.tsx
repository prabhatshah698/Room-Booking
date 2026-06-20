"use client"

import { MessageCircle } from "lucide-react"

interface Props {
  phone: string
}

export default function WhatsAppButton({
  phone
}: Props) {

  const openWhatsApp = () => {

    window.open(
      `https://wa.me/${phone}`,
      "_blank"
    )
  }

  return (

    <button
      onClick={openWhatsApp}
      className="
        flex-1
        flex
        items-center
        justify-center
        gap-2
        bg-green-500
        hover:bg-green-600
        text-white
        py-3
        rounded-2xl
        font-semibold
        transition
      "
    >

      <MessageCircle size={18} />

      WhatsApp

    </button>
  )
}