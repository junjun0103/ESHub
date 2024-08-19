import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import type { Escort, User } from "../../types"

interface UserState {
  currentUser: User | null;
  userEscortProfile: Escort | null;
  statusUserProfile: 'idle' | 'loading' | 'failed';
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  currentUser: {
    id: '1',
    email: 'test@gmail.com',
    name: 'testUser',
    userType: 'escort', // Jun
  },
  userEscortProfile: null,
  statusUserProfile:'idle',
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      state.status = 'idle';
      state.error = null;
    },
    setStatus: (state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    setUserEscortProfile: (state, action: PayloadAction<Escort | null>) => {
      state.userEscortProfile = action.payload;
      state.status = 'idle';
      state.error = null;
    },
    setStatusUserProfile: (state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
      state.statusUserProfile = action.payload;
    },
  },
});

export const { setUser, setStatus, setError, setUserEscortProfile, setStatusUserProfile} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserEscortProfile = (state: RootState) => state.user.userEscortProfile;
export const selectUserStatusProfile = (state: RootState) => state.user.statusUserProfile;


export default userSlice.reducer;
