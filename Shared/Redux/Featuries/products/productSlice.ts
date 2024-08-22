import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsById } from '../../../../Services';



export const fetchProductsById = createAsyncThunk(
  'products/fetchById',
  async (id: string) => {
      const response = await getProductsById(id);
      return response.data.result.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
      products: null,
      status: 'idle',
      error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(fetchProductsById.pending, (state) => {
              state.status = 'loading';
          })
          .addCase(fetchProductsById.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.products = action.payload;
          })
          .addCase(fetchProductsById.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error.message;
          });
  },
});

export default productsSlice.reducer;