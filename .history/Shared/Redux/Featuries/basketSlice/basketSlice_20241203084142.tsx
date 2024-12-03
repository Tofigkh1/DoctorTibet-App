import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddBasket, GetBasket, deleteBasket, clearBasket } from '../../../../Services/index';

// Basket ve BasketItem tipi
export type BasketItem = {
    user_id: string;
    cover_url: string;
    amount: number;
    created: number;
    count: number;
    description: string;
    rest_id: string;
    category_id: string;
    img_url: string;
    price: number;
    ageSize: string;
    name: string;
    allDescription: string;
    id: number | string;
    product_id?: string;
    discount_total?: number;
};

type Basket = {
    id: string;
    created: number;
    total_item: number;
    total_amount: number;
    total_count: number;
    items: BasketItem[];
};

type BasketPostDataType = {
    user_id: string;
    cover_url: string;
    amount: number;
    discount_total?: number;
    created: number;
    count?: number;
    description: string;
    rest_id: string;
    category_id: string;
    img_url?: string | null;
    price?: number | null;
    ageSize: string | null;
    name?: string | null;
    allDescription: string;
    id?: string | null ; 
    product_id?: string;
};

// Async thunk fonksiyonları
export const fetchBasket = createAsyncThunk('basket/fetchBasket', async () => {
    const response = await GetBasket();
    console.log("responseBasket", response);
    return response.data.result.data;  
});

export const addToBasket = createAsyncThunk(
    'basket/addToBasket',
    async (basketProduct: BasketPostDataType, { rejectWithValue }) => {
        try {
            await AddBasket(basketProduct);
            return basketProduct;
        } catch (error) {
            return rejectWithValue('Failed to add product to the basket');
        }
    }
);

export const deleteAllBasket = createAsyncThunk(
    'basket/deleteAllBasket',
    async (basketData: BasketPostDataType, { rejectWithValue }) => {
        try {
            await clearBasket(basketData); // BasketPostDataType yapısı verilmeli
            return basketData.id; // Veya uygun bir property
        } catch (error) {
            return rejectWithValue('Failed to delete all products from the basket');
        }
    }
);

export const deleteFromBasket = createAsyncThunk(
    'basket/deleteFromBasket',
    async (basketData: BasketPostDataType, { rejectWithValue }) => {
        try {
            await deleteBasket(basketData); // BasketPostDataType yapısı verilmeli
            return basketData.id; // Veya uygun bir property
        } catch (error) {
            return rejectWithValue('Failed to delete product from the basket');
        }
    }
);


// Başlangıç durumu (initial state)
const initialState = {
    data: {
        id: '',
        created: 0,
        total_item: 0,
        total_amount: 0,
        total_count: 0,
        discount_total:0,
        items: [] as BasketItem[],
    },
    status: 'idle',
    error: null as string | null,
};

// Basket slice
const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBasket.fulfilled, (state, action) => {
                state.data = action.payload;  
                state.status = 'succeeded';
            })
            .addCase(fetchBasket.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBasket.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })
            
            .addCase(addToBasket.fulfilled, (state, action) => {
                const itemToAdd: BasketItem = {
                    img_url: action.payload.img_url ?? '',            // img_url yoksa boş string
                    count: action.payload.count ?? 1,                 // count yoksa varsayılan 1
                    price: action.payload.price ?? 0,                 // price yoksa varsayılan 0
                    ageSize: action.payload.ageSize ?? '',            // ageSize yoksa boş string
                    name: action.payload.name ?? '',                  // name yoksa boş string
                    id: action.payload.id ?? '',                      // id yoksa boş string
                    user_id: action.payload.user_id,                  // Zorunlu alanlar aynen atanıyor
                    cover_url: action.payload.cover_url,
                    amount: action.payload.amount,
                    discount_total?: action.payload;
                    created: action.payload.created,
                    description: action.payload.description,
                    rest_id: action.payload.rest_id,
                    category_id: action.payload.category_id,
                    allDescription: action.payload.allDescription,
                    product_id: action.payload.product_id ?? '',      // product_id yoksa boş string
                };
                state.data.items.push(itemToAdd);
            })
            .addCase(addToBasket.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(deleteFromBasket.fulfilled, (state, action) => {
                state.data.items = state.data.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteFromBasket.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(deleteAllBasket.fulfilled, (state) => {
                state.data.items = [];
            })
            .addCase(deleteAllBasket.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default basketSlice.reducer;
