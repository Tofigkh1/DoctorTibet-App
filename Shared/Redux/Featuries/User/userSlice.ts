import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id?: string;
  email: string;
  username: string;
  fullname: string;
  access_token?: string;
  refresh_token?: string;
  address?: string;
  phoneNumber: string;
}

const initialState: UserState = {
  id: '',
  email: '',
  username: '',
  fullname: '',
  access_token: '',
  refresh_token: '',
  phoneNumber: '',
  address: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState | null>) => {
      return action.payload || initialState;
    },
    clearUser: () => {
      return initialState;
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
  },
})

export const { setUser, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
