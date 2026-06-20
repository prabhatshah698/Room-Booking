"use client"

import Link from "next/link"
import { Pencil } from "lucide-react"

interface Props {
  slug: string
}

export default function EditRoomButton({
  slug
}: Props) {

  return (

    <Link
      href={`/owner/edit-room/${slug}`}
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

      <Pencil size={18} />

      Edit

    </Link>
  )
}