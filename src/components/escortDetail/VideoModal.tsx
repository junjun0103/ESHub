import type React from "react"

interface VideoModalProps {
  videoSrc: string
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

const VideoModal: React.FC<VideoModalProps> = ({
  videoSrc,
  onClose,
  onNext,
  onPrev,
}) => {
  const handleClickBackground = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose() // Close modal when clicking the background
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleClickBackground}
    >
      <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold z-10"
        >
          &times;
        </button>
        <video
          src={videoSrc}
          controls
          autoPlay
          className="w-full h-full object-contain"
        />

        {/* Previous Button */}
        <div
          onClick={onPrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white flex items-center justify-center w-16 h-16 cursor-pointer rounded-r-lg"
        >
          <span className="text-2xl">&#10094;</span>
        </div>

        {/* Next Button */}
        <div
          onClick={onNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white flex items-center justify-center w-16 h-16 cursor-pointer rounded-l-lg"
        >
          <span className="text-2xl">&#10095;</span>
        </div>
      </div>
    </div>
  )
}

export default VideoModal
