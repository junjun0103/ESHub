import type React from "react"
import { FaStar } from "react-icons/fa"
import type { Review } from "../../types"

interface OverallRatingsProps {
  reviews: Review[]
  ratingCategories: string[]
}

const OverallRatings: React.FC<OverallRatingsProps> = ({
  reviews,
  ratingCategories,
}) => {
  const calculateAverageRating = (categoryName: string) => {
    const ratings = reviews.flatMap(review =>
      review.rating.filter(r => r.name === categoryName).map(r => r.rating),
    )
    return ratings.length > 0
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 0
  }

  const overallAverage =
    ratingCategories.reduce(
      (sum, category) => sum + calculateAverageRating(category),
      0,
    ) / ratingCategories.length

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-white mr-2">
            {overallAverage.toFixed(1)}
          </span>
          <FaStar className="text-yellow-400 text-xl" />
        </div>
        <span className="text-sm text-gray-400">
          {reviews.length} review{reviews.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="space-y-1">
        {ratingCategories.map(category => {
          const categoryAverage = calculateAverageRating(category)
          return (
            <div key={category} className="flex items-center text-sm">
              <span className="text-gray-400 w-1/2">{category}</span>
              <div className="w-1/2 flex items-center">
                <div className="w-full bg-gray-700 rounded-full h-1.5 mr-2">
                  <div
                    className="bg-yellow-600 h-1.5 rounded-full"
                    style={{ width: `${(categoryAverage / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-gray-400 w-8 text-right">
                  {categoryAverage.toFixed(1)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OverallRatings
