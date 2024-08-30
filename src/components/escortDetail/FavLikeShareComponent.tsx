import type React from "react"
import { useState, useEffect } from "react"
import type { Escort } from "../../types"
import { FaBookmark, FaShareAlt, FaHeart } from "react-icons/fa"
import { motion } from "framer-motion"
import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../../features/user/userSlice"
import { updateFavorite, updateLike } from "../../features/user/userAPI"

interface FavLikeShareComponentProps {
  escort: Escort
}

const FavLikeShareComponent: React.FC<FavLikeShareComponentProps> = ({
  escort,
}) => {
  const user = useAppSelector(selectUser)
  const [isFavorite, setIsFavorite] = useState(false)
  const [likes, setLikes] = useState(escort?.likes || 0)
  const [isLiked, setIsLiked] = useState(false)
  const [showCopiedMessage, setShowCopiedMessage] = useState(false)

  useEffect(() => {
    // Initialize favorite and like status
    if (user) {
      setIsFavorite(
        user?.favorites?.find(escortId => escortId === escort.id) !==
          undefined && true,
      )
      setIsLiked(
        user?.likes?.find(escortId => escortId === escort.id) !== undefined &&
          true,
      )
    } else {
      // If user is not logged in, check local storage
      const storedFavorite = localStorage.getItem(`favorite_${escort.id}`)
      const storedLike = localStorage.getItem(`like_${escort.id}`)
      setIsFavorite(storedFavorite === "true")
      setIsLiked(storedLike === "true")
    }
  }, [user, escort.id])

  const handleFavoriteClick = async () => {
    const newFavoriteStatus = !isFavorite
    setIsFavorite(newFavoriteStatus)

    if (user) {
      // Update in database
      await updateFavorite(user.id, escort.id, newFavoriteStatus)
    } else {
      // Update in local storage
      localStorage.setItem(
        `favorite_${escort.id}`,
        newFavoriteStatus.toString(),
      )
    }
  }

  const handleLikeClick = async () => {
    const newLikeStatus = !isLiked
    setIsLiked(newLikeStatus)
    setLikes(prevLikes => (newLikeStatus ? prevLikes + 1 : prevLikes - 1))

    if (user) {
      // Update in database
      await updateLike(user.id, escort.id, newLikeStatus)
    } else {
      // Update in local storage
      localStorage.setItem(`like_${escort.id}`, newLikeStatus.toString())
    }
  }

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowCopiedMessage(true)
      setTimeout(() => setShowCopiedMessage(false), 2000)
    })
  }

  return (
    <div>
      <div className="flex justify-center space-x-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavoriteClick}
          className={`p-2 rounded-full ${isFavorite ? "bg-red-500" : "bg-gray-600"}`}
        >
          <FaBookmark className="text-white" size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLikeClick}
          className={`p-2 rounded-full ${isLiked ? "bg-blue-500" : "bg-gray-600"}`}
        >
          <FaHeart className="text-white" size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShareClick}
          className="p-2 rounded-full bg-gray-600"
        >
          <FaShareAlt className="text-white" size={20} />
        </motion.button>
      </div>

      <div className="text-center mt-2">
        <span className="text-sm text-gray-200">{likes} likes</span>
      </div>

      {showCopiedMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center mt-2 text-green-400"
        >
          Link copied to clipboard!
        </motion.div>
      )}
    </div>
  )
}

export default FavLikeShareComponent
