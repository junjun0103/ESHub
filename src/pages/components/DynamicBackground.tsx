import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface DynamicBackgroundProps {
  photos: string[]
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex(prevIndex => (prevIndex + 1) % photos.length)
    }, 10000) // Change background every 10 seconds

    return () => clearInterval(interval)
  }, [photos])

  return (
    <div className="fixed inset-0 z-0">
      {photos.map((photo, index) => (
        <motion.div
          key={photo}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${photo})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentPhotoIndex ? 0.2 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-transparent opacity-90" />
    </div>
  )
}

export default DynamicBackground
