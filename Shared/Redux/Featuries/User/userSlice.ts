import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id?: string;
  email: string;
  username: string;
  fullname: string;
  access_token?: string;
  refresh_token?: string;
  address?: string;
  phone: string;
}

const initialState: UserState = {
  id: '',
  email: '',
  username: '',
  fullname: '',
  access_token: '',
  refresh_token: '',
  phone: '',
  address: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
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
