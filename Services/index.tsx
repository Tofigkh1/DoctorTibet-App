import { AxiosPromise } from "axios"
import { instanceAxios } from "../Shared/Helpers/instanceAxios"
import { CategoryApiResponse, ApiResponse, ProductSingleApiResponse, BasketPostDataType } from "../Shared/Interface";

export const PutAuthUser = (body: object) => {

    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "GET",
        url: "auth/user",
        data: body,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}


export const getProductsById = (
    productsID: string | number
): AxiosPromise<ProductSingleApiResponse> =>
    instanceAxios({
        method: "GET",
        url: `products/${productsID}`,
    });

    

export const postSignUp = (body:object) => {

    
    return instanceAxios({
        method: "POST",
        url: "auth/signup",
        data: body
    })
}



export const PutAuthUserr = (body: object): AxiosPromise => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "PUT",
        url: "auth/user",
        data: body,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};



export const AddBasket: (basketProduct: BasketPostDataType) => AxiosPromise<BasketPostDataType> = (basketProduct) => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "POST",
        url: `basket/add`,
        data: basketProduct,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const deleteBasket: (
    basketProduct: BasketPostDataType
) => AxiosPromise<BasketPostDataType> = (basketProduct) => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "DELETE",
        url: `basket/delete`,
        data: basketProduct,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};


export const GetBasket = (): AxiosPromise => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "GET",
        url: "basket",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};



export const getCategories = (): AxiosPromise<CategoryApiResponse> =>
    instanceAxios({method: "GET", url: "category"});

export const GetProducts = (): AxiosPromise<ApiResponse> =>
    instanceAxios({method: "GET", url: 'products'});