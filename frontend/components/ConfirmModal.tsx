"use client"

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}: ConfirmModalProps) {

  if (!isOpen) return null

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
      px-4
      "
    >

      <div
        className="
        bg-white
        w-full
        max-w-md
        rounded-3xl
        p-8
        shadow-xl
        "
      >

        <h2
          className="
          text-2xl
          font-black
          text-gray-900
          "
        >
          {title}
        </h2>

        <p
          className="
          text-gray-500
          mt-4
          "
        >
          {message}
        </p>

        <div
          className="
          flex
          gap-3
          mt-8
          "
        >

          <button
            onClick={onCancel}
            className="
            flex-1
            bg-gray-100
            py-3
            rounded-2xl
            font-semibold
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="
            flex-1
            bg-red-600
            text-white
            py-3
            rounded-2xl
            font-semibold
            "
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>

  )
}