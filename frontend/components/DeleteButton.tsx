"use client"

import { useState } from "react"

import { Trash2 } from "lucide-react"

import ConfirmModal from "@/components/ConfirmModal"

interface Props {

  slug: string

  onDelete: (
    slug: string
  ) => void
}

export default function DeleteButton({

  slug,

  onDelete

}: Props) {

  const [showModal, setShowModal] =
    useState(false)

  return (

    <>

      <button
        onClick={() =>
          setShowModal(true)
        }
        className="
          w-14
          flex
          items-center
          justify-center
          bg-red-500
          hover:bg-red-600
          text-white
          rounded-2xl
          transition
        "
      >

        <Trash2 size={20} />

      </button>

      <ConfirmModal

        isOpen={showModal}

        title="Delete Room"

        message="Are you sure you want to delete this room? This action cannot be undone."

        confirmText="Delete"

        cancelText="Cancel"

        onCancel={() =>
          setShowModal(false)
        }

        onConfirm={() => {

          onDelete(slug)

          setShowModal(false)

        }}

      />

    </>

  )
}