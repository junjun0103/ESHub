import type React from "react"
import { useState, useEffect } from "react"
import { FaStar } from "react-icons/fa"
import type { Review, ReviewRating } from "../../types"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (
    review: Omit<
      Review,
      "id" | "escortId" | "escortUserId" | "writerUserId" | "createdAt"
    >,
  ) => void
  ratingCategories: string[]
  initialReview?: Review | null
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  ratingCategories,
  initialReview,
}) => {
  const [review, setReview] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [ratings, setRatings] = useState<ReviewRating[]>([])

  useEffect(() => {
    if (initialReview) {
      setReview(initialReview.review)
      setIsPrivate(initialReview.isPrivate || false)
      setRatings(initialReview.rating)
    } else {
      setReview("")
      setIsPrivate(false)
      setRatings(
        ratingCategories.map(category => ({
          id: category,
          name: category,
          rating: 0,
        })),
      )
    }
  }, [initialReview, ratingCategories])

  const handleRatingChange = (categoryId: string, newRating: number) => {
    setRatings(prevRatings =>
      prevRatings.map(rating =>
        rating.id === categoryId ? { ...rating, rating: newRating } : rating,
      ),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ review, isPrivate, rating: ratings })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-white">
          {initialReview ? "Edit Review" : "Add Review"}
        </h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={review}
            onChange={e => setReview(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded mb-4"
            placeholder="Write your review here..."
            rows={4}
            required
          />
          {ratings.map(rating => (
            <div key={rating.id} className="flex items-center mb-2">
              <span className="w-48 text-sm text-white">{rating.name}:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${star <= rating.rating ? "text-yellow-400" : "text-gray-400"}`}
                    onClick={() => handleRatingChange(rating.id, star)}
                  />
                ))}
              </div>
            </div>
          ))}
          <label className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={e => setIsPrivate(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-white">Private review</span>
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-accent-gold text-black px-4 py-2 rounded"
            >
              {initialReview ? "Update Review" : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReviewModal
