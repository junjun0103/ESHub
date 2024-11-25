import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { StoryEntry } from "../../types"

interface StoryModalProps {
  stories: StoryEntry[]
  initialStoryIndex: number
  onClose: () => void
}

const StoryModal: React.FC<StoryModalProps> = ({
  stories,
  initialStoryIndex,
  onClose,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const currentStory = stories[currentStoryIndex]

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (currentImageIndex < currentStory.imageUrls.length - 1) {
              setCurrentImageIndex(prevIndex => prevIndex + 1)
              return 0
            } else {
              if (currentStoryIndex < stories.length - 1) {
                setCurrentStoryIndex(prevIndex => prevIndex + 1)
                setCurrentImageIndex(0)
                return 0
              } else {
                onClose()
              }
            }
          }
          return prev + 1
        })
      }, 70) // Adjust the interval to change speed
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentImageIndex, currentStoryIndex, isPaused, stories.length, onClose])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentImageIndex < currentStory.imageUrls.length - 1) {
      setCurrentImageIndex(prevIndex => prevIndex + 1)
      setProgress(0)
    } else {
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex(prevIndex => prevIndex + 1)
        setCurrentImageIndex(0)
        setProgress(0)
      } else {
        onClose()
      }
    }
  }

  const handleMouseDown = () => {
    setIsPaused(true)
  }

  const handleMouseUp = () => {
    setIsPaused(false)
  }

  const getTimeAgo = (timestamp: number) => {
    const now = new Date()
    const diffInHours = Math.floor(
      (now.getTime() - timestamp) / (1000 * 60 * 60),
    )
    return `${diffInHours} hours ago`
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="relative max-w-lg w-full h-[80vh] bg-secondary"
          onClick={e => e.stopPropagation()}
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-500">
            <div
              className="h-full bg-accent transition-all duration-50"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <img
            src={currentStory.imageUrls[currentImageIndex]}
            alt={`Story ${currentStoryIndex + 1}`}
            className="w-full h-full object-cover"
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
            <p className="text-sm mb-2">{getTimeAgo(currentStory.createdAt)}</p>
            <p className="text-lg">{currentStory.description}</p>
            <p className="text-sm">{`${currentImageIndex + 1} / ${currentStory.imageUrls.length}`}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default StoryModal
