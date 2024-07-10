import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    id?: string;
    email: string;
    username: string;
    fullname: string;
    access_token?: string;
    refresh_token?: string;
    img_url: string | null;
    address?: string;
    phoneNumber: string | number;
}

const initialState: userState = {
    id:'',
    email: '',
    username: '',
    fullname: '',
    access_token: '',
    refresh_token: '',
    img_url:'',
    phoneNumber:'',
    address:''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userState>) => {
            return action.payload
        },
        clearUser: () => {
            return initialState;
        },
        updateUser: (state, action: PayloadAction<Partial<userState>>) => {
            return {...state, ...action.payload};
        },
},
})

export const { setUser, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;