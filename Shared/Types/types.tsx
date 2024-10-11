// src/Redux/Types/types.ts

export interface BasketPostDataType {
    user_id: string;
    product_id: string;
    ageSize: string | null;
    cover_url: string;
    amount: number;
    created: string;
    count: number;
    // Diğer gerekli alanları ekleyin
    // Örneğin:
    // name: string;
    // price: number;
    // vb.
  }
  
  export interface AddToBasketPayload {
    user_id: string;
    product_id: string;
    ageSize: string | null;
  }
  
  export interface DeleteFromBasketPayload {
    user_id: string;
    product_id: string;
    ageSize: string | null;
  }
  
  export interface DeleteAllBasketPayload {
    user_id: string;
    basket_id: string;
  }
  