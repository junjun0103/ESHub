import type { Review } from "../../types"
import { ReviewRating } from "../../types"
import {
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../../utils/firebase"

// Mock data for testing
const mockReviews: Review[] = [
  {
    id: "review-001",
    writerUserId: "user-001",
    escortUserId: "escort-001",
    escortId: "escort-001",
    review: "Great experience! Highly recommended.",
    rating: [
      { id: "rating-001", name: "Photo and Face Match", rating: 5 },
      { id: "rating-002", name: "Professionalism", rating: 4 },
      { id: "rating-003", name: "Communication", rating: 5 },
      { id: "rating-004", name: "Service Satisfaction", rating: 4 },
      { id: "rating-005", name: "Cleanliness and Hygiene", rating: 5 },
    ],
    createdAt: new Date("2024-08-20T18:00:00Z"),
    answer: {
      text: "Thank you for your kind words! I'm glad you enjoyed our time together.",
      createdAt: new Date("2024-08-21T18:00:00Z"),
    },
  },
  // Add more mock reviews as needed
]

export const fetchReviews = async (
  escortId: string,
  useMockData: boolean = false,
): Promise<Review[]> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    return mockReviews.filter(review => review.escortId === escortId)
  } else {
    const reviews = (await getDocuments("reviews")) as Review[]
    return reviews.filter(review => review.escortId === escortId)
  }
}

export const addReview = async (
  review: Omit<Review, "id" | "createdAt">,
  useMockData: boolean = false,
): Promise<Review> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      createdAt: new Date(),
    }
    mockReviews.push(newReview)
    return newReview
  } else {
    return (await addDocument("reviews", {
      ...review,
      createdAt: new Date(),
    })) as Review
  }
}

export const updateReview = async (
  reviewId: string,
  updates: Partial<Review>,
  useMockData: boolean = false,
): Promise<void> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    const index = mockReviews.findIndex(review => review.id === reviewId)
    if (index !== -1) {
      mockReviews[index] = { ...mockReviews[index], ...updates }
    }
  } else {
    await updateDocument("reviews", reviewId, updates)
  }
}

export const deleteReview = async (
  reviewId: string,
  useMockData: boolean = false,
): Promise<void> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    const index = mockReviews.findIndex(review => review.id === reviewId)
    if (index !== -1) {
      mockReviews.splice(index, 1)
    }
  } else {
    await deleteDocument("reviews", reviewId)
  }
}

export const addReviewAnswer = async (
  reviewId: string,
  answer: Review["answer"],
  useMockData: boolean = false,
): Promise<void> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    const index = mockReviews.findIndex(review => review.id === reviewId)
    console.log("JUN HERE", index)
    console.log("JUN HERE reviewId", reviewId, answer, mockReviews[index])

    if (index !== -1) {
      mockReviews[index].answer = answer
    }
  } else {
    await updateDocument("reviews", reviewId, { answer })
  }
}

export const updateReviewAnswer = async (
  reviewId: string,
  updates: Partial<Review["answer"]>,
  useMockData: boolean = false,
): Promise<void> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    const index = mockReviews.findIndex(review => review.id === reviewId)
    if (index !== -1 && mockReviews[index].answer) {
      mockReviews[index].answer = { ...mockReviews[index].answer, ...updates }
    }
  } else {
    await updateDocument("reviews", reviewId, {
      answer: { ...updates },
    })
  }
}

export const deleteReviewAnswer = async (
  reviewId: string,
  useMockData: boolean = false,
): Promise<void> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    const index = mockReviews.findIndex(review => review.id === reviewId)
    if (index !== -1) {
      delete mockReviews[index].answer
    }
  } else {
    await updateDocument("reviews", reviewId, { answer: null })
  }
}
