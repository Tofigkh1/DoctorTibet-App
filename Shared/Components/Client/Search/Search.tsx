import RightIcon from "../../Svg/RightIcon";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetProducts } from "../../../../Services";
import { ProductPostDataType } from "../../../Interface";
import styles from "./Search.module.css";
import searchIcon from '../../../../public/searchIcon.svg'
import Image from "next/image";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

export default function Search() {
    const { push } = useRouter();
    const [query, setQuery] = useState('');
    const [focus, setFocus] = useState(false);
    const [products, setProducts] = useState<ProductPostDataType[]>();
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductPostDataType | null>(null);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        if (query.trim() === '') {
            setProducts([]);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await GetProducts();
                let products = response?.data?.result?.data.filter((product) => {
                    return product?.name?.toLowerCase()?.includes(query.toLowerCase());
                });
                setProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        const debounceFetch = setTimeout(fetchData, 500);
        return () => clearTimeout(debounceFetch);
    }, [query]);

    const handleProductSelect = (product: ProductPostDataType) => {
        setQuery(product.name);
        setFocus(false);
        setSelectedProduct(product);
        setAlert(false);  // Ürün seçildiğinde alert'i false yapıyoruz.
    };

    const handleSearchClick = () => {
        if (selectedProduct) {
            push('/medicines/' + selectedProduct.id);
        } else if (products) {
            const matchedProduct = products.find((product) => product.name.toLowerCase() === query.toLowerCase());
            if (matchedProduct) {
                push('/medicines/' + matchedProduct.id);
                setAlert(false);  // Ürün bulunduğunda alert'i false yapıyoruz.
            } else {
                setAlert(true);  // Ürün bulunamazsa alert'i true yapıyoruz.
            }
        }
    };

    return (
        <>
            <div className={styles.search_container}>
                <input
                    type="text"
                    placeholder="Search for drugs in our store"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setFocus(true);
                        setSelectedProduct(null);
                    }}
                />

                {focus && 
                <div className={styles.search_result}>
                    <ul>
                        {loading ? <li>Loading...</li> :
                            <>
                                {products?.map((product) => (
                                    <li key={product.id} onClick={() => handleProductSelect(product)}>
                                        <img src={product?.img_url ?? '/imgs/no-photo.avif'} alt={product.name}/>
                                        <div>
                                            <p>{product.name}</p>
                                        </div>
                                    </li>
                                ))}
                            </>
                        }
                    </ul>

                    <div className={styles.more_btn}>
                        <button onClick={() => {push('/medicines'); setFocus(false);}}>
                            <span>Show More</span> <RightIcon />
                        </button>
                    </div>
                </div>
                }
            
                
                {focus && <div className={styles.shadow_search} onClick={() => setFocus(false)}/>}
                <button className={styles.searchButton} onClick={handleSearchClick}>Find drug</button>
            </div>

            <div className="w-5/12">
                {alert && (
                    <Alert className="mt-48 ml-16 rounded-2xl" status='error'>
                        <AlertIcon />
                        <AlertTitle>The product you are looking for could not be found!</AlertTitle>
                        <AlertDescription>try again.</AlertDescription>
                    </Alert>
                )}
            </div>
        </>
    );
}
