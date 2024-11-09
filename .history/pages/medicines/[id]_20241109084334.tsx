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
import { useResize } from "../../Shared/Hooks/useResize";
import TryInfoUser from "../../Shared/Components/Client/tryInfoUserComponent";
import Footer from "../../Shared/Components/Client/Footer";

interface RedCardContainerProps {
    isExpanded: boolean;
  }
  
  const RedCardContainer = styled.div<RedCardContainerProps>`
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #28e4c5;
 position: fixed;
      border-radius:40px 40px 0px 0px;
    color: white;
    height: ${(props) => (props.isExpanded ? "260px" : "55px")};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: height 0.2s ease-in-out, padding 1s ease-in-out;
    cursor: pointer;
`;


export default function ProductsDetail() {
    const router = useRouter();
    const { push } = useRouter();
    const { id } = router.query;
    let { isMobile } = useResize();

    const { isRectVisible, isRectVisible2 } = useSelector((state: RootState) => state.buttonVisibility);


    

    const { products, status } = useSelector((state: RootState) => state.products);

    const productList = products ? [products] : [];
    const [isLoading, setIsLoading] = useState(true);
    const dispatch: AppDispatch = useDispatch();

    const [isExpanded, setIsExpanded] = useState(true);


    const startY = useRef<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: React.TouchEvent) => {
        const endY = e.changedTouches[0].clientY;
        const swipeDistance = (startY.current ?? 0) - endY;
    
        if (swipeDistance > 50) {
            setIsExpanded(true);
        } else if (swipeDistance < -50) {
            setIsExpanded(false);
        }
    };

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
        <div className="relative  h-auto w-auto">
            
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
             

                 
               
                   
                    
                    {!isMobile &&
                    <div>


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

                

<div className={styles.headers}>
                        <div className="mr-10">
                            <img
                                onClick={() => push('/')}
                                style={{ width: '90px', height: '90px' }}
                                className={styles.logo}
                                src="/Logo.png"
                                alt="Logo"
                            />
                        </div>

                      

          

                        <div className="flex gap-5 mr-4">
                        <BasketMenu/>
                        <div className=" mt-4">
                        <Auth/>
                        </div>
                      
                        </div>
                        
                    </div>
                    <div className="  ml-72">
        <TryInfoUser/>
        </div>
                    <div className={styles.containerPoint}>
                        
                        <div className={styles.descData}>
                            
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

                    <div className="text-orange-400 mt-20 p-4 font-bold text-2xl">
                        <p>{products?.allDescription}</p>
                    </div>
                    <div className=" mt-4">

                    </div>
                    </div>
                    }

                    


{isMobile &&


    <div className={styles.madicineContainer}>

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
    
                    
    
    <div className={styles.headersMob}>
                            <div className="mr-10 mt-2">
                                <img
                                    onClick={() => push('/')}
                                    style={{ width: '90px', height: '90px' }}
                                    className={styles.logo}
                                    src="/Logo.png"
                                    alt="Logo"
                                />
                            </div>
    
                          
    
              
    
                            <div className="flex gap-6 mr-2">
                            <BasketMenu/>
                            <div className=" mt-2">
                            <Auth/>
                            </div>
          
                            </div>
                            
                        </div>
    
                        <div className=' pt-1 -ml-3'>
          <TryInfoUser/>
          </div>
    <div className={styles.medicineSize}>
    
    
    <div className="">
                                <NavMedicine />
    </div>
    
    <div className=" flex gap-5">
    
    <div className=" flex flex-col gap-7 ">
    <h1 className=" flex  text-goldText">ⓘ Yaş </h1>
        <div className=" flex gap-4 ml-11">
            
            
            <div className=" flex flex-col  gap-5">
    
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
    
    
    
        </div>
    
    
    </div>
    
    </div>
    
    </div>
    
    
    
                            
                         <div className=" pt-48 -z-50">
        {products?.img_url ? (
            <Image
                src={products.img_url}  // Burada artık string olduğundan emin olduk
                width={400}
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
    
    
    
    
    
    <div className="text-orange-400 mt-20 font-bold text-2xl p-4">
                            <p>{products?.allDescription}</p>
                        </div>
    
    <div className=" mt-4">

    </div>
                    
    
                        <RedCardContainer
                        isExpanded={isExpanded}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                 >

    {isExpanded &&
                        <div>
                          <div className=" ml-5 text-2xl font-bold text-white">
                            {products?.name}
                            </div>  
                        <div className={styles.containerPointMob}>
    
                     
                            <div className={styles.descData}>
                                {products?.description?.split('.').map((sentence, index) => (
                                    <p key={index} className="">{sentence.trim()}</p>
                                ))}
                            </div>
    
       
    
    
    
                        </div>
    
    
    
    
                        <div className="flex ">
                            
                        {/* <div className=" flex flex-col text-goldText font-bold">
                            <h1 >We work in close partnership with our alente - inalteine the NHS.</h1>
                            <h1> the military, majer private healtheare providers and GP practices.</h1>
                            </div> */}
                          
    
                            <h1 className="ml-4  text-5xl text-black font-bold  ">
                            {products?.price}₼
                            </h1>
    
                            <div className="">
                                <ul className=" mt-2">
                                    {productList.map((product) => (
                                        <ProductsCard 
                                        {...product} 
                                        id={String(product.id)} 
                                        img_url={product.img_url || ''} // img_url null ise varsayılan bir resim kullanılır
                                    />
                                    ))}
                                </ul>
                             
                            </div>
                            
                        </div>
    
                        <button onClick={()=>push('/user/checkout')} className={styles.buyButton}>Buy</button>
                        </div>
                    }
  
                        </RedCardContainer>
                     
    
    
                        </div>
}
         

  



                </>
            )}
            <Footer/>
        </div>
    );
}
