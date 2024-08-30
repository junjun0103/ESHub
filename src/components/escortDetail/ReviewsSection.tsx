import type React from "react"
import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectUser } from "../../features/user/userSlice"
import {
  selectReviews,
  fetchReviewsAsync,
  addReviewAsync,
  updateReviewAsync,
  deleteReviewAsync,
  addReviewAnswerAsync,
  updateReviewAnswerAsync,
  deleteReviewAnswerAsync,
} from "../../features/reviews/reviewsSlice"
import ReviewModal from "./ReviewModal"
import type { Escort, Review } from "../../types"
import {
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaUser,
} from "react-icons/fa"
import OverallRatings from "./OverallRatings"
import CompactRating from "./CompactRating"

interface ReviewsSectionProps {
  escort: Escort
}

const REVIEWS_PER_PAGE = 5

const ratingCategories = [
  "Photo and Face Match",
  "Professionalism",
  "Communication",
  "Service Satisfaction",
  "Cleanliness and Hygiene",
]

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ escort }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const reviews = useAppSelector(selectReviews)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null)
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchReviewsAsync(escort.id))
  }, [dispatch, escort.id])

  const canViewPrivate = (review: Review) =>
    user?.userType === "superAdmin" ||
    user?.id === review.writerUserId ||
    user?.id === escort.userId

  const canEdit = (review: Review) =>
    user?.userType === "superAdmin" || user?.id === review.writerUserId

  const canAnswer = (review: Review) => user?.id === escort.userId

  const handleAddReview = (
    newReview: Omit<
      Review,
      "id" | "escortId" | "escortUserId" | "writerUserId" | "createdAt"
    >,
  ) => {
    if (user) {
      dispatch(
        addReviewAsync({
          ...newReview,
          escortId: escort.id,
          escortUserId: escort.userId,
          writerUserId: user.id,
        }),
      )
    }
    setIsReviewModalOpen(false)
  }

  const handleEditReview = (
    updatedReview: Omit<
      Review,
      "id" | "escortId" | "escortUserId" | "writerUserId" | "createdAt"
    >,
  ) => {
    if (editingReview) {
      dispatch(
        updateReviewAsync({
          reviewId: editingReview.id,
          updates: updatedReview,
        }),
      )
    }
    setEditingReview(null)
    setIsReviewModalOpen(false)
  }

  const handleDeleteReview = (reviewId: string) => {
    dispatch(deleteReviewAsync(reviewId))
  }

  const ReviewItem: React.FC<{
    review: Review
    onEdit: () => void
    onDelete: () => void
  }> = ({ review, onEdit, onDelete }) => {
    const [editedAnswer, setEditedAnswer] = useState(review.answer?.text || "")
    const [isEditedAnswerPrivate, setIsEditedAnswerPrivate] = useState(
      review.answer?.isPrivate ?? false,
    )

    const isExpanded = expandedReviewId === review.id
    const isCurrentUserReview = user?.id === review.writerUserId

    if (review.isPrivate && !canViewPrivate(review)) {
      return <div className="text-gray-500 italic">This review is private.</div>
    }

    const averageRating =
      review.rating.reduce((sum, r) => sum + r.rating, 0) / review.rating.length

    const handleEditAnswer = () => {
      if (review.answer) {
        dispatch(
          updateReviewAnswerAsync({
            reviewId: review.id,
            answer: {
              text: editedAnswer,
              isPrivate: isEditedAnswerPrivate,
            },
          }),
        )
        setEditingAnswerId(null)
      }
    }

    return (
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setExpandedReviewId(isExpanded ? null : review.id)}
        >
          <div className="flex-1 mr-4">
            <p className="text-white truncate">{review.review}</p>
          </div>
          <div className="flex items-center">
            {isCurrentUserReview && (
              <span className="text-blue-400 text-xs mr-2 flex items-center">
                <FaUser className="mr-1" /> Mine
              </span>
            )}
            <div className="mr-2">
              <CompactRating rating={averageRating} />
            </div>
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>

        {isExpanded && (
          <>
            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Posted on {new Date(review.createdAt).toLocaleDateString()}
              </p>
              {review.rating.map(r => (
                <div key={r.id} className="flex items-center mt-2">
                  <span className="w-48 text-sm">{r.name}:</span>
                  <CompactRating rating={r.rating} size="sm" />
                </div>
              ))}
            </div>

            {canEdit(review) && (
              <div className="mt-4">
                <button onClick={onEdit} className="text-accent-gold mr-2">
                  <FaEdit />
                </button>
                <button onClick={onDelete} className="text-red-500">
                  <FaTrash />
                </button>
              </div>
            )}

            {review.answer && (
              <div className="mt-4 pl-4 border-l-2 border-accent-gold">
                {editingAnswerId === review.id ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      handleEditAnswer()
                    }}
                  >
                    <textarea
                      value={editedAnswer}
                      onChange={e => setEditedAnswer(e.target.value)}
                      className="w-full bg-gray-700 text-white p-2 rounded mb-2"
                      placeholder="Edit your answer here..."
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isEditedAnswerPrivate}
                          onChange={e =>
                            setIsEditedAnswerPrivate(e.target.checked)
                          }
                          className="mr-2"
                        />
                        <span className="text-sm">Private answer</span>
                      </label>
                      <button
                        type="submit"
                        className="bg-accent-gold text-black px-4 py-2 rounded"
                      >
                        Update Answer
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="text-white">{review.answer.text}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Answered by {escort.name} on{" "}
                      {new Date(review.answer.createdAt).toLocaleDateString()}
                    </p>
                    {canAnswer(review) && (
                      <div className="mt-2">
                        <button
                          onClick={() => setEditingAnswerId(review.id)}
                          className="text-accent-gold mr-2"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() =>
                            dispatch(deleteReviewAnswerAsync(review.id))
                          }
                          className="text-red-500"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {!review.answer && canAnswer(review) && (
              <form
                onSubmit={e => {
                  e.preventDefault()
                  dispatch(
                    addReviewAnswerAsync({
                      reviewId: review.id,
                      answer: {
                        text: editedAnswer,
                        createdAt: new Date(),
                        isPrivate: isEditedAnswerPrivate,
                      },
                    }),
                  )
                  setEditedAnswer("")
                  setIsEditedAnswerPrivate(false)
                }}
                className="mt-4"
              >
                <textarea
                  value={editedAnswer}
                  onChange={e => setEditedAnswer(e.target.value)}
                  className="w-full bg-gray-700 text-white p-2 rounded mb-2"
                  placeholder="Write your answer here..."
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isEditedAnswerPrivate}
                      onChange={e => setIsEditedAnswerPrivate(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Private answer</span>
                  </label>
                  <button
                    type="submit"
                    className="bg-accent-gold text-black px-4 py-2 rounded"
                  >
                    Submit Answer
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    )
  }

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE)
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE,
  )

  if (!user) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <p className="text-white">Please log in to view reviews.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <OverallRatings reviews={reviews} ratingCategories={ratingCategories} />

      {user && user.id !== escort.userId && (
        <button
          onClick={() => {
            setEditingReview(null)
            setIsReviewModalOpen(true)
          }}
          className="bg-accent-gold text-black px-4 py-2 rounded mb-4"
        >
          Add Review
        </button>
      )}

      {paginatedReviews.map(review => (
        <ReviewItem
          key={review.id}
          review={review}
          onEdit={() => {
            setEditingReview(review)
            setIsReviewModalOpen(true)
          }}
          onDelete={() => handleDeleteReview(review.id)}
        />
      ))}

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-l disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-800 text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-r disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false)
          setEditingReview(null)
        }}
        onSubmit={editingReview ? handleEditReview : handleAddReview}
        ratingCategories={ratingCategories}
        initialReview={editingReview ?? null}
      />
    </div>
  )
}

export default ReviewsSection
