import type React from "react"
import { useState, useEffect } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../../features/user/userSlice"
import { fetchReviews as fetchAllReviews } from "../../features/reviews/reviewsAPI"
import type { Review, User } from "../../types"
import { StarIcon } from "@heroicons/react/24/solid"
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline"
import { formatDate } from "./Helper"

interface ReviewSectionProps {
  escortId: string
  escortUserId: string
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  escortId,
  escortUserId,
}) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const user = useAppSelector(selectUser)

  useEffect(() => {
    fetchReviews(currentPage)
  }, [currentPage, escortId])

  const fetchReviews = async (page: number) => {
    // TODO: Implement API call to fetch reviews
    // This should return an object with reviews and total pages
    const response = await fetchAllReviews(escortId, true)
    setReviews(response)
    // setReviews(response.reviews);
    // setTotalPages(response.totalPages);
  }

  const handleCreateReview = async (
    reviewData: Omit<
      Review,
      "id" | "writerUserId" | "escortUserId" | "escortId" | "createdAt"
    >,
  ) => {
    // TODO: Implement API call to create a new review
    // After successful creation, refetch the first page of reviews
    setIsModalOpen(false)
    fetchReviews(1)
    setCurrentPage(1)
  }

  const handleUpdateReview = async (
    reviewId: string,
    reviewData: Partial<Review>,
  ) => {
    // TODO: Implement API call to update a review
    // After successful update, refetch the current page of reviews
    fetchReviews(currentPage)
  }

  const handleDeleteReview = async (reviewId: string) => {
    // TODO: Implement API call to delete a review
    // After successful deletion, refetch the current page of reviews
    fetchReviews(currentPage)
  }

  if (!user) {
    return (
      <section className="mb-20">
        <h2 className="vogue-heading text-4xl mb-8">Reviews</h2>
        <p>Please log in to view and write reviews.</p>
      </section>
    )
  }

  return (
    <section className="mb-20">
      <h2 className="vogue-heading text-4xl mb-8">Reviews</h2>
      {user.userType !== "escort" && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-secondary px-4 py-2 rounded mb-4"
        >
          Write a Review
        </button>
      )}
      <ReviewList
        reviews={reviews}
        currentUser={user}
        escortUserId={escortUserId}
        onUpdateReview={handleUpdateReview}
        onDeleteReview={handleDeleteReview}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {isModalOpen && (
        <ReviewModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateReview}
        />
      )}
    </section>
  )
}

interface ReviewListProps {
  reviews: Review[]
  currentUser: User
  escortUserId: string
  onUpdateReview: (reviewId: string, reviewData: Partial<Review>) => void
  onDeleteReview: (reviewId: string) => void
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  currentUser,
  escortUserId,
  onUpdateReview,
  onDeleteReview,
}) => {
  return (
    <div className="space-y-4">
      {reviews.map(review => (
        <ReviewItem
          key={review.id}
          review={review}
          currentUser={currentUser}
          escortUserId={escortUserId}
          onUpdateReview={onUpdateReview}
          onDeleteReview={onDeleteReview}
        />
      ))}
    </div>
  )
}

interface ReviewItemProps {
  review: Review
  currentUser: User
  escortUserId: string
  onUpdateReview: (reviewId: string, reviewData: Partial<Review>) => void
  onDeleteReview: (reviewId: string) => void
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  currentUser,
  escortUserId,
  onUpdateReview,
  onDeleteReview,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedReview, setEditedReview] = useState(review)

  const canEdit = currentUser.id === review.writerUserId
  const isMine = currentUser.id === review.writerUserId

  const handleUpdate = () => {
    onUpdateReview(review.id, editedReview)
    setIsEditing(false)
  }

  const calculateOverallRating = (
    ratings: Array<{ name: string; rating: number }>,
  ): number => {
    const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0)
    return Math.round((sum / ratings.length) * 10) / 10 // Round to 1 decimal place
  }

  const overallRating = calculateOverallRating(review.rating)

  return (
    <div className={`border rounded p-4 ${isMine ? "border-blue-500" : ""}`}>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="font-bold">
            Review by {isMine ? "You" : "Anonymous"}
          </h3>
          <p className="text-sm text-gray-500">
            {formatDate(review.createdAt)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="ml-1">{overallRating.toFixed(1)}</span>
          </div>
          <span>{isExpanded ? "▲" : "▼"}</span>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4">
          {isEditing ? (
            <ReviewForm
              review={editedReview}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <ReviewContent review={review} />
              {canEdit && (
                <div className="mt-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteReview(review.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

const ReviewContent: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div>
      <RatingDisplay
        label="Photo and Face Match"
        rating={
          review.rating.find(r => r.name === "Photo and Face Match")?.rating ||
          0
        }
      />
      <RatingDisplay
        label="Professionalism"
        rating={
          review.rating.find(r => r.name === "Professionalism")?.rating || 0
        }
      />
      <RatingDisplay
        label="Communication"
        rating={
          review.rating.find(r => r.name === "Communication")?.rating || 0
        }
      />
      <RatingDisplay
        label="Service Satisfaction"
        rating={
          review.rating.find(r => r.name === "Service Satisfaction")?.rating ||
          0
        }
      />
      <RatingDisplay
        label="Cleanliness and Hygiene"
        rating={
          review.rating.find(r => r.name === "Cleanliness and Hygiene")
            ?.rating || 0
        }
      />
      <p className="mt-2">{review.review}</p>
    </div>
  )
}

const RatingDisplay: React.FC<{ label: string; rating: number }> = ({
  label,
  rating,
}) => {
  return (
    <div className="flex items-center">
      <span className="mr-2">{label}:</span>
      {[1, 2, 3, 4, 5].map(star =>
        star <= rating ? (
          <StarIcon key={star} className="h-5 w-5 text-yellow-400" />
        ) : (
          <StarIconOutline key={star} className="h-5 w-5 text-yellow-400" />
        ),
      )}
      <span className="ml-2">({rating}/5)</span>
    </div>
  )
}

interface ReviewModalProps {
  onClose: () => void
  onSubmit: (
    reviewData: Omit<
      Review,
      "id" | "writerUserId" | "escortUserId" | "escortId" | "createdAt"
    >,
  ) => void
}

const ReviewModal: React.FC<ReviewModalProps> = ({ onClose, onSubmit }) => {
  const [review, setReview] = useState<
    Omit<
      Review,
      "id" | "writerUserId" | "escortUserId" | "escortId" | "createdAt"
    >
  >({
    review: "",
    rating: [
      {
        name: "Photo and Face Match",
        rating: 0,
      },
      {
        name: "Professionalism",
        rating: 0,
      },
      {
        name: "Communication",
        rating: 0,
      },
      {
        name: "Service Satisfaction",
        rating: 0,
      },
      {
        name: "Cleanliness and Hygiene",
        rating: 0,
      },
    ],
    isPrivate: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(review)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <ReviewForm
          review={review}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  )
}

interface ReviewFormProps {
  review: Omit<
    Review,
    "id" | "writerUserId" | "escortUserId" | "escortId" | "createdAt"
  >
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  review,
  onSubmit,
  onCancel,
}) => {
  const [localReview, setLocalReview] = useState(review)

  const handleRatingChange = (name: string, rating: number) => {
    setLocalReview(prev => ({
      ...prev,
      rating: prev.rating.map(r => (r.name === name ? { ...r, rating } : r)),
    }))
  }

  return (
    <form onSubmit={onSubmit}>
      {localReview.rating.map(({ name, rating }) => (
        <div key={name} className="mb-4">
          <label className="block mb-2">{name}</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(name, star)}
                className="mr-1"
              >
                {star <= rating ? (
                  <StarIcon className="h-6 w-6 text-yellow-400" />
                ) : (
                  <StarIconOutline className="h-6 w-6 text-yellow-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
      <textarea
        value={localReview.review}
        onChange={e =>
          setLocalReview(prev => ({ ...prev, review: e.target.value }))
        }
        className="w-full p-2 border rounded mb-4"
        placeholder="Write your review here..."
        rows={4}
        required
      />
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="private-review"
          checked={localReview.isPrivate}
          onChange={e =>
            setLocalReview(prev => ({ ...prev, isPrivate: e.target.checked }))
          }
          className="mr-2"
        />
        <label htmlFor="private-review">Make this review private</label>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="mr-2 px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-secondary rounded"
        >
          Submit Review
        </button>
      </div>
    </form>
  )
}

const Pagination: React.FC<{
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center space-x-2 mt-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "bg-primary text-secondary"
              : "bg-gray-200 text-primary"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default ReviewSection
