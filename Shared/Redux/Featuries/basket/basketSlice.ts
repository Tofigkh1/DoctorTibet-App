import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetBasket } from '../../../../Services/index';


export const fetchSimpleBasket = createAsyncThunk('simpleBasket/fetchSimpleBasket', async () => {
    const response = await GetBasket();
    return response.data.result.data;  
});

const simpleBasketSlice = createSlice({
    name: 'simpleBasket',
    initialState: {
        data: {},
        status: 'idle',
        error: null as string | null, 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSimpleBasket.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchSimpleBasket.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSimpleBasket.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            });
    },
});

export default simpleBasketSlice.reducer;
