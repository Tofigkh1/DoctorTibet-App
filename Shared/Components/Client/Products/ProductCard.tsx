import styles from './products.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../Redux/Store/store';
import { fetchBasket, addToBasket, deleteFromBasket } from '../../../Redux/Featuries/basketSlice/basketSlice.tsx';
import PlusSvg from "../../../../public/plus.png";
import DeleteSvg from '../../../../public/delete.png';
import { useToast } from "@chakra-ui/react";
import Image from 'next/image';

type ProductState = {
    id: string;
    description?: string;
    img_url: string;
    name: string;
    price: number;
};

export default function ProductsCard(product: ProductState) {
    let { id, description, img_url, name, price } = product;
    const dispatch = useDispatch<AppDispatch>();
    const [buttonClicked, setButtonClicked] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const basket = useSelector((state: RootState) => state.basket);
    const products = useSelector((state: RootState) => state.products);
    
    const toast = useToast();

    useEffect(() => {
        dispatch(fetchBasket());
    }, [dispatch]);

    useEffect(() => {
        if (basket?.items?.length > 0) {
            const isInBasket = basket?.items?.some((basketProduct: any) => basketProduct?.product_id === id);
            setButtonClicked(isInBasket);
        }
    }, [basket?.items, id]);

    const handleAddToBasket = () => {
        if (!user) {
            toast({
                title: "Please log in to add products to the basket",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle'
            });
            return;
        }

        const basketProduct = {
            user_id: user?.id,
            product_id: id,
        };

        setButtonClicked(true);
        dispatch(addToBasket(basketProduct)).then((action) => {
            if (action.type === addToBasket.rejected.type) {
                setButtonClicked(false);
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

    const handleDeleteFromBasket = () => {
        if (!user) {
            toast({
                title: "Please log in to remove products from the basket",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle'
            });
            return;
        }

        const basketProduct = {
            user_id: user?.id,
            product_id: id,
        };

        dispatch(deleteFromBasket(basketProduct)).then((action) => {
            if (action.type === deleteFromBasket.rejected.type) {
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
                setButtonClicked(false);
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

    const productInBasket = basket?.items?.find((basketProduct: any) => basketProduct?.id === id);
    const productCount = productInBasket ? productInBasket.count : 0;

    return (
        <div className={`flex justify-between sm:flex-nowrap flex-wrap gap-[12px] ${styles.product_box}`}>
            <div className={`flex justify-end items-center md:gap-[30px] gap-2 ${styles.product_right}`}>
                <button onClick={handleAddToBasket} className={buttonClicked ? styles.active : ''}>
                    <Image src={PlusSvg} alt="Add to basket" />
                </button>
                <h1 className=' text-white text-2xl'>{productCount > 0 ? `${productCount}` : 0}</h1>
                <button onClick={handleDeleteFromBasket}>
                    <Image src={DeleteSvg} alt="Remove from basket" />
                </button>
               
            </div>
        </div>
    );
}
