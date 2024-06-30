import RightIcon from "../../Svg/RightIcon";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Search2.module.css";
import searchIcon from '../../../../public/searchIcon.svg'
import Image from "next/image";

export default function Search2() {
   



    return (
        <>
        <div className={styles.search_container}>
           {/* <div className={styles.icon}>
           <Image src={searchIcon}  width={25} height={20}/>
           </div> */}
  
        <input
            type="text"
            placeholder="example@email.com"
           
                />
                    
             

                <div className={styles.search_result}>

                   
                </div>
                
                
             <div className={styles.shadow_search} />
                <button className={styles.searchButton}>Subscribe</button>
        </div>
        
        </>
    )
}
