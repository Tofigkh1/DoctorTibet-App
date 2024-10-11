// src/Shared/Redux/Featuries/ButtonVisibility/buttonVisibilitySlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ButtonVisibilityState {
    isRectVisible: boolean;
    isRectVisible2: boolean;
}

const initialState: ButtonVisibilityState = {
    isRectVisible: false,
    isRectVisible2: false,
};

const buttonVisibilitySlice = createSlice({
    name: 'buttonVisibility',
    initialState,
    reducers: {
        toggleRectVisible(state) {
            state.isRectVisible = true;
            state.isRectVisible2 = false;
        },
        toggleRectVisible2(state) {
            state.isRectVisible = false;
            state.isRectVisible2 = true;
        },
        resetButtonVisibility(state) {
            state.isRectVisible = false;
            state.isRectVisible2 = false;
        },
    },
});

export const { toggleRectVisible, toggleRectVisible2, resetButtonVisibility } = buttonVisibilitySlice.actions;

export default buttonVisibilitySlice.reducer;
