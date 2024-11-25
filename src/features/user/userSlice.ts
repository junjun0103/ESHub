import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import type { Escort, User, Story } from "../../types"

interface UserState {
  currentUser: User | null
  userEscortProfile: Escort | null
  userStories: Story | null
  statusSaveUserProfile: "idle" | "loading" | "failed"
  statusUserProfile: "idle" | "loading" | "failed"
  statusUser: "idle" | "loading" | "failed"
  stateUserStories: "idle" | "loading" | "failed"
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  userEscortProfile: null,
  userStories: null,
  statusSaveUserProfile: "idle",
  statusUserProfile: "idle",
  statusUser: "idle",
  stateUserStories: "idle",
  error: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload
      state.statusUser = "idle"
      state.error = null
    },
    setStatus: (
      state,
      action: PayloadAction<"idle" | "loading" | "failed">,
    ) => {
      state.statusUser = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.statusUser = "failed"
    },
    setUserEscortProfile: (state, action: PayloadAction<Escort | null>) => {
      state.userEscortProfile = action.payload
      state.statusUserProfile = "idle"
      state.error = null
    },
    setStatusSaveUserProfile: (
      state,
      action: PayloadAction<"idle" | "loading" | "failed">,
    ) => {
      state.statusSaveUserProfile = action.payload
    },
    setStatusUserProfile: (
      state,
      action: PayloadAction<"idle" | "loading" | "failed">,
    ) => {
      state.statusUserProfile = action.payload
    },
    setUserStories: (state, action: PayloadAction<Story | null>) => {
      state.userStories = action.payload
      state.stateUserStories = "idle"
      state.error = null
    },
    setStatusUserStories: (
      state,
      action: PayloadAction<"idle" | "loading" | "failed">,
    ) => {
      state.stateUserStories = action.payload
    },
  },
})

export const {
  setUser,
  setStatus,
  setError,
  setUserEscortProfile,
  setStatusSaveUserProfile,
  setStatusUserProfile,
  setUserStories,
  setStatusUserStories,
} = userSlice.actions

export const selectUser = (state: RootState) => state.user.currentUser
export const selectUserStatus = (state: RootState) => state.user.statusUser
export const selectUserError = (state: RootState) => state.user.error
export const selectUserEscortProfile = (state: RootState) =>
  state.user.userEscortProfile
export const selectUserStatusProfile = (state: RootState) =>
  state.user.statusUserProfile
export const selectUserStories = (state: RootState) => state.user.userStories
export const selectUserStoriesStatus = (state: RootState) =>
  state.user.stateUserStories
export const selectUserSaveProfileStatus = (state: RootState) =>
  state.user.statusSaveUserProfile

export default userSlice.reducer
