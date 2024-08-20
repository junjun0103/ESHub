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
  items: [
    {
      id: "1",
      userId: "user1",
      imageUrls: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
      ],
      description: "A lovely day at the beach",
      createdAt: Date.now(),
      expiresAt: Date.now() + 86400000,
      suburb: "Foresthill",
      region: "Auckland",
      views: 10,
    },
  ],
  status: "idle",
  error: null,
}

export const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    setStory: (state, action: PayloadAction<Story[]>) => {
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

export const { setStory, setStoryStatus, setStoryError } = storiesSlice.actions

export const selectStories = (state: RootState) => state.stories.items
export const selectStoriesStatus = (state: RootState) => state.stories.status
export const selectStoriesError = (state: RootState) => state.stories.error

export default storiesSlice.reducer
