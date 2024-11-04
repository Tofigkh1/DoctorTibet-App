import RightIcon from "../../Svg/RightIcon";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetProducts } from "../../../../Services";
import { PostDataType, ProductPostDataType } from "../../../Interface";
import styles from "./Search.module.css";
import searchIcon from '../../../../public/searchIcon.svg'
import Image from "next/image";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
import { ClipLoader } from "react-spinners";
import { useResize } from "../../../Hooks/useResize";

export default function Search() {
    const { push } = useRouter();
    const [query, setQuery] = useState('');
    const [focus, setFocus] = useState(false);
    const [products, setProducts] = useState<ProductPostDataType[]>();
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductPostDataType | null>(null);
    const [alert, setAlert] = useState(false);
    let { isMobile } = useResize();

    
    useEffect(() => {
        if (query.trim() === '') {
            setProducts([]);
            return;
        }


        
    
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await GetProducts();
                let products = response?.data?.result?.data.filter((product: PostDataType) => {
                    return product?.name?.toLowerCase()?.includes(query.toLowerCase());
                }).map((product: PostDataType): ProductPostDataType => ({
                    ...product,
                    cover_url: product.cover_url || '',  // Varsayılan değer
                    created: product.created || new Date().toISOString(),  // Varsayılan değer
                    category_id: String(product.category_id) || '0',
                    allDescription: product.allDescription || '',  // Varsayılan değer
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

    const handleProductSelect = (product: ProductPostDataType) => {
        setQuery(product.name ?? '');  // Provide a fallback empty string if product.name is undefined
        setFocus(false);
        setSelectedProduct(product);
        setAlert(false);  // Ürün seçildiğinde alert'i false yapıyoruz.
    };

    const handleSearchClick = () => {
        if (selectedProduct) {
            push('/medicines/' + selectedProduct.id);
        } else if (products) {
            const matchedProduct = products.find(
                (product) => product.name?.toLowerCase() === query.toLowerCase()
              );
            if (matchedProduct) {
                push('/medicines/' + matchedProduct.id);
                setAlert(false); 
            } else {
                setAlert(true);  
            }
        }
    };

    return (
        <>
          {!isMobile &&

        <div>
      

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
                        {loading ?    <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh' 
                }}>
                    <ClipLoader color="#28e4c5" speedMultiplier={1.5} size={60} />
                </div> :
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

            <div className="w-5/12 md:w-96">
                {alert && (
                    <Alert className="mt-52 ml-16 rounded-2xl" status='error'>
                        <AlertIcon />
                        <AlertTitle>The product you are looking for could not be found!</AlertTitle>
                        <AlertDescription>try again.</AlertDescription>
                    </Alert>
                )}
            </div>


</div>
}


{isMobile &&

<div>


    <div className={styles.search_containerMob }>
        <input
            type="text"
            placeholder="İstədiyiniz Tibet məhsullarını axtar"
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
                {loading ?    <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh' 
        }}>
            <ClipLoader color="#28e4c5" speedMultiplier={1.5} size={60} />
        </div> :
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
        <button className={styles.searchButtonMob} onClick={handleSearchClick}>Axtarış et</button>
    </div>

    <div className="w-5/12 md:w-96">
        {alert && (
            <Alert className="mt-52 ml-16 rounded-2xl" status='error'>
                <AlertIcon />
                <AlertTitle>The product you are looking for could not be found!</AlertTitle>
                <AlertDescription>try again.</AlertDescription>
            </Alert>
        )}
    </div>


</div>
}
        </>
    );
}