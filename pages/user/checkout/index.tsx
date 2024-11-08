import React, { useEffect, useState,useContext, createContext,useReducer } from 'react'
import Categories from '../../../Shared/Components/Client/headerCategory'
import withClientAuth from '../../../Shared/HOC/withClienAuth';
import styleds from 'styled-components';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Nav from '../../../Shared/Components/Client/Nav/Nav';
import BasketMenu from '../../../Shared/Components/sliderBasket/sliderBasket';
import Auth from '../../../Shared/Components/Client/Auth/Auth';
import styles from './checkout.module.css';
import Navbar from '../../../Shared/Components/Client/User-Layout';
import { useDispatch, useSelector } from 'react-redux';
import userProfileIcon from '../../../public/userProfileIcon.svg'
import basket from '../../../public/basketicon.png'
import logoutSvg from '../../../public/logout (1).png'
import LogoutIcon from '../../../public/logout (2).png'
import LogoutIcon2 from '../../../public/exit.png'
import checkoutSvg from '../../../public/checkout.png'
import basketDef from '../../../public/basketDef.png'
import profileSettings from '../../../public/profileSettings.png'
import orderSvg from '../../../public/order.png'
import userProfileDef from '../../../public/user.png'
import emptyBag from '../../../public/Emptybasket (1).png';

import shoppingBag from '../../../public/shopping-bag.png'
import ShoppingCheck from '../../../public/ShoppingCheck3.png'
import YourOrders from '../../../public/fulfillment.png'
import { LifeBuoy, Receipt, Boxes, Package, UserCircle,BarChart3, LayoutDashboard, Settings } from 'lucide-react';
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import Sidebar, { SidebarItem } from '../../../Shared/Components/Client/SideBarMenu';
import { AppDispatch, RootState } from '../../../Shared/Redux/Store/store';
import { clearUser, setUser, UserState } from '../../../Shared/Redux/Featuries/User/userSlice';
import { useResize } from '../../../Shared/Hooks/useResize';
import { useToast } from '@chakra-ui/react';
import Image from "next/image";

import WhatsAppButton from "../../../Shared/Components/Client/whatsappButton";
import TelegramButton from "../../../Shared/Components/Client/telegramButton";
import minus from "../../../public/minus-circle.png";
import plus from "../../../public/plus (3).png";
import {addToBasket, BasketItem, deleteFromBasket, fetchBasket} from "../../../Shared/Redux/Featuries/basketSlice/basketSlice";
import ProductPageCount from '../../../Shared/Components/Client/productPageCount';
import SimpleForm from '../../../Shared/Components/Client/CheckoutForm';
import OverlayPayment from '../../../Shared/Components/Client/OverlayPaymentScreen';
import { OrderPostDataType } from '../../../Shared/Interface';
import { UserAuth } from '../../../Shared/Context';
import { addRecord, fetchRecords, RecordsPostDataType } from '../../../Shared/Redux/Featuries/recordSlice/recordSlice';
import { AddRecords } from '../../../Services';
import TryInfoUser from '../../../Shared/Components/Client/tryInfoUserComponent';
import HamburgerBtn from '../../../Shared/Components/Client/hamburgerButton';
import Footer from '../../../Shared/Components/Client/Footer';




const SidebarContext = createContext(null);

// Styled Components
const Container = styleds.div`
  background: linear-gradient(135deg, #7f00ff, #e100ff);
  font-family: Arial, sans-serif;
`;

const Header = styleds.header`
  background: linear-gradient(135deg, #7f00ff, #e100ff);
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainSection = styleds.section`
  position: relative;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;

`;

const Curve = styleds.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 99%;
  background: #7f00ff;
  clip-path: ellipse(80% 50% at 50% 0%);
`;

const theme = createTheme();
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    width: '16px', // Boyutu artırdık
    height: '16px', // Boyutu artırdık
    borderRadius: '50%',
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '16px',
      height: '16px',
      borderRadius: '20px',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const StyledBadge2 = styled(Badge)`
  & .MuiBadge-badge {
    background-color: red;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.background.paper};
  }
  @keyframes ripple {
    0% {
      transform: scale(.8);
      opacity: 1;
    }
    100% {
      transform: scale(2.4);
      opacity: 0;
    }
  }
`;

const LargeAvatar = styled(Avatar)({
  width: 100,
  height: 100,
});


const initialState = {
  address: '',
  phoneNumber: '+994',
  error: '',
  formatMessage: '',
  errorNumber: '',
  formatNumber: '',
}


type OrderState = {
  id: string,
  created: number | string,
  delivery_address: string | number,
  contact: number,
  payment_method: string
}

type BasketProps = {
  productCount?: number;
  data_list?: string[],
  size: string
}



const reducer = (state:any, action:any) => {
  switch (action.type) {
      case "SET_ADDRESS":
          return { ...state, address: action.payload };
      case "SET_PHONE_NUMBER":
          return { ...state, phoneNumber: action.payload };
      case "SET_ERROR":
          return { ...state, error: action.payload };
      case "SET_FORMAT_MESSAGE":
          return { ...state, formatMessage: action.payload };
      case "SET_ERROR_NUMBER":
          return { ...state, errorNumber: action.payload };
      case "SET_FORMAT_NUMBER":
          return { ...state, formatNumber: action.payload };

      default:
          return state;
  }
}

const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
const azerbaijanPhoneRegex = /^\+994-(50|51|55|60|70|77|99)-\d{3}-\d{2}-\d{2}$/;

const formatPhoneNumber = (value:any) => {
  const digits = value.replace(/[^\d]/g, '').substring(3);
  let formatted = '+994';

  if (digits.length > 2) {
      formatted += '-' + digits.substring(0, 2);
  } else {
      formatted += '-' + digits;
  }
  if (digits.length > 5) {
      formatted += '-' + digits.substring(2, 5);
  } else if (digits.length > 2) {
      formatted += '-' + digits.substring(2);
  }
  if (digits.length > 7) {
      formatted += '-' + digits.substring(5, 7);
  } else if (digits.length > 5) {
      formatted += '-' + digits.substring(5);
  }
  if (digits.length > 9) {
      formatted += '-' + digits.substring(7, 9);
  } else if (digits.length > 7) {
      formatted += '-' + digits.substring(7);
  }

  return formatted;
};


type Basket = {
  data: {
    items: Array<{
      id: number | string;
      name: string;
      ageSize?: string;
      price: number;
    }>;
    total_count: number;
    total_amount: number;
  };
};


export default function index() {
  


    const dispatchh: AppDispatch = useDispatch();

    const basket:Basket = useSelector((state: RootState) => state.basket);

  const user = useSelector((state: RootState) => state.user);
console.log("basket",basket);

console.log("user",user);



    const basketItems = basket?.data?.items || [];
    
    const basketCountt = basketItems.map((item) => {
      console.log("itemler",item);
      
        if (item.ageSize === "1") {
            return 30;
        } else if (item.ageSize === "2") {
            return 60;
        } else {
            return 0;
        }
    });
    console.log("basketCountt",basketCountt)

  let { isMobile } = useResize();
  const toast = useToast()

  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchw: AppDispatch = useDispatch();

  useEffect(() => {
    let userStr = localStorage.getItem("user_info");
    if (userStr) {
      try {
          const user: UserState = JSON.parse(userStr);
          dispatchw(setUser(user));
      } catch (error) {
          console.error("Kullanıcı bilgisi parse edilirken hata oluştu:", error);

      }
  }
}, []);

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [paymentScreen, setPaymentScreen] = useState(false)
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number>(4);
  const { push } = useRouter();
  const [downloadURL, setDownloadURL] = useState(''); 
  const [loading, setLoading] = useState(false);
    const [isRectVisiblee, setIsRectVisiblee] = useState(false);
    const [isRectVisiblee2, setIsRectVisiblee2] = useState(false);


    const { isRectVisible, isRectVisible2 } = useSelector((state: RootState) => state.buttonVisibility);

  const [mobile, setmobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const basketCount = basket?.data?.total_count; 
  const basketAmount = basket?.data?.total_amount;


  const basketId = basket?.data;

  const basketIdData = (basketId as any)?.id ?? ""; 

console.log("basketIdData",basketIdData);





    useEffect(() => {
        dispatch(fetchBasket());
    }, [dispatch]);

  const handleChange = (e:any) => {
    const value = e.target.value;
    dispatch({ type: "SET_ADDRESS", payload: value });

    if (!addressRegex.test(value)) {
        dispatch({ type: "SET_ERROR", payload: "Yanlış adres formatı!" });
        dispatch({ type: "SET_FORMAT_MESSAGE", payload: "Örnək format: Ataturk Ganclik Baku 45" });
  

    } else {
        dispatch({ type: "SET_ERROR", payload: '' });
        dispatch({ type: "SET_FORMAT_MESSAGE", payload: '' });
    }

}


const handleToggle = () => {
  setIsRectVisiblee2(true);
  setIsRectVisiblee(false);
};

const handleToggle2 = () => {
  setIsRectVisiblee(true);
  setIsRectVisiblee2(false);
};


const handleChange1 = (event:any) => {
    let value = event.target.value;

    if (!value.startsWith('+994')) {
        value = '+994' + value.replace(/^\+994/, '');
    }

    const formattedValue = formatPhoneNumber(value);

    dispatch({ type: 'SET_PHONE_NUMBER', payload: formattedValue });

    if (formattedValue === '+994' || formattedValue === '+994-' || azerbaijanPhoneRegex.test(formattedValue)) {
        dispatch({ type: "SET_ERROR_NUMBER", payload: '' });
        dispatch({ type: "SET_FORMAT_NUMBER", payload: '' });
    } else {
        dispatch({ type: "SET_ERROR_NUMBER", payload: "Azerbaycan nömresi girməlisiz!" });
        dispatch({ type: "SET_FORMAT_NUMBER", payload: "Örnək: +994-55-555-55-55" });
    }
};

const authContext = UserAuth();
const logOut = authContext?.logOut;

const handleSignout = async () => {
  try {
    if (logOut) {
      await logOut();
      console.log("Logout successful...");
    } else {
      console.error("logOut function is undefined");
    }
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
  

    if (window.innerWidth < 800) {
      setmobile(true);
    } else {
      setmobile(false);
    }
    const token = localStorage.getItem('access_token');
    const userInfo = localStorage.getItem('user_info');
    if (!token) {
  
      push('/login-register');
    }
  

    if (token && userInfo) {
      setIsLoggedIn(true);
    }
  }, [mobile]);



//   const handleCheckout = async () => {
//     if (!user) {
//         toast({
//             title: "Please log in to add products to the basket",
//             status: 'error',
//             duration: 2000,
//             isClosable: true,
//             position: 'top-right',
//             variant: 'subtle'
//         });
//         return;
//     }


//     // records data add

// const RecordsData: RecordsPostDataType = {
//     user_id: user.id ?? "",
//     basket_id: basketIdData,
//     contact: user.phoneNumber,
//     delivery_address: user.address ?? '',
//     fullname: user.fullname,
//     payment_method: isRectVisiblee2 ? 'Bank Kartlı ilə ödəmə' : "Qapida ödəmə",
//     email: user.email,
//     id: "", // veya uygun bir değer
//     date: new Date().toISOString(), // Tarih bilgisi, örneğin şu anki zaman
//     amount: basketAmount ?? 0, // veya sepet miktarı
//     created: new Date().toISOString(), // Oluşturulma tarihi
//     price: 0 // veya uygun bir fiyat değeri
// };

//     setPaymentScreen(true);



//     dispatchw(addRecord(RecordsData)).then((action) => {
//       if (action.type === addRecord.rejected.type) {
       
//           toast({
//               title: "Failed to add product to the basket",
//               status: 'error',
//               duration: 2000,
//               isClosable: true,
//               position: 'top-right',
//               variant: 'subtle'
//           });
//       } else {
//           dispatch(fetchRecords());  // Sepeti güncellemek için
//           toast({
//               title: "Product added to the basket successfully!",
//               status: 'success',
//               duration: 2000,
//               isClosable: true,
//               position: 'top-right',
//               variant: 'subtle'
//           });
//       }
//   });
// };





    return (
   <>


   {!isMobile &&
   <div>
     <Container>
        <Header>
          <div className={styles.cursor}>
            <img
              onClick={() => push('/')}
              style={{ width: '90px', height: '90px' }}
              className={styles.logo}
              src="/Logo.png"
              alt="Logo"
            />
          </div>
          <Nav />

          <div className="flex gap-10 z-50">
                        <BasketMenu/>
                        <Auth/>
                        </div>
        </Header>


        
      </Container>

      <Categories/>


       <div className='flex gap-11 justify-between'>


           <Sidebar>
               <SidebarItem
                   icon={<img src="/userProfileIcon.svg" alt="Profile" width={39} height={39}/>}
                   text="Your Profile"
                   active={activeIndex === 1}
                   onClick={() => push('/user/profile')}
               />
               <SidebarItem
                   icon={<img src="/shopping-bag.png" alt="Basket" width={39} height={39}/>}
                   text="Your Basket"
                   active={activeIndex === 2}
                   onClick={() => push('/user/basket')}
               />
               <SidebarItem
                   icon={<img src="/fulfillment.png" alt="Orders" width={39} height={39}/>}
                   text="Your Orders"
                   active={activeIndex === 3}
                   onClick={() => push('/user/orders')}
               />
               <SidebarItem
                   icon={<img src="/ShoppingCheck3.png" alt="Checkout" width={39} height={39}/>}
                   text="Checkout"
                   active={activeIndex === 4}
                   onClick={() => push('/user/checkout')}
               />
               <SidebarItem
                   icon={<img src="/exit.png" alt="Logout" width={39} height={39}/>}
                   text="Logout"
                   active={activeIndex === 5}
                   onClick={() => {
                       push('/')
                       localStorage.removeItem("user_info")
                       localStorage.removeItem("access_token")
                       handleSignout()
                       setUser(null);
                       dispatch(clearUser());

                   }}
               />
           </Sidebar>



           {basketItems.length > 0 ? (

           <div className=" bg-cardColor w-5/12  mr-5 absolute ml-96 mt-16 rounded-xl">








               <h1 className='ml-6 font-bold text-grayText2 '></h1>


               
               <SimpleForm/>



               {/* <div className="flex ml-6 ">
                
                   <button onClick={handleToggle}>
                       <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                           <rect x="0.5" y="0.5" width="29" height="29" rx="14.5"
                                 fill="white" stroke="#6FCF97"/>
                           {isRectVisiblee2 &&
                               <rect x="8" y="8" width="15" height="15" rx="7.5"
                                     fill="#6FCF97"/>}
                       </svg>
                   </button>
                   <h1 className={`ml-2 ${isRectVisiblee2 ? 'text-textColorGreen' : ''}`}>Bank Kartlı ilə ödəmə</h1>


                   <button className=' ml-16' onClick={handleToggle2}>
                       <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                           <rect x="0.5" y="0.5" width="29" height="29" rx="14.5"
                                 fill="white" stroke="#6FCF97"/>
                           {isRectVisiblee &&
                               <rect x="8" y="8" width="15" height="15" rx="7.5"
                                     fill="#6FCF97"/>}
                       </svg>
                   </button>
                   <h1 className={`ml-2 ${isRectVisiblee ? 'text-textColorGreen' : ''}`}>Qapida ödəmə</h1>
               </div> */}

               <div className='flex items-center justify-center mt-10'>

                   {/* <button
                      className={`w-11/12 h-11 ${(isRectVisiblee || isRectVisiblee2) && basketId?.items?.length > 0  ? 'bg-textColorGreen' : 'bg-overlayColorGreen'} text-white rounded-sm`}
                      onClick={handleCheckout}
                      disabled={!((isRectVisiblee || isRectVisiblee2) && basketId?.items?.length  > 0)}
                   >
                      Checkout
                   </button> */}



               </div>

           </div>):(
     <div>
     <div className='ml-10 mt-6'>
       <Image src={emptyBag} width={290} height={300} alt="Empty Basket"/>
     </div>
     <h1 className='text-center font-bold text-6xl  mt-6 text-categorycolor'>Səbət Boşdur!</h1>
   </div>

)}
           <ProductPageCount/>


     


       </div>


       
       {/* <div>
            {paymentScreen?<OverlayPayment/>:'' }
           </div> */}

           </div>
    }




  {isMobile &&
    <div>
<Container>

<div className='  absolute '>
          <TryInfoUser/>
          </div>


  <div className="  ">
      {isMobile && (
      <div className={styles.hambrBtn}>
        <HamburgerBtn />
      </div>
    )}
    </div>

    
        <Header>
          <div className={styles.cursor}>
            <img
              onClick={() => push('/')}
              style={{ width: '90px', height: '90px' }}
              className={styles.logo}
              src="/Logo.png"
              alt="Logo"
            />
          </div>
    

          <div className="flex gap-4 z-50">
                        <BasketMenu/>
                        <Auth/>
                        </div>
        </Header>


        
      </Container>

      <Categories/>

 
      <div>
       <ProductPageCount/>
       </div>

       <div className='flex gap-11 justify-between'>


     
       {basketItems.length > 0 ? (

           <div className=" bg-cardColor w-11/12  ml-4 mt-12">




               <h1 className='ml-6 font-bold text-grayText2 '></h1>

               {/* <div className="flex ml-6 ">
                
                   <button onClick={handleToggle}>
                       <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                           <rect x="0.5" y="0.5" width="29" height="29" rx="14.5"
                                 fill="white" stroke="#6FCF97"/>
                           {isRectVisiblee2 &&
                               <rect x="8" y="8" width="15" height="15" rx="7.5"
                                     fill="#6FCF97"/>}
                       </svg>
                   </button>
                   <h1 className={`ml-2 ${isRectVisiblee2 ? 'text-textColorGreen' : ''}`}> Payment by card </h1>


                   <button className=' ml-16' onClick={handleToggle2}>
                       <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                           <rect x="0.5" y="0.5" width="29" height="29" rx="14.5"
                                 fill="white" stroke="#6FCF97"/>
                           {isRectVisiblee &&
                               <rect x="8" y="8" width="15" height="15" rx="7.5"
                                     fill="#6FCF97"/>}
                       </svg>
                   </button>
                   <h1 className={`ml-2 ${isRectVisiblee ? 'text-textColorGreen' : ''}`}>Payment via terminal</h1>
               </div> */}

                    <SimpleForm/>




               <div className='flex items-center justify-center mt-16'>




                   {/* <button
                      className={`w-11/12 h-11 ${(isRectVisiblee || isRectVisiblee2) && basketId?.items?.length > 0  ? 'bg-textColorGreen' : 'bg-overlayColorGreen'} text-white rounded-sm`}
                      onClick={handleCheckout}
                      disabled={!((isRectVisiblee || isRectVisiblee2) && basketId?.items?.length  > 0)}
                   >
                      Checkout
                   </button> */}

               </div>




           </div>):(
<div>
<div className='ml-16 mt-6'>
  <Image src={emptyBag} width={290} height={300} alt="Empty Basket"/>
</div>
<h1 className='text-center font-bold text-5xl ml-14 mt-6 text-categorycolor'>Səbət Boşdur!</h1>
</div>
)}
   

     


       </div>

         
       <div className='mt-14'>
</div>

{/* 
          <div>
            {paymentScreen?<OverlayPayment/>:'' }
           </div> */}
    </div>
}
<Footer/>
   </>
    )
}
