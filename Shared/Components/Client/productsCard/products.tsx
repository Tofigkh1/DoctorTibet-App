import styles from './card.module.css'
import Image from "next/image";
import { shortText } from '../../../Utils/shortText'
import { ProductPostDataType } from "../../../Interface/index";
import { isNewFunction } from "../../../Utils/isNewCreated";
import { useState } from 'react';

export interface ProductsCardProps extends ProductPostDataType {
    onReadMore: () => void;
    created: number;
}

const convertToDays = (timestamp: number): number => {
    const currentTime = Date.now(); 
    const differenceInMilliseconds = currentTime - timestamp;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
}

const convertToHours = (timestamp: number): number => {
    const currentTime = Date.now();
    const differenceInMilliseconds = currentTime - timestamp;
    const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    return differenceInHours;
}

export default function ProductCard(products: ProductsCardProps) {

    console.log(products);
    
    const [Now, setNow] = useState(false);
    
    const onReadMore = products.onReadMore;
    const created_at = products.created;
    const isNew = isNewFunction(created_at);
    const daysAgo = convertToDays(created_at);
    const hoursAgo = convertToHours(created_at);

    const timeAgo = hoursAgo < 1 ? "Now" : (daysAgo > 0 ? `${daysAgo} Days ago` : `${hoursAgo} Hours ago`);


    return (
        <>
           <div className={styles.card} onClick={onReadMore}>
    <div className={styles.card_top}>
        <img src={products?.img_url ?? '/imgs/no-photo.avif'} alt={products.name}
       
             className={`${styles.productImage} w-[190px] h-[190px] object-cover`}/>
        {isNew && <span className={styles.new_restaurant}>New</span>}
    </div>

    <div className={styles.card_body}>
        <h4 className=' text-xl'>{shortText(products.name, 12)}</h4>
        <p>{shortText(products.description, 20)}</p>
        <div className={styles.restaurant_bottom}>
            <div className=' font-semibold text-2xl ml-28'>{`${products.price}₼ `}</div>
            {/* <p>{timeAgo}</p> */}
        </div>
    </div>
</div>

        </>
    )
}
