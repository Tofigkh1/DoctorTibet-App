import { AxiosPromise } from "axios";
import { instanceAxios } from "../Shared/Helpers/instanceAxios";
import {
  CategoryApiResponse,
  ApiResponse,
  ProductSingleApiResponse,
  BasketPostDataType,
  RecordsPostDataType,
} from "../Shared/Interface";

// Kullanıcıyı güncelleme (PUT)
export const PutAuthUser = (body: object): AxiosPromise => {
  return instanceAxios({
    method: "PUT",
    url: "auth/user",
    data: body,
  });
};

// Ürünleri ID'ye göre getirme (GET)
export const getProductsById = (
  productsID: string | number
): AxiosPromise<ProductSingleApiResponse> => {
  return instanceAxios({
    method: "GET",
    url: `products/${productsID}`,
  });
};

// Kullanıcı kaydı (POST)
export const postSignUp = (body: object): AxiosPromise => {
  return instanceAxios({
    method: "POST",
    url: "auth/signup",
    data: body,
  });
};

// Kullanıcı bilgilerini güncelleme (PUT) - Tekrarlı kullanım kaldırıldı
export const PutAuthUserr = (body: object): AxiosPromise => {
  return instanceAxios({
    method: "PUT",
    url: "auth/user",
    data: body,
  });
};

// Sepete ürün ekleme (POST)
export const AddBasket = (
  basketProduct: BasketPostDataType
): AxiosPromise<BasketPostDataType> => {
  return instanceAxios({
    method: "POST",
    url: `basket/add`,
    data: basketProduct,
  });
};

// Sepetten ürün silme (DELETE)
export const deleteBasket = (
  basketProduct: BasketPostDataType
): AxiosPromise<BasketPostDataType> => {
  return instanceAxios({
    method: "DELETE",
    url: `basket/delete`,
    data: basketProduct,
  });
};

// Sepeti temizleme (DELETE)
export const clearBasket = (
  basketId: BasketPostDataType
): AxiosPromise<BasketPostDataType> => {
  return instanceAxios({
    method: "DELETE",
    url: `basket/clear`,
    data: basketId,
  });
};

// Sepeti getirme (GET)
export const GetBasket = (): AxiosPromise => {
  return instanceAxios({
    method: "GET",
    url: "basket",
  });
};

// Kategorileri getirme (GET)
export const getCategories = (): AxiosPromise<CategoryApiResponse> => {
  return instanceAxios({
    method: "GET",
    url: "category",
  });
};

// Ürünleri getirme (GET)
export const GetProducts = (): AxiosPromise<ApiResponse> => {
  return instanceAxios({
    method: "GET",
    url: "products",
  });
};



export const AddRecords = (
  basketProduct: RecordsPostDataType
): AxiosPromise<RecordsPostDataType> => {
  return instanceAxios({
    method: "POST",
    url: `records`,
    data: basketProduct,
  });
};


export const GetRecords = (): AxiosPromise => {
  return instanceAxios({
    method: "GET",
    url: "records",
  });
};