import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from './medicines.module.css'
import BasketContainer from "../../Shared/Components/Client/BasketItem/BasketContainer";
import {getProductsById} from "../../Services/index";
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
import { RootState } from "../../Shared/Redux/Store/store";
import { fetchProductsById } from "../../Shared/Redux/Featuries/products/productSlice";
import Image from "next/image";
import ProductCard from "../../Shared/Components/Client/productsCard/products";
import ProductsCard from "../../Shared/Components/Client/Products/ProductCard";







export default function ProductsDetail (){
    let router = useRouter()
    const { push } = useRouter();
    const {id} = router.query;

    const dispatch = useDispatch();
    const { products, status } = useSelector((state: RootState) => state.products);
    const productList = products ? [products] : [];
  
 
   
    

    useEffect(() => {


      let user = localStorage.getItem("user_info");
      if(user){
          user = JSON.parse(user);
          if(user) dispatch(setUser(user));
      }

        // if (id) { 
        //     getProductsById(id)
        //         .then(apires => {
        //             setProducts(apires.data.result.data)
        //             console.log("apires", apires.data);
        //         })
        //         .catch(error => {
        //             console.error("Error fetching product data:", error);
        //         });
        // }
        if (id) {
          dispatch(fetchProductsById(id as string));
      }
    }, [id, dispatch]);


    console.log("pppxx", products);

    
    const coverImage = products?.cover_url;1
    
    

    return  (
      <div className="relative h-auto w-auto">
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

              <div>
                  <NavMedicine />
              </div>

              <div className="ml-60">
                  <Auth />
              </div>
          </div>


          
<div className="pt-44 flex justify-around  items-center w-full">



  <div className=" text-medicineFont font-semibold text-2xl left-14  ">
    {products?.description?.split('.').map((sentence, index) => (
      <p key={index} className="mb-2">{sentence.trim()}.</p>
    ))}
  </div>

  <div className=" mr-32">
    <Image
      src={products?.img_url}
      width={470}
      height={470}
      className="rounded-3xl"
      objectFit="cover"
      quality={100}
      priority={true}
    />
  </div>

  <h1>dsjfsjlfd</h1>
</div>



<div className=" mt-10">

</div>


<div className="flex  justify-around">
  <h1 className="mt-20">kvsdgnsdk</h1>
 

  <h1 className=" ml-60 pt-16  text-4xl text-medicineFont font-medium">
    ${products?.price}
  </h1>

  <div className="flex gap-10">
  <ul className="mt-16">
    {productList.map((product) => (
      <li key={product.id}>
        <ProductsCard {...product} id={String(product.id)} />
      </li>
    ))}
  </ul>
  <button onClick={()=> push("/user/checkout")} className={styles.buyButton}>Buy Now</button>
  </div>

  
</div>



<div className="mt-28">
<h1>.</h1>
</div>
          
</div>
  );
}