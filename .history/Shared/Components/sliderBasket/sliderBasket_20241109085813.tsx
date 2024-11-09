import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './Slider.module.css';
import Image from 'next/image';
import shoppingBag from '../../../public/shopping-basket (2).png';
import emptyBag from '../../../public/Emptybasket (1).png';
import closedBag from '../../../public/left-chevron.png';
import plus from '../../../public/plus (3).png';
import minus from '../../../public/minus-circle.png';
import trash from '../../../public/trash-bin.png';
import miniBasket from '../../../public/cart.png';
import DeleteSvg from '../../../../public/delete.png';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/Store/store';
import { GetBasket } from '../../../Services';
import { fetchBasket, deleteFromBasket, addToBasket, deleteAllBasket } from '../../Redux/Featuries/basketSlice/basketSlice';
import { useToast } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import ProductsCard from '../Client/Products/ProductCard';
import { BasketPostDataType } from '../../Interface';
import { useResize } from '../../Hooks/useResize';

const BasketMenu = () => {
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();
  const basket = useSelector((state: RootState) => state.basket);
  const user = useSelector((state: RootState) => state.user);
  const { isRectVisible, isRectVisible2 } = useSelector((state: RootState) => state.buttonVisibility);
  const basketCount = basket?.data?.total_count;
  const basketAmount = basket?.data?.total_amount;
  const basketItems = basket?.data?.items || [];
  let { isMobile } = useResize();
  const basketId = basket?.data?.id;


  

 
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  

  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState(3000);
  let { push} = useRouter();
  const [progress, setProgress] = useState(0);
  const duration = 50 * 60 * 1000;
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);


  useEffect(() => {
    const startTimeKey = `basketTimerStartTime_${basketId}`;
    const savedStartTime = localStorage.getItem(startTimeKey);

    let startTime = savedStartTime ? parseInt(savedStartTime, 10) : Date.now();
    if (!savedStartTime) {
      localStorage.setItem(startTimeKey, startTime.toString());
    }

    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = (elapsedTime / duration) * 100;

      if (newProgress >= 100) {
        setProgress(100);
        clearInterval(intervalId);
        handleDeleteAllBasket(basketId); 
        localStorage.removeItem(startTimeKey); 
      } else {
        setProgress(newProgress);
        setRemainingTime(duration - elapsedTime);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
  
    setProgress((timeLeft / 3000) * 100);
  }, [timeLeft]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResult = await GetBasket();
        const items = dataResult?.data?.result?.data?.items || [];
        const imgUrls = items.map((item: any) => item.img_url);
        setImageUrl(imgUrls);
      } catch (error) {
        console.error("Error fetching basket data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  useEffect(() => {
    const imgUrls = basketItems.map((item: any) => item.img_url);
    setImageUrl(imgUrls);
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleAddFromBasket = (productId: string) => {
    const basketProduct: BasketPostDataType = {
      user_id: user?.id!,
      product_id: productId,
      ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
      cover_url: "",  // Resim URL'sini buraya ekleyebilirsin
      created: Date.now(),    // Oluşturulma zamanı (şu anki zaman)
      amount: 1,              // Ürünün miktarı (örneğin, 1 olarak belirlenmiş)
      description: "", // Ürün açıklaması
      rest_id: "",      // Restoran ID'si veya benzer alan
      category_id: "", // Kategori ID'si
      allDescription: "", // Tüm açıklama
      img_url: "",    // Ürünün resim URL'si
      price: 0,             // Ürünün fiyatı
      name: "",   // Ürün ismi
      count: 1,               // Ürün adedi
      total_count: basket?.data?.total_count,  // Sepetteki toplam ürün sayısı
      total_item: basket?.data?.total_item,    // Sepetteki toplam ürün adedi
      total_amount: basket?.data?.total_amount // Sepetteki toplam miktar
    };


    dispatch(addToBasket(basketProduct)).then((action) => {
      if (action.type === deleteFromBasket.rejected.type) {
        toast({
          title: "Failed to remove product from the basket",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
          variant: 'subtle'
        });
      } else {
        dispatch(fetchBasket());
        toast({
          title: "Product added to the basket successfully!",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
          variant: 'subtle'
        });
      }
    });
  };

  const handleDeleteFromBasket = (productId: string) => {

    const basketProduct: BasketPostDataType = {
      user_id: user?.id!,
      product_id: productId,
      ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
      cover_url: "",  // Resim URL'sini buraya ekleyebilirsin
      created: Date.now(),    // Oluşturulma zamanı (şu anki zaman)
      amount: 1,              // Ürünün miktarı (örneğin, 1 olarak belirlenmiş)
      description: "", // Ürün açıklaması
      rest_id: "",      // Restoran ID'si veya benzer alan
      category_id: "", // Kategori ID'si
      allDescription: "", // Tüm açıklama
      img_url: "",    // Ürünün resim URL'si
      price: 0,             // Ürünün fiyatı
      name: "",   // Ürün ismi
      count: 1,               // Ürün adedi
      total_count: basket?.data?.total_count,  // Sepetteki toplam ürün sayısı
      total_item: basket?.data?.total_item,    // Sepetteki toplam ürün adedi
      total_amount: basket?.data?.total_amount // Sepetteki toplam miktar
    };

    dispatch(deleteFromBasket(basketProduct)).then((action) => {
      if (action.type === deleteFromBasket.rejected.type) {
        toast({
          title: "Failed to remove product from the basket",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
          variant: 'subtle'
        });
      } else {
        dispatch(fetchBasket());
        toast({
          title: "Product removed from the basket successfully!",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
          variant: 'subtle'
        });
      }
    });
  };





  const handleDeleteAllBasket = (basketId: string) => {
    const basketAll: BasketPostDataType = {
      user_id: user?.id!,
      basket_id: basketId,
      ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
      cover_url: "",  // Resim URL'sini buraya ekleyebilirsin
      created: Date.now(),    // Oluşturulma zamanı (şu anki zaman)
      amount: 1,              // Ürünün miktarı (örneğin, 1 olarak belirlenmiş)
      description: "", // Ürün açıklaması
      rest_id: "",      // Restoran ID'si veya benzer alan
      category_id: "", // Kategori ID'si
      allDescription: "", // Tüm açıklama
      img_url: "",    // Ürünün resim URL'si
      price: 0,             // Ürünün fiyatı
      name: "",   // Ürün ismi
      count: 1,               // Ürün adedi
      total_count: basket?.data?.total_count,  // Sepetteki toplam ürün sayısı
      total_item: basket?.data?.total_item,    // Sepetteki toplam ürün adedi
      total_amount: basket?.data?.total_amount // Sepetteki toplam miktar
    };
    dispatch(deleteAllBasket(basketAll)).then((action) => {
      if (action.type === deleteAllBasket.rejected.type) {
        toast({
          title: "Failed to clear the basket",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        dispatch(fetchBasket());
        toast({
          title: "Basket cleared successfully!",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
        const startTimeKey = `basketTimerStartTime_${basketId}`;
        localStorage.removeItem(startTimeKey); 
      }
    });
  };



  return (
    <>

{!isMobile &&

<div>
      <button onClick={handleToggleMenu} className={styles.buyButton}>
        <div className=' -z-50'>
          <Image src={shoppingBag} width={55} height={55} alt="Basket Icon"/>
        </div>
        <div className=' text-white absolute  ml-9 bg-mainRed w-6 h-6 rounded-full  font-semibold'>
        {basketCount}
      </div>
      </button>
    

      <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>

      <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
        <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
          {basketItems.length > 0 ? (
            <div>
            

              <div className=' flex'>
                <div>
                  <button onClick={handleToggleMenu} className={styles.buyButton}>
                    <div className='flex right-0'>
                      <Image src={closedBag} width={50} height={50} alt="Close Icon"/>
                    </div>
                  </button>
                </div>
                <div>
                  <h1 className=' font-bold text-3xl ml-10 text-black mt-4'>
                    Basket
                  </h1>
                </div>
                
              </div> 
              <div className=' flex ml-28 mt-3 text-black'>
                
                <div>
                  <Image src={miniBasket} width={30} height={30} alt='minibasket'/>
                </div>
                
                <h1 className=' ml-2 text-xl'>
                  Total products:
                </h1>
                <h1 className=' ml-2 text-xl'>{basketCount}</h1>
              </div>


             
                 <div>
                 <h1>Time left: {formatTime(remainingTime)}</h1> {/* Dijital geri sayım */}
            <div className={styles.progressContainer}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
            </div>
            </div>


              <div className={`${styles.scrollContainer}`}>


                {basketItems.map((items, index) => (
                  <div key={index} className='flex flex-col justify-around'>
                    <div className='flex justify-around mt-10'>
                      <div className=" w-36 h-auto rounded-2xl   bg-white flex">
                        <div>
                          <Image src={items.img_url} alt={`Product Image ${index + 1}`} width={130} height={130} />
                        </div>
                      </div>
                      <h1 className=' font-bold text-xl mr-20 text-black'>{items.name}</h1>

                   

                    <div className=' flex flex-col'>

                      <div>
                      <h1 className='text-black'>{items.count}</h1>
                      </div>

                      <div className=' mt-5'>
                      <button key={index} onClick={() => handleDeleteFromBasket(String(items.id))} className=" p-2 rounded-full">
                        <Image src={minus} alt="Delete product" width={35} height={35} />
                      </button>
                      </div>

                      <div className=' mt-5'>
                      <button key={index} onClick={() => handleAddFromBasket(String(items.id))} className=" p-2 rounded-full">
                        <Image src={plus} alt="Delete product" width={35} height={35} />
                      </button>
                      </div>
                    
                    </div>

                      <div className=' right-0 bg-clientButtonGreen rounded-xl w-24 h-auto text-center text-black'>

                      

                        <div className='ml-3 flex gap-2 mt-7 font-semibold text-xl text-center'>
                          <h1>{items.amount}</h1>
                          <h1>₼</h1>
                        </div>
                      </div>

                
                
                    </div>
                    <hr className={styles.line} />
                  </div>
                ))}

              </div>

              <div className='flex justify-end gap-32 mt-3 mr-6 text-black'>

              <div>
    
            
    {basketId && (

      <div>
<button  className=' flex gap-5' onClick={() => handleDeleteAllBasket(basketId)}>
        <Image width={30} height={30} src={trash} alt='trash'/>
        Clear Cart
      </button>
      </div>
  
    )}


  </div>

                <div>
                  <h1 className=' text-xl font-semibold text-black'>Total:</h1>
                </div>
                <div>
                  <h1 className='text-xl font-semibold text-black'>{basketAmount}₼</h1>
                </div>
              </div>
              <div className='flex justify-end mr-5 mt-4'>
                <button onClick={()=>push('/user/checkout')} className=' bg-clientButtonGreen w-64 h-12 rounded-lg font-semibold text-xl'>Checkout</button>
              </div>
            </div>
          ) : (
            <div>
              <div className='ml-40 mt-20'>
                <Image src={emptyBag} width={300} height={300} alt="Empty Basket"/>
              </div>
              <h1 className='text-center font-bold text-6xl ml-8 mt-6 text-categorycolor'>Səbət Boşdur!</h1>
            </div>
          )}
        </div>
      </div>
      </div>
}

{isMobile &&
      <div>
      <button onClick={handleToggleMenu} className={styles.buyButton}>
        <div className=' -z-50'>
          <Image src={shoppingBag} width={55} height={55} alt="Basket Icon"/>
        </div>
        <div className=' text-white absolute ml-9 bg-mainRed w-6 h-6 rounded-full  font-semibold'>
        {basketCount}
      </div>
      </button>
  

      <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>

      <div className={`${styles.menuMob} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
        <div ref={menuRef} className={`${styles.menuMob} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
          {basketItems.length > 0 ? (
            <div>
            

              <div className=' flex'>
                <div>
                  <button onClick={handleToggleMenu} className={styles.buyButton}>
                    <div className='flex right-0'>
                      <Image src={closedBag} width={50} height={50} alt="Close Icon"/>
                    </div>
                  </button>
                </div>
                <div>
                  <h1 className=' font-bold text-3xl ml-10 text-black mt-4'>
                    Basket
                  </h1>
                </div>
                
              </div> 
              <div className={styles.totalHeader}>
                
                <div>
                  <Image src={miniBasket} width={30} height={30} alt='minibasket'/>
                </div>
                
                <h1 className=' ml-2 text-xl'>
                  Total products:
                </h1>
                <h1 className=' ml-2 text-xl'>{basketCount}</h1>
              </div>


             
                 <div className=' mt-1'>
                 <h1 className=' ml-5'>Time left: {formatTime(remainingTime)}</h1> {/* Dijital geri sayım */}
            <div className={styles.progressContainerMob}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
            </div>
            </div>


              <div className={`${styles.scrollContainerMob}`}>


                {basketItems.map((items, index) => (
                  <div key={index} className='flex flex-col justify-around'>
                    <div className='flex justify-around mt-10'>
                      <div className=" w-36 h-auto rounded-2xl   bg-white flex">
                        <div>
                          <Image src={items.img_url} alt={`Product Image ${index + 1}`} width={130} height={130} />
                        </div>
                      </div>
                      <h1 className=' font-bold text-xl mr-5 mt-7 text-black'>{items.name}</h1>

                   

                    <div className=' flex '>

                      <div>
                      <h1 className='text-black mt-7 text-2xl font-bold'>{items.count}</h1>
                      </div>

                      <div className=' mt-4'>
                      <button key={index} onClick={() => handleDeleteFromBasket(String(items.id))} className=" p-2 rounded-full">
                        <Image src={minus} alt="Delete product" width={70} height={70} />
                      </button>
                      </div>

                      <div className='mt-4'>
                      <button key={index} onClick={() => handleAddFromBasket(String(items.id))} className=" p-2 rounded-full">
                        <Image src={plus} alt="Delete product" width={70} height={70} />
                      </button>
                      </div>
                    
                    </div>

                      <div className={styles.priceButton}>

                      

                        <div className='ml-1 flex gap-1 mt-1 font-semibold text-xl text-center'>
                          <h1>{items.amount}</h1>
                          <h1>₼</h1>
                        </div>
                      </div>

                
                
                    </div>
                    <hr className={styles.line} />
                  </div>
                ))}

              </div>

              <div className='flex justify-end gap-9 mt-8 mr-6 text-black'>

              <div>
    
            
    {basketId && (

      <div>
<button  className=' flex mt-1 ' onClick={() => handleDeleteAllBasket(basketId)}>
        <Image width={30} height={30} src={trash} alt='trash'/>
        Təmizlə
      </button>
      </div>
  
    )}


  </div>

                <div>
                  <h1 className=' text-xl font-semibold text-black'>Cəmi məbləğ:</h1>
                </div>
                <div>
                  <h1 className='text-xl font-semibold text-black'>{basketAmount}₼</h1>
                </div>
              </div>
              <div className='flex justify-center mr-1 mt-4'>
                <button onClick={()=>push('/user/checkout')} className={styles.chcekoutButton}>Ödənişə keç</button>
              </div>
            </div>
          ) : (
            <div>
                   <button onClick={handleToggleMenu} className={styles.buyButton}>
                    <div className='flex right-0'>
                      <Image src={closedBag} width={50} height={50} alt="Close Icon"/>
                    </div>
                  </button>
              <div className='ml-14 mt-6'>
                <Image src={emptyBag} width={250} height={250} alt="Empty Basket"/>
              </div>
              <h1 className='text-center font-bold text-5xl  mt-6 text-categorycolor'>Səbət Boşdur!</h1>
            </div>
          )}
        </div>
      </div>
      </div>
}
    </>
  );
};

export default BasketMenu;
