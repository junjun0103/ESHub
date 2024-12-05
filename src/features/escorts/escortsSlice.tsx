import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import type { Escort, Status } from "../../types"

interface EscortsState {
  escorts: Escort[]
  escortProfile: Escort | null
  status: Status
}

const initialState: EscortsState = {
  escorts: [],
  escortProfile: null,
  status: "idle",
}

export const escortsSlice = createSlice({
  name: "escorts",
  initialState,
  reducers: {
    setEscorts: (state, action: PayloadAction<Escort[]>) => {
      state.escorts = action.payload
    },
    setEscortProfile: (state, action: PayloadAction<Escort>) => {
      state.escortProfile = action.payload
    },
    updateEscortProfile: (state, action: PayloadAction<Escort>) => {
      state.escortProfile = action.payload
      const index = state.escorts.findIndex(e => e.id === action.payload.id)
      if (index !== -1) {
        state.escorts[index] = action.payload
      }
    },
    setStatus: (
      state,
      action: PayloadAction<"idle" | "loading" | "failed">,
    ) => {
      state.status = action.payload
    },
  },
})

export const { setEscorts, setEscortProfile, updateEscortProfile, setStatus } =
  escortsSlice.actions

export const selectEscorts = (state: RootState) => state.escorts.escorts
export const selectEscortProfile = (state: RootState) =>
  state.escorts.escortProfile
export const selectEscortsStatus = (state: RootState) => state.escorts.status

export default escortsSlice.reducer
