// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { AddBasket, GetBasket } from '../../../../Services';
// import { BasketPostDataType } from '../../../Interface';

// export const fetchBasket = createAsyncThunk(
//   'basket/fetchBasket',
//   async () => {
//     const response = await GetBasket();
//     return response.data.result.data.items;
//   }
// );

// export const addToBasket = createAsyncThunk(
//   'basket/addToBasket',
//   async (basketProduct: BasketPostDataType, { rejectWithValue }) => {
//     try {
//       const response = await AddBasket(basketProduct);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// interface BasketState {
//   items: any[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: BasketState = {
//   items: [],
//   status: 'idle',
//   error: null,
// };

// const basketSlice = createSlice({
//   name: 'basket',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBasket.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchBasket.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//       })
//       .addCase(fetchBasket.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addToBasket.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       });
//   },
// });

// export default basketSlice.reducer;
