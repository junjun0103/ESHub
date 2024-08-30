import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

interface PhotoGalleryProps {
  photos: string[]
}

const DetailPhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

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

  return (
    <div className="mt-4">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3 }}>
        <Masonry gutter="10px">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer overflow-hidden rounded-sm shadow-lg"
              onClick={() => openModal(photo, index)}
            >
              <img
                src={photo}
                alt={`Gallery ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
              />
            </motion.div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

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
              className="absolute top-4 right-4 text-white text-4xl focus:outline-none"
              onClick={closeModal}
            >
              &times;
            </button>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl focus:outline-none"
              onClick={prevPhoto}
            >
              &#8249;
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl focus:outline-none"
              onClick={nextPhoto}
            >
              &#8250;
            </button>
            <motion.img
              key={selectedPhoto}
              src={selectedPhoto}
              alt="Full screen"
              className="max-w-full max-h-full object-contain"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DetailPhotoGallery
