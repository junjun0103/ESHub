import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PhotoGalleryProps {
  photos: string[]
}

const DetailPhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<"small" | "large">("small")

  const openModal = (photo: string, index: number) => {
    setSelectedPhoto(photo)
    setCurrentIndex(index)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % photos.length)
    setSelectedPhoto(photos[(currentIndex + 1) % photos.length])
  }

  const prevPhoto = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + photos.length) % photos.length,
    )
    setSelectedPhoto(photos[(currentIndex - 1 + photos.length) % photos.length])
  }

  const renderSmallGallery = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`${index % 5 === 0 ? "col-span-1 sm:col-span-2 lg:col-span-3" : "col-span-1"} cursor-pointer`}
          onClick={() => openModal(photo, index)}
        >
          <img
            src={photo}
            alt={`Gallery ${index + 1}`}
            className="w-full h-full object-cover "
          />
        </div>
      ))}
    </div>
  )

  const renderLargeGallery = () => (
    <div className="space-y-4">
      {photos.map((photo, index) => (
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => openModal(photo, index)}
        >
          <img
            src={photo}
            alt={`Gallery ${index + 1}`}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  )

  return (
    <div className="mt-2">
      {/* Mobile Tabs */}
      <div className="sm:hidden mb-4">
        <div className="flex border-b border-gray-700">
          <button
            className={`flex-1 py-2 ${activeTab === "small" ? "border-b-2 border-accent-gold" : ""}`}
            onClick={() => setActiveTab("small")}
          >
            Small Gallery
          </button>
          <button
            className={`flex-1 py-2 ${activeTab === "large" ? "border-b-2 border-accent-gold" : ""}`}
            onClick={() => setActiveTab("large")}
          >
            Large Gallery
          </button>
        </div>
      </div>

      {/* Gallery */}
      <div className="sm:hidden">
        {activeTab === "small" ? renderSmallGallery() : renderLargeGallery()}
      </div>
      <div className="hidden sm:block">{renderSmallGallery()}</div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={closeModal}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <button
              className="absolute left-4 top-1/2 text-white text-4xl"
              onClick={prevPhoto}
            >
              &lt;
            </button>
            <button
              className="absolute right-4 top-1/2 text-white text-4xl"
              onClick={nextPhoto}
            >
              &gt;
            </button>
            <img
              src={selectedPhoto}
              alt="Full screen"
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DetailPhotoGallery
