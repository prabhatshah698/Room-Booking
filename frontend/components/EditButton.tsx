"use client"

import { Pencil } from "lucide-react"

interface EditButtonProps {
  onClick: () => void
  label?: string
}

export default function EditButton({
  onClick,
  label = "Edit"
}: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex
        items-center
        gap-2
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-xl
        hover:bg-blue-700
        transition
      "
    >
      <Pencil size={18} />
      {label}
    </button>
  )
}