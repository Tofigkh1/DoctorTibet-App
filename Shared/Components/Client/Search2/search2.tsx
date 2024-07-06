import RightIcon from "../../Svg/RightIcon";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Search2.module.css";
import searchIcon from '../../../../public/searchIcon.svg'
import Image from "next/image";

export default function Search() {
    let {push} = useRouter()
    const [query,setQuery]=useState('')
    const [focus,setFocus]=useState(false);



    return (
        <>
        <div className={styles.search_container}>
           {/* <div className={styles.icon}>
           <Image src={searchIcon}  width={25} height={20}/>
           </div> */}
  
        <input
            type="text"
            placeholder="example@email.com"
            value={query}
            onChange={(e) => {
            setQuery(e.target.value);
            setFocus(true);
                    }}
                />
                    
                {focus && 

                <div className={styles.search_result}>

                    <div className={styles.more_btn}>
                        <button>
                            <span>Show More</span> <RightIcon />
                        </button>
                    </div>
                </div>
                }
                
                {focus && <div className={styles.shadow_search} onClick={()=>setFocus(false)}/>}
                <button className={styles.searchButton}>Subscribe</button>
        </div>
        
        </>
    )
}