import React, { useState } from "react";
import styles from './restaurants.module.css';
import { useRouter } from "next/router";
import FilterSvg from '../../shared/components/Svg/FilterSvg';
import CloseSvg from "../../Shared/Components/Svg/CloseSvg";

import { useModalOpen } from "../../Shared/Hooks/useModalOpen";
import { useResize } from "../../Shared/Hooks/useResize";
import RestaurantCard from "../../Shared/Components/Client/restaurantCard/Restaurant";

export default function Restaurants() {
    const [chooseCategory, setChooseCategory] = useState<string | null>(null);
    const router = useRouter();
   
    let { isOpen, onClose, onOpen } = useModalOpen();
    let { isMobile } = useResize();

    const handleCategory = (categoryName: string | null) => {
        setChooseCategory(categoryName);
    };

    function onDetail(id: number) {
        router.push('restaurants/' + id);
    }

    return (
        <div className='px-8 pt-8 pb-[100px]'>
            <div className='flex flex-row lg:flex-nowrap flex-wrap'>
                <div className="lg:w-1/5 w-full">
                    <div className={styles.category_list}>
                        {isMobile && (
                            <button className={styles.mobile_filter} onClick={onOpen}>
                                <FilterSvg />
                                <span>Filters</span>
                            </button>
                        )}
                        <div className={`${styles.category_list_box} ${isMobile ? (isOpen ? styles.show : styles.hide) : styles.show}`}>
                            {isMobile && (
                                <div className={styles.close_category}>
                                    <button onClick={onClose}><CloseSvg /></button>
                                </div>
                            )}
                            <ul>
                                <li onClick={() => { handleCategory(null); onClose(); }}>
                                    <p className="font-bold text-xl capitalize">
                                        All categories
                                    </p>
                                </li>
                                <li className={`capitalize ${chooseCategory === 'fast-food' && styles.active}`} key="fast-food" onClick={() => { handleCategory('fast-food'); onClose(); }}>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFeD_7Hpj5WWjR1zWO6RmDR8NYfMhl6d6V9bvUENB2bW_wg9YytYcWuBwpnhExQTosp0A&usqp=CAU" alt="vitamin" className="w-[25px] h-[25px]" />
                                    <span>Vitamin</span>
                                </li>
                                {/* Add more categories as needed */}
                            </ul>
                        </div>
                        <div onClick={onClose} className={`${styles.shadow} ${isMobile ? (isOpen ? styles.show : styles.hide) : styles.show}`} />
                    </div>
                </div>

                <div className="lg:w-4/5 w-full">
                    <div className="flex flex-row flex-wrap">
                        <div className="xl:w-1/4 w-full lg:w-1/3 md:w-1/2" key="restaurant-1">
                            <RestaurantCard
                                // Add necessary props for the RestaurantCard component
                            />
                        </div>
                        {/* Add more RestaurantCards as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
}
