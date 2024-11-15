import styles from './products.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../Redux/Store/store';
import { fetchBasket, addToBasket, deleteFromBasket } from '../../../Redux/Featuries/basketSlice/basketSlice';
import PlusSvg from "../../../../public/plus (5).png";
import DeleteSvg from '../../../../public/minus (2).png';
import { useToast } from "@chakra-ui/react";
import Image from 'next/image';
import { resetButtonVisibility } from '../../../Redux/Featuries/ageSize/ageSize';
import { BasketPostDataType } from '../../../Interface';

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
    const { isRectVisible, isRectVisible2 } = useSelector((state: RootState) => state.buttonVisibility);
    const basket = useSelector((state: RootState) => state.basket.data);  // Yeni slice'dan data'yı alıyoruz
    const toast = useToast();
    const basketCount = basket?.total_count;
const basketAmount = basket?.total_amount;
const basketItems = basket?.items || [];

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

        const basketProduct: BasketPostDataType = {
            user_id: user?.id!,
            product_id: id,
            ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
            cover_url: "",  // Resim URL'sini buraya ekleyebilirsin
            created: Date.now(),    // Oluşturulma zamanı (şu anki zaman)
            amount: 1,              // Ürünün miktarı (örneğin, 1 olarak belirlenmiş)
            description: "", // Ürün açıklaması
            rest_id: "",      // Restoran ID'si veya benzer alan
            category_id: "", // Kategori ID'si
            allDescription: "", // Tüm açıklama
            img_url: "",    // Ürünün resim URL'si
            price: 0,             // Ürünün fiyatı
            name: "",   // Ürün ismi
            count: 1,               // Ürün adedi
            total_count: basket?.total_count,  // Sepetteki toplam ürün sayısı
            total_item: basket?.total_item,    // Sepetteki toplam ürün adedi
            total_amount: basket?.total_amount // Sepetteki toplam miktar
          };
      

        if (!isRectVisible && !isRectVisible2) {
            toast({
                title: "Please select a size",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle'
            });
            return;
        }

        setButtonClicked(true);

        
        dispatch(addToBasket(basketProduct)).then((action) => {
            if (action.type === addToBasket.rejected.type) {
                setButtonClicked(false);
                toast({
                    title: "Xəta baş verdi! Xaiş olunur hesabinizla daxil olun",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                 
                    containerStyle: {
                        zIndex: 9999999999999999999999999999999999, // Set a very high z-index
                    
                    },
                })
            } else {
                dispatch(fetchBasket());  // Sepeti güncellemek için
                toast({
                    title: "Məhsul səbətə əlavə edildi!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                  
                });
            }
        });
    };





    const handleDeleteFromBasket = () => {
        if (!user) {
            toast({
                title: "Xəta baş verdi! Xaiş olunur hesabinizla daxil olun",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
             
                containerStyle: {
                    zIndex: 9999999999999999999999999999999999, // Set a very high z-index
                
                },
            })
            return;
        }

        const basketProduct: BasketPostDataType = {
            user_id: user?.id!,
            product_id: id,
            ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
            cover_url: "",  // Resim URL'sini buraya ekleyebilirsin
            created: Date.now(),    // Oluşturulma zamanı (şu anki zaman)
            amount: 1,              // Ürünün miktarı (örneğin, 1 olarak belirlenmiş)
            description: "", // Ürün açıklaması
            rest_id: "",      // Restoran ID'si veya benzer alan
            category_id: "", // Kategori ID'si
            allDescription: "", // Tüm açıklama
            img_url: "",    // Ürünün resim URL'si
            price: 0,             // Ürünün fiyatı
            name: "",   // Ürün ismi
            count: 1,               // Ürün adedi
            total_count: basket?.total_count,  // Sepetteki toplam ürün sayısı
            total_item: basket?.total_item,    // Sepetteki toplam ürün adedi
            total_amount: basket?.total_amount // Sepetteki toplam miktar
          };

        if (!isRectVisible && !isRectVisible2) {
            toast({
                title: "Please select a size",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle'
            });
            return;
        }

        dispatch(deleteFromBasket(basketProduct)).then((action) => {
            if (action.type === deleteFromBasket.rejected.type) {
                toast({
                    title: "Məhsulu səbətdən çıxarılmadi",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                   
                });
            
            } else {
                
              
                dispatch(fetchBasket());
                setButtonClicked(false);
                toast({
                    title: "Məhsul səbətdən çıxarıldı!",
                    status: 'info',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                 
                });
            }
        });
    };

    const productInBasket = basket?.items?.find((basketProduct: any) => basketProduct?.id === id);
    const productCount = productInBasket ? productInBasket.count : 0;

    return (
        <div className={`flex justify-between sm:flex-nowrap flex-wrap gap-[12px] ${styles.product_box}`}>
            <div className={`flex justify-end items-center  gap-7 ${styles.product_right}`}>
            <button onClick={handleAddToBasket} className={buttonClicked ? styles.active : ''}>
    <Image 
        src={PlusSvg} 
        alt="Add to basket" 
        width={200} 
        height={200} 
        className={styles.zoom}  // Apply zoom class to Plus image
    /> 
</button>

<h1 className='text-black text-2xl'>{productCount > 0 ? `${productCount}` : 0}</h1>

<button onClick={handleDeleteFromBasket}>
    <Image 
        src={DeleteSvg} 
        alt="Remove from basket" 
        width={100} 
        height={100} 
        className={styles.zoom}  // Apply zoom class to Delete image
    />
</button>
            </div>
        </div>
    );
}
