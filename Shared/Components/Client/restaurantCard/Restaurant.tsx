import styles from './card.module.css';
// import {useTranslation} from "next-i18next";

export interface RestaurantCardProps {
    img_url: string;
    name: string;
    cuisine: string;
    delivery_price: number;
    delivery_min: number;
    onReadMore: () => void;
    created: number;
}

export default function RestaurantCard({ img_url, name, cuisine, delivery_price, delivery_min, onReadMore, created }: RestaurantCardProps) {
    // const { t } = useTranslation("common");
    const isNew = Date.now() - created < 30 * 24 * 60 * 60 * 1000; // 30 günden az

    return (
        <div className={styles.restaurant_card} onClick={onReadMore}>
            <div className={styles.card_top}>
                <img src={img_url ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfIIvoEdhyv6djZkg4NvAh4sa6Gqep-m5L0Q&s'} alt={name} className='w-[175px] h-[175px]' />
                {isNew && <span className={styles.new_restaurant}>New</span>}
            </div>
            <div className={styles.card_body}>
                <h4>{name}</h4>
                <p>{cuisine}</p>
                <div className={styles.restaurant_bottom}>
                    <span>{delivery_price}10₼ Delivery</span>
                    <p>{delivery_min}10 Min</p>
                </div>
            </div>
        </div>
    );
}

