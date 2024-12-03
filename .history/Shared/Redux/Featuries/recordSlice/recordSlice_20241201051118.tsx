import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AddRecords, GetRecords } from '../../../../Services';

// Define the structure for the Records data
export type RecordsPostDataType = {
    user_id: string | undefined;
    fullname: string;
    email: string;
    delivery_address: string | number;
    payment_method: number | string;
    contact: string | number;
    basket_id: string | number;
    id: string | number;
    date: string;
    amount: number;
    created: string;
    price: number;
    discount_total: ;
  };
  
  

// Async thunk to fetch records
export const fetchRecords = createAsyncThunk('records/fetchRecords', async () => {
    const response = await GetRecords();
    console.log("responseRecrods", response);
    return response.data.result.data;  
});

// Async thunk to add a record
export const addRecord = createAsyncThunk(
  'records/addRecord',
  async (recordData: RecordsPostDataType, { rejectWithValue }) => {
    try {
      await AddRecords(recordData);
      return recordData;
    } catch (error) {
      return rejectWithValue('Failed to add record');
    }
  }
);

// Initial state
const initialState = {
  records: [] as RecordsPostDataType[],
  status: 'idle',
  error: null as string | null,
};

// Records slice
const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.records = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch records';
      })
      .addCase(addRecord.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addRecord.fulfilled, (state, action) => {
        state.records.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addRecord.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default recordsSlice.reducer;
