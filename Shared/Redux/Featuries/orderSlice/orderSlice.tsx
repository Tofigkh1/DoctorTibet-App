// import axios from 'axios';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { AddOrder } from '../../../../Services/index'


// export const sendOrder = createAsyncThunk(
//     'order/sendOrder',
//     async (orderData, { rejectWithValue }) => {
//         try {
//             const response = await AddOrder(orderData); // AddOrder fonksiyonunu kullanıyoruz
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response ? error.response.data : 'Bir hata oluştu');
//         }
//     }
// );

// const orderSlice = createSlice({
//     name: 'order',
//     initialState: {
//         loading: false,
//         success: false,
//         error: null,
//     },
//     reducers: {
//         resetOrderState: (state) => {
//             state.loading = false;
//             state.success = false;
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(sendOrder.pending, (state) => {
//                 state.loading = true;
//                 state.success = false;
//                 state.error = null;
//             })
//             .addCase(sendOrder.fulfilled, (state) => {
//                 state.loading = false;
//                 state.success = true;
//             })
//             .addCase(sendOrder.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload || 'Bir hata oluştu';
//             });
//     },
// });

// export const { resetOrderState } = orderSlice.actions;
// export default orderSlice.reducer;
