import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface sideBarState {
    isOpen: boolean
}

const initialState: sideBarState = {
    isOpen: false
}

const sideBarSlice = createSlice({
    name: 'sidebar',
    initialState,

    reducers:{
        openSideBar: (state) => {
            state.isOpen = true;
        },
        closeSideBar: (state,) =>{
            state.isOpen = false;
        },
    },
});

export const { openSideBar, closeSideBar } = sideBarSlice.actions

export default sideBarSlice.reducer