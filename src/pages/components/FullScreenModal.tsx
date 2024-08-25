import type React from "react"

interface FullScreenModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="relative w-full h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-4xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}

export default FullScreenModal
