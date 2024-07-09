import styles from './products.module.css';
import React from 'react';
import PlusSvg from "../../Svg/PlusSvg";

type ProductState = {
    id: string;
    description?: string;
    img_url: string;
    name: string;
    price: number;
};

export default function ProductsCard({ id, description, img_url, name, price }: ProductState) {
    return (
        <div className={`flex justify-between sm:flex-nowrap flex-wrap gap-[12px] ${styles.product_box}`}>
            <div className={`flex justify-start md:flex-nowrap flex-wrap md:gap-[30px] gap-2 ${styles.product_left}`}>
                <img src={img_url} alt={name} className='w-[60px] h-[60px]' />
                <div className={styles.left_text}>
                    <h4>{name}</h4>
                    {description && <p>{description}</p>}
                </div>
            </div>
            <div className={`flex justify-end items-center md:gap-[30px] gap-2 ${styles.product_right}`}>
                <p>From <span>{price} &#8380;</span></p>
                <button className={styles.addButton}>
                    <PlusSvg />
                </button>
            </div>
        </div>
    );
}
