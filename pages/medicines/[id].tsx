import { useRouter } from "next/router";
import styles from './restaurants.module.css';
import styles_products from '../../shared/components/Client/Products/products.module.css';

import ProductsCard from "../../Shared/Components/Client/Products/ProductCard";
import BasketContainer from "../../Shared/Components/Client/BasketItem/BasketContainer";

export default function RestaurantDetail() {
    let router = useRouter();

    const { id } = router.query;

    const restaurant = {
        img_url: "https://www.shareicon.net/download/2015/08/29/92523_blog.svg",
        name: "Restaurant Name",
        address: "123 Main St",
        cuisine: "Italian",
        delivery_price: 5,
        products: [
            { id: 1, description: "Product 1", img_url: "https://www.shareicon.net/download/2015/08/29/92523_blog.svg", name: "Product 1", price: 10 },
            { id: 2, description: "Product 2", img_url: "https://www.shareicon.net/download/2015/08/29/92523_blog.svg", name: "Product 2", price: 20 },
            // Add more products as needed
        ]
    };

    const products = restaurant ? restaurant.products : [];

    return (
        <>
            <>
                {restaurant ?
                    <>
                        <div className='lg:px-8 px-3 pt-1 pb-[100px]'>
                            <div className={styles.restaurant_top}>
                                <img src={restaurant.img_url || undefined} alt={restaurant.name} className={styles.cover_width} />
                            </div>
                            <div className={`${styles.restaurant_detail} lg:flex-nowrap flex-wrap flex justify-between items-center`}>
                                <div className={styles.left_top}>
                                    <h1>
                                        {restaurant.name}
                                    </h1>
                                    <p>{restaurant.address}</p>
                                </div>
                                <div className={`flex items-center md:justify-end w-full justify-between md:flex-nowrap flex-wrap ${styles.top_right} gap-10`}>
                                    <div className={styles.restaurant_desc}>
                                        <p>Cuisine</p>
                                        <span>{restaurant.cuisine}</span>
                                    </div>
                                    <div className={`${styles.action} flex items-center gap-10`}>
                                        <span>{restaurant.delivery_price} &#8380; Delivery</span>
                                        <button onClick={() => router.back()}>Go Back</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex lg:flex-nowrap flex-wrap max-w-screen-xl mx-auto">
                                <div className="lg:w-4/6 w-full">
                                    <div className={styles_products.products_container}>
                                        <h2 className={`text-center ${styles_products.products_title}`}>Products</h2>
                                        <div className={styles_products.products_list}>
                                            <ul>
                                                {products.map((product) => (
                                                    <li key={product.id}>
                                                        <ProductsCard {...product} id={String(product.id)} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-2/6 w-full">
                                    <BasketContainer size={'md'} />
                                </div>
                            </div>
                        </div>
                    </>
                    : <div>Loading...</div>}
            </>
        </>
    );
}
/////write here