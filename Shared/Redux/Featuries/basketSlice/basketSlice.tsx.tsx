import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddBasket, GetBasket, deleteBasket } from '../../../../Services/index';


export const fetchBasket = createAsyncThunk('basket/fetchBasket', async () => {
    const response = await GetBasket();
    return response.data.result.data.items;
});


export const addToBasket = createAsyncThunk(
    'basket/addToBasket',
    async (basketProduct, { rejectWithValue }) => {
        try {
            await AddBasket(basketProduct);
            return basketProduct;
        } catch (error) {
            return rejectWithValue('Failed to add product to the basket');
        }
    }
);


export const deleteFromBasket = createAsyncThunk(
    'basket/deleteFromBasket',
    async (productId, { rejectWithValue }) => {
        try {
            await deleteBasket(productId);
            return productId;
        } catch (error) {
            return rejectWithValue('Failed to delete product from the basket');
        }
    }
);

const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
      
            .addCase(fetchBasket.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchBasket.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBasket.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

          
            .addCase(addToBasket.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(addToBasket.rejected, (state, action) => {
                state.error = action.payload;
            })

            
            .addCase(deleteFromBasket.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteFromBasket.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default basketSlice.reducer;
