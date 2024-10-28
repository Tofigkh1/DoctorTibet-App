import {
    addToBasket,
    deleteAllBasket,
    deleteFromBasket,
    fetchBasket
} from "../../../Redux/Featuries/basketSlice/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../Redux/Store/store"; // Import RootState and AppDispatch
import Image from "next/image";
import styles from "./productPage.module.css";
import plus from '../../../../public/plus.png';
import minus from '../../../../public/minus-circle.png';
import trash from '../../../../public/trash-bin.png';
import { useToast } from "@chakra-ui/react";
import React from "react";
import { BasketPostDataType } from "../../../Interface";

const productPageCount = () => {
    const basket = useSelector((state: RootState) => state.basket);
    const user = useSelector((state: RootState) => state.user);
    const { isRectVisible, isRectVisible2 } = useSelector((state: RootState) => state.buttonVisibility);
    const basketCount = basket?.data?.total_count;
    const basketAmount = basket?.data?.total_amount;
    const basketItems = basket?.data?.items || [];
    const dispatch: AppDispatch = useDispatch(); // Use AppDispatch to type dispatch
    const toast = useToast();

    const basketId = basket?.data?.id;


 interface BasketPostData {
        id?: string | number | any;
        basket_id?: string | number;
        user_id: string | number|undefined;
        product_id?: string | number;
        img_url?: string | null;
        price?: number;
        name?: string;
        count?: number;
        amount: number;
        total_count?: number;
        total_item?: number;
        total_amount?: number;
        ageSize:string | number | null;
    }


    const handleAddFromBasket = (productId: string) => {
        const basketProduct: BasketPostDataType = {
            user_id: user?.id as string,
            product_id: productId,
            ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
            cover_url: '',  // Gerekli zorunlu alanlar
            created: Date.now(), // created bir timestamp olmalı
            description: '',
            rest_id: '',
            category_id: '',
            allDescription: '',
            amount: 0
        };
        

        dispatch(addToBasket(basketProduct)).then((action) => {
            if (addToBasket.rejected.match(action)) {
                toast({
                    title: "Failed to add product to the basket",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            } else {
                dispatch(fetchBasket());
                toast({
                    title: "Product added to the basket successfully!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            }
        });
    };

    const handleDeleteFromBasket = (productId: string) => {
        const basketProduct: BasketPostDataType = {
            user_id: user?.id as string,
            product_id: productId,
            ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
            cover_url: '',  // Varsayılan değer
            created: Date.now(),  // Zorunlu alan
            description: '',  // Varsayılan değer
            rest_id: '',  // Varsayılan değer
            category_id: '',  // Varsayılan değer
            allDescription: '',  // Varsayılan değer
            amount: 1  // Örnek olarak miktar belirliyoruz, ihtiyaca göre düzenleyebilirsin
        };
    
        dispatch(deleteFromBasket(basketProduct)).then((action) => {
            if (deleteFromBasket.rejected.match(action)) {
                toast({
                    title: "Failed to remove product from the basket",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            } else {
                dispatch(fetchBasket());
                toast({
                    title: "Product removed from the basket successfully!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            }
        });
    };
    

    // const handleDeleteAllBasket = (basketId: string) => {
    //     const basketAll = {
    //         user_id: user?.id,
    //         basket_id: basketId,
    //     };

    //     dispatch(deleteAllBasket(basketAll)).then((action) => {
    //         if (deleteAllBasket.rejected.match(action)) {
    //             toast({
    //                 title: "Failed to clear the basket",
    //                 status: 'error',
    //                 duration: 2000,
    //                 isClosable: true,
    //                 position: 'top-right',
    //             });
    //         } else {
    //             dispatch(fetchBasket());
    //             toast({
    //                 title: "Basket cleared successfully!",
    //                 status: 'success',
    //                 duration: 2000,
    //                 isClosable: true,
    //                 position: 'top-right',
    //             });
    //             const startTimeKey = `basketTimerStartTime_${basketId}`;
    //             localStorage.removeItem(startTimeKey);
    //         }
    //     });
    // };

    return (
        <div className={`${styles.scrollContainer}`}>
            {basketItems.map((items, index) => (
                <div key={index} className="flex justify-around items-center mt-10"> {/* items-center: center alignment */}
                    <div className="w-36 h-auto rounded-2xl bg-white flex justify-center items-center">
                        <Image src={items.img_url} alt={`Product Image ${index + 1}`} width={130} height={130} />
                    </div>

                    <div className="flex-1 ml-6"> {/* flex-1: flexible width, ml-6: margin between images */}
                        <h1 className="font-bold text-xl text-black">{items.name}</h1>
                        <h1>{Number(items.ageSize) === 1 ? 30 : 60} Age</h1>

                        <div className="flex items-center mt-4"> {/* Adjusted flex settings */}
                            <button
                               onClick={() => handleDeleteFromBasket(String(items.id))}
                                className="p-2 rounded-full mr-4"
                            >
                                <Image src={minus} alt="Delete product" width={35} height={35} />
                            </button>

                            <h1 className="text-black font-medium text-xl">{items.count}</h1>

                            <button
                              onClick={() => handleAddFromBasket(String(items.id))}
                                className=" p-2 rounded-full ml-4"
                            >
                                <Image src={plus} alt="Add product" width={35} height={35} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default productPageCount;
