import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { fetchCount } from "./counterAPI"

export interface CounterSliceState {
  currentUser: {}
  currentUserStatus: "loading" | "idle" | "failed"
  profiles: []
}

const initialState: CounterSliceState = {
  currentUser: {},
  currentUserStatus: "idle",
  profiles: [],
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const counterSlice = createAppSlice({
  name: "account",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    // incrementByAmount: create.reducer(
    //   (state, action: PayloadAction<number>) => {
    //     state.value += action.payload
    //   },
    // ),
    setUser: create.asyncThunk(
      async (amount: number) => {
        const response = await fetchCount(amount)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.currentUserStatus = "loading"
        },
        fulfilled: (state, action) => {
          state.currentUserStatus = "idle"
          state.currentUser = action.payload
        },
        rejected: state => {
          state.currentUserStatus = "failed"
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectCurrentUser: account => account.currentUser,
    selectCurrentUserStatus: account => account.currentUserStatus,
  },
})

// Action creators are generated for each case reducer function.
export const { setUser } = counterSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCurrentUser, selectCurrentUserStatus } =
  counterSlice.selectors
