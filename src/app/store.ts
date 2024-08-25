import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"
import escortsReducer from "../features/escorts/escortsSlice"
import storiesReducer from "../features/stories/storiesSlice"
import questionAnswerReducer from "../features/questionAnswer/questionAnswerSlice"
import reviewsReducer from "../features/reviews/reviewsSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    escorts: escortsReducer,
    stories: storiesReducer,
    questionAnswer: questionAnswerReducer,
    reviews: reviewsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
