import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import styles from './medicines.module.css';
// import BasketContainer from "../../Shared/Components/Client/BasketItem/BasketContainer";
import { getProductsById } from "../../Services/index";
import { sortDataByCreated } from "../../Shared/Utils/sortData";
import { GetServerSideProps } from "next";
import { useQuery } from "@tanstack/react-query";
import Nav from "../../Shared/Components/Client/Nav/Nav";
import Auth from "../../Shared/Components/Client/Auth/Auth";
import styled from "styled-components";
import { createTheme } from "@mui/material";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Shared/Redux/Featuries/User/userSlice";
import NavMedicine from "../../Shared/Components/Client/NavMedicine";
import { AppDispatch, RootState } from "../../Shared/Redux/Store/store";
import { fetchProductsById } from "../../Shared/Redux/Featuries/products/productSlice";
import Image from "next/image";
import ProductCard from "../../Shared/Components/Client/productsCard/products";
import ProductsCard from "../../Shared/Components/Client/Products/ProductCard";
import { DotLoader } from "react-spinners"; 
import { toggleRectVisible, toggleRectVisible2 } from "../../Shared/Redux/Featuries/ageSize/ageSize";
import SliderBasket from "../../Shared/Components/sliderBasket/sliderBasket";
import BasketMenu from "../../Shared/Components/sliderBasket/sliderBasket";
import { UserState } from "../../Shared/Redux/Featuries/User/userSlice";


export default function ProductsDetail() {
    const router = useRouter();
    const { push } = useRouter();
    const { id } = router.query;


    const { isRectVisible, isRectVisible2 } = useSelector((state: RootState) => state.buttonVisibility);

    const { products, status } = useSelector((state: RootState) => state.products);
    const productList = products ? [products] : [];
    const [isLoading, setIsLoading] = useState(true);
    const dispatch: AppDispatch = useDispatch();
   

    useEffect(() => {
        dispatch(toggleRectVisible())

   const userStr = localStorage.getItem("user_info");
        if (userStr) {
            try {
                const user: UserState = JSON.parse(userStr);
                dispatch(setUser(user));
            } catch (error) {
                console.error("Kullanıcı bilgisi parse edilirken hata oluştu:", error);
      
            }
        }

        if (id) {
            setIsLoading(true); 
            
            dispatch(fetchProductsById(id as string)).then(() => {
                setIsLoading(false);
            }).catch(() => {
                setIsLoading(false);
            });
        }
    }, [id, dispatch]);



    const coverImage = products?.cover_url;

  
    return (
        <div className="relative h-auto w-auto">
            
            {isLoading ? ( 
               <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
              }}>
                <DotLoader color="#28e4c5" speedMultiplier={1.6} size={90} />
              </div>
            ) : (
                <>
                    {coverImage && (
                        <Image
                            src={coverImage}
                            alt="Background"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            priority={true}
                            className="-z-50"
                        />
                    )}

                    <div className="absolute top-0 left-0 right-0 flex justify-around items-center mt-7">
                        <div className="mr-60">
                            <img
                                onClick={() => push('/')}
                                style={{ width: '90px', height: '90px' }}
                                className={styles.logo}
                                src="/Logo.png"
                                alt="Logo"
                            />
                        </div>

                        <div >
                            <NavMedicine />
                        </div>

          

                        <div className="flex gap-10">
                        <BasketMenu/>
                        <Auth/>
                        </div>
                        
                    </div>
                    

                    <div className="pt-44 flex justify-around items-center w-full">
                        <div className="text-medicineFont font-semibold text-2xl left-14">
                            {products?.description?.split('.').map((sentence, index) => (
                                <p key={index} className="mb-2">{sentence.trim()}</p>
                            ))}
                        </div>

                        <div className="mr-32 ml-32">
    {products?.img_url ? (
        <Image
            src={products.img_url}  // Burada artık string olduğundan emin olduk
            width={470}
            alt="coverimage"
            height={470}
            className="rounded-3xl"
            objectFit="cover"
            quality={100}
            priority={true}
        />
    ) : (
        <DotLoader color="#28e4c5" speedMultiplier={1.6} size={90} />  // Eğer img_url boşsa kullanıcıya bu mesajı gösterebilirsiniz
    )}
</div>

         <div className=" flex gap-5 ">

<div >
    <div className=" flex gap-4 ">
    <button 
    onClick={() => dispatch(toggleRectVisible())}
    className={`relative rounded-full w-10 h-10 overflow-hidden transition-all duration-300`}
>
    <span
        className={`absolute inset-0 bg-textColorGreen transition-transform duration-300 ease-in-out ${isRectVisible ? 'scale-100' : 'scale-0'}`}
        style={{ borderRadius: "50%" }}
    ></span>
    <span className="relative z-10">30+</span>
</button>

<button 
    onClick={() => dispatch(toggleRectVisible2())}
    className={`relative rounded-full w-10 h-10 overflow-hidden transition-all duration-300`}
>
    <span
        className={`absolute inset-0 bg-textColorGreen transition-transform duration-300 ease-in-out ${isRectVisible2 ? 'scale-100' : 'scale-0'}`}
        style={{ borderRadius: "50%" }}
    ></span>
    <span className="relative z-10">60+</span>
</button>
    </div>

<h1 className=" flex flex-col mt-3 text-goldText">ⓘ Select age dimensions</h1>
</div>





                        </div>
                    </div>

                    <div className="flex justify-around">
                        
                    <div className=" flex flex-col text-goldText font-bold">
                        <h1 >We work in close partnership with our alente - inalteine the NHS.</h1>
                        <h1> the military, majer private healtheare providers and GP practices.</h1>
                        </div>
                      

                        <h1 className="mr-28 pt-2 text-5xl text-white font-medium ">
                        {products?.price}₼
                        </h1>

                        <div className="flex gap-10">
                            <ul className="mt-2">
                                {productList.map((product) => (
                                    <ProductsCard 
                                    {...product} 
                                    id={String(product.id)} 
                                    img_url={product.img_url || ''} // img_url null ise varsayılan bir resim kullanılır
                                />
                                ))}
                            </ul>
                            <button  className={styles.buyButton}>Buy</button>
                        </div>
                    </div>

                    <div className="text-white mt-28 font-bold text-2xl">
                        <p>{products?.allDescription}</p>
                    </div>

  
                </>
            )}
        </div>
    );
}
