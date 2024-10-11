import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getProductsById } from '../../../../Services';
import { ProductSingleApiResponse } from '../../../Interface';

// Async thunk ile ürünleri id'ye göre çekiyoruz
export const fetchProductsById = createAsyncThunk(
  'products/fetchById',
  async (id: string): Promise<ProductSingleApiResponse['result']['data']> => {
    const response = await getProductsById(id);
    return response.data.result.data;
  }
);

// State'in tipi
interface ProductsState {
  products: ProductSingleApiResponse['result']['data'] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state tanımı
const initialState: ProductsState = {
  products: null,
  status: 'idle',
  error: null,
};

// Slice tanımı
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsById.fulfilled, (state, action: PayloadAction<ProductSingleApiResponse['result']['data']>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default productsSlice.reducer;
