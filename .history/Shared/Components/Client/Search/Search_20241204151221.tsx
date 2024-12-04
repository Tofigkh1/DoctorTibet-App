import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetProducts } from "../../../../Services";
import { PostDataType, ProductPostDataType } from "../../../Interface";
import styles from "./Search.module.css";
import searchIcon from '../../../../public/searchIcon.svg';
import Image from "next/image";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { ClipLoader } from "react-spinners";
import { useResize } from "../../../Hooks/useResize";

import SearchMini from "../../../../public/search.png";

export default function Search() {
    const { push } = useRouter();
    const [query, setQuery] = useState('');
    const [focus, setFocus] = useState(false);
    const [products, setProducts] = useState<ProductPostDataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductPostDataType | null>(null);
    const [alert, setAlert] = useState(false);
    const [searchHistory, setSearchHistory] = useState<{ name: string; id: string }[]>([]);
    const { isMobile } = useResize();

    // Geçmişten veriyi al
    useEffect(() => {
        const storedHistory = localStorage.getItem('searchHistory');
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    }, []);

    // Veriyi arama sonrası güncelle
    useEffect(() => {
        const matchedProduct = products.find(
            (product) => product.name?.toLowerCase() === query.toLowerCase()
        );

        if (matchedProduct) {
            setSelectedProduct(matchedProduct);
        } else {
            setSelectedProduct(null);
        }
    }, [query, products]);

    // Arama geçmişine ekleme
    const updateSearchHistory = (product: ProductPostDataType) => {
        let updatedHistory = searchHistory.filter(
            (item) => item.name?.toLowerCase() !== product.name?.toLowerCase()
        );
        updatedHistory = [
            { name: product.name ?? '', id: product.id ?? '' },
            ...updatedHistory.slice(0, 4),
        ];
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    // Sorgu değiştiğinde ürünleri getirme
    useEffect(() => {
        if (query.trim() === '') {
            setProducts([]);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await GetProducts();
                const products = response?.data?.result?.data
                    .filter((product: PostDataType) => 
                        product?.name?.toLowerCase()?.includes(query.toLowerCase())
                    )
                    .map((product: PostDataType): ProductPostDataType => ({
                        ...product,
                        cover_url: product.cover_url || '',
                        created: product.created || new Date().toISOString(),
                        category_id: String(product.category_id) || '0',
                        allDescription: product.allDescription || '',
                    }));
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

    // Ürün seçme işlemi
    const handleProductSelect = (product: ProductPostDataType) => {
        setQuery(product.name ?? '');
        setFocus(false);
        setSelectedProduct(product);
        setAlert(false);
        updateSearchHistory(product);
    };

    // Arama butonuna tıklama
    const handleSearchClick = () => {
        const matchedProduct = products.find(
            (product) => product.name?.toLowerCase() === query.toLowerCase()
        );
    
        if (matchedProduct) {
            push('/medicines/' + matchedProduct.id);
            setAlert(false);
            updateSearchHistory(matchedProduct);
        } else {
            setAlert(true);
        }
    };

    // Geçmişten seçim
    const handleHistorySelect = (historyItem: { name: string; id: string }) => {
        setQuery(historyItem.name);
        const matchedProduct = products.find((product) => product.id === historyItem.id);
        setSelectedProduct(matchedProduct ?? { id: historyItem.id, name: historyItem.name });
        setFocus(false);
    };

    return (
        <>
            {!isMobile &&
            <div>
                <div className={styles.search_container}>
                    <input
                        type="text"
                        placeholder="İstədiyin Tibet məhsullarını axtar"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setFocus(true);
                            setSelectedProduct(null);
                        }}
                        onFocus={() => setFocus(true)}
                    />

                    {focus && 
                    <div className={styles.search_result}>
                        <ul>
                            {loading ? <ClipLoader color="#28e4c5" speedMultiplier={1.5} size={60} /> :
                                products?.map((product) => (
                                    <li key={product.id} onClick={() => handleProductSelect(product)}>
                                        <img src={product?.img_url ?? '/imgs/no-photo.avif'} alt={product.name} />
                                        <div>
                                            <p>{product.name}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>

                        <div className={styles.more_btn}>
                            <button onClick={() => { push('/medicines'); setFocus(false); }}>Daha çox göstər</button>
                        </div>

                        {focus && searchHistory.length > 0 && (
                            <div className={styles.search_history}>
                                <ul>
                                    {searchHistory.map((historyItem, index) => (
                                        <li key={index} onClick={() => handleHistorySelect(historyItem)}>
                                            <Image alt="searchIcon" src={SearchMini} width={20} height={5} />
                                            {historyItem.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    }

                    {focus && <div className={styles.shadow_search} onClick={() => setFocus(false)} />}
                    <button className={styles.searchButton} onClick={handleSearchClick}>Axtarış et</button>
                </div>

                <div className="w-5/12 md:w-96">
                    {alert && (
                        <Alert className="mt-52 ml-16 rounded-2xl" status='error'>
                            <AlertIcon />
                            <AlertTitle>The product you are looking for could not be found!</AlertTitle>
                            <AlertDescription>Try again.</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            }
        </>
    );
}
