import type React from "react"
import { useRef, useState } from "react"
import Modal from "./PhotoModal"
import type { Escort } from "../../types"

interface GalleryProps {
  escort: Escort
}

const Gallery: React.FC<GalleryProps> = ({ escort }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === escort.profilePhotos.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? escort.profilePhotos.length - 1 : prevIndex - 1,
    )
  }

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX
    handleSwipe()
  }

  const handleSwipe = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swiped left, show next image
      handleNext()
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // Swiped right, show previous image
      handlePrev()
    }
  }

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  return (
    <section id="gallery" className="mb-20">
      {/* <h2 className="vogue-heading text-4xl mb-8">Gallery</h2> */}
      <div className="relative">
        <div className="overflow-hidden aspect-w-16 aspect-h-9">
          <img
            src={escort.profilePhotos[currentIndex]}
            alt={`${escort.name} profile ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => openModal(currentIndex)}
          />
        </div>

        {/* Previous Button */}
        <div
          onClick={handlePrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white flex items-center justify-center w-16 h-16 cursor-pointer rounded-r-lg"
        >
          <span className="text-2xl">&#10094;</span> {/* Left arrow */}
        </div>

        {/* Next Button */}
        <div
          onClick={handleNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white flex items-center justify-center w-16 h-16 cursor-pointer rounded-l-lg"
        >
          <span className="text-2xl">&#10095;</span> {/* Right arrow */}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {escort.profilePhotos.map((_, index) => (
            <span
              key={index}
              className={`block w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          photos={escort.profilePhotos}
          currentIndex={currentIndex}
          onClose={closeModal}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  )
}

export default Gallery
