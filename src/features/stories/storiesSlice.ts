import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import type { Story } from "../../types"

interface StoriesState {
  items: Story[]
  status: "idle" | "loading" | "failed"
  error: string | null
}

const initialState: StoriesState = {
  items: [],
  status: "idle",
  error: null,
}

export const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    setStories: (state, action: PayloadAction<Story[]>) => {
      state.items = action.payload
      state.status = "idle"
      state.error = null
    },
    setStoryStatus: (
      state,
      action: PayloadAction<"idle" | "loading" | "failed">,
    ) => {
      state.status = action.payload
    },
    setStoryError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.status = "failed"
    },
  },
})

export const { setStories, setStoryStatus, setStoryError } =
  storiesSlice.actions

export const selectStories = (state: RootState) => state.stories.items
export const selectStoriesStatus = (state: RootState) => state.stories.status
export const selectStoriesError = (state: RootState) => state.stories.error

export default storiesSlice.reducer
