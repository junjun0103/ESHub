import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import type { Review } from "../../types"
import * as reviewsAPI from "./reviewsAPI"

interface ReviewsState {
  reviews: Review[]
  status: "idle" | "loading" | "failed"
  error: string | null
}

const initialState: ReviewsState = {
  reviews: [],
  status: "idle",
  error: null,
}

export const fetchReviewsAsync = createAsyncThunk(
  "reviews/fetchReviews",
  async (escortId: string) => {
    const mockData = true
    const response = await reviewsAPI.fetchReviews(escortId, mockData)
    return response
  },
)

export const addReviewAsync = createAsyncThunk(
  "reviews/addReview",
  async (review: Omit<Review, "id" | "createdAt">) => {
    const response = await reviewsAPI.addReview(review, true)
    return response
  },
)

export const updateReviewAsync = createAsyncThunk(
  "reviews/updateReview",
  async ({
    reviewId,
    updates,
  }: {
    reviewId: string
    updates: Partial<Review>
  }) => {
    await reviewsAPI.updateReview(reviewId, updates, true)
    return { reviewId, updates }
  },
)

export const deleteReviewAsync = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId: string) => {
    await reviewsAPI.deleteReview(reviewId, true)
    return reviewId
  },
)

export const addReviewAnswerAsync = createAsyncThunk(
  "reviews/addReviewAnswer",
  async ({
    reviewId,
    answer,
  }: {
    reviewId: string
    answer: Review["answer"]
  }) => {
    await reviewsAPI.addReviewAnswer(reviewId, answer, true)
    return { reviewId, answer }
  },
)

export const updateReviewAnswerAsync = createAsyncThunk(
  "reviews/updateReviewAnswer",
  async ({
    reviewId,
    answer,
  }: {
    reviewId: string
    answer: Partial<Review["answer"]>
  }) => {
    await reviewsAPI.updateReviewAnswer(reviewId, answer, true)
    return { reviewId, answer }
  },
)

export const deleteReviewAnswerAsync = createAsyncThunk(
  "reviews/deleteReviewAnswer",
  async (reviewId: string) => {
    await reviewsAPI.deleteReviewAnswer(reviewId, true)
    return reviewId
  },
)

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchReviewsAsync.pending, state => {
        state.status = "loading"
      })
      .addCase(fetchReviewsAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.reviews = action.payload
      })
      .addCase(fetchReviewsAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
      .addCase(addReviewAsync.fulfilled, (state, action) => {
        state.reviews.push(action.payload)
      })
      .addCase(updateReviewAsync.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          review => review.id === action.payload.reviewId,
        )
        if (index !== -1) {
          state.reviews[index] = {
            ...state.reviews[index],
            ...action.payload.updates,
          }
        }
      })
      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          review => review.id !== action.payload,
        )
      })
      .addCase(addReviewAnswerAsync.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          review => review.id === action.payload.reviewId,
        )
        if (index !== -1) {
          state.reviews[index].answer = action.payload.answer
        }
      })
      .addCase(updateReviewAnswerAsync.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          review => review.id === action.payload.reviewId,
        )
        if (index !== -1 && state.reviews[index].answer) {
          state.reviews[index].answer = {
            ...state.reviews[index].answer,
            ...action.payload.answer,
          }
        }
      })
      .addCase(deleteReviewAnswerAsync.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          review => review.id === action.payload,
        )
        if (index !== -1) {
          delete state.reviews[index].answer
        }
      })
  },
})

export const selectReviews = (state: RootState) => state.reviews.reviews
export const selectReviewsStatus = (state: RootState) => state.reviews.status
export const selectReviewsError = (state: RootState) => state.reviews.error

export default reviewsSlice.reducer
