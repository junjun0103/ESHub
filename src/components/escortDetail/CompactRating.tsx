import type React from "react"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"

interface CompactRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
}

const CompactRating: React.FC<CompactRatingProps> = ({
  rating,
  maxRating = 5,
  size = "md",
}) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  const starSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }[size]

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className={`text-yellow-400 ${starSize}`} />
      ))}
      {hasHalfStar && (
        <FaStarHalfAlt className={`text-yellow-400 ${starSize}`} />
      )}
      {[...Array(maxRating - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <FaStar key={`empty-${i}`} className={`text-gray-400 ${starSize}`} />
      ))}
      <span className="ml-1 text-sm text-gray-300">{rating.toFixed(1)}</span>
    </div>
  )
}

export default CompactRating
