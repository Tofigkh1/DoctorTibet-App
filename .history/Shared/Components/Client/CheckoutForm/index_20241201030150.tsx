import React, { useEffect, useReducer, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@chakra-ui/react';
import style from './checkForm.module.css';
import { fetchBasket } from '../../../Redux/Featuries/basketSlice/basketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/Store/store';
import { setUser, UserState } from '../../../Redux/Featuries/User/userSlice';
import { addRecord, fetchRecords, RecordsPostDataType } from '../../../Redux/Featuries/recordSlice/recordSlice';
import OverlayPayment from '../OverlayPaymentScreen';

interface FormValues {
  phoneNumber: string;
  address: string;
}

const initialState = {
  address: '',
  phoneNumber: '+994',
  error: '',
  formatMessage: '',
  errorNumber: '',
  formatNumber: '',
};

type OrderState = {
  id: string;
  created: number | string;
  delivery_address: string | number;
  contact: number;
  payment_method: string;
};

type BasketProps = {
  productCount?: number;
  data_list?: string[];
  size: string;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_ADDRESS':
      return { ...state, address: action.payload };
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_FORMAT_MESSAGE':
      return { ...state, formatMessage: action.payload };
    case 'SET_ERROR_NUMBER':
      return { ...state, errorNumber: action.payload };
    case 'SET_FORMAT_NUMBER':
      return { ...state, formatNumber: action.payload };

    default:
      return state;
  }
};

const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
const azerbaijanPhoneRegex = /^\+994-(50|51|55|60|70|77|99)-\d{3}-\d{2}-\d{2}$/;

const formatPhoneNumber = (value: any) => {
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

// Validation Schema
const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\+994\d{9}$/, 'Phone number must start with +994 and have 9 additional digits')
    .required('Phone number is required'),
  address: Yup.string().required('Address is required'),
});


// const initialValues: FormValues = {
//   phoneNumber: '',
//   address: '',
// };

interface FormValues {
  phoneNumber: string;
  address: string;
}

const SimpleForm: React.FC = () => {
  const dispatchh: AppDispatch = useDispatch();

  const [initialValues, setInitialValues] = useState<FormValues>({
    phoneNumber: '',
    address: ''
});

// discount_total


  const basket = useSelector((state: RootState) => state.basket);
  console.log("basket",basket);
  

  const user = useSelector((state: RootState) => state.user);

  const [reducerState, dispatch] = useReducer(reducer, initialState);
  const [isRectVisiblee, setIsRectVisiblee] = useState(false);
  const [isRectVisiblee2, setIsRectVisiblee2] = useState(false);
  const [paymentScreen, setPaymentScreen] = useState(false)

  const basketCount = basket?.data?.total_count; 
  const basketAmount = basket?.data?.total_amount;
  const discount_total = basket?.data?.discount_total;


  const basketId = basket?.data;

  const basketIdData = (basketId as any)?.id ?? ""; 


  const dispatchw: AppDispatch = useDispatch();


  const initialValuess: FormValues = {
    phoneNumber: user.phoneNumber || '',
    address: user.address || ''
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user_info");
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
            dispatch(setUser(parsedUser));
            setInitialValues({
                phoneNumber: parsedUser.phoneNumber || '',
                address: parsedUser.address || ''
            });
        }
    }
}, [dispatch]);

useEffect(() => {
    let userStr = localStorage.getItem("user_info");
    if (userStr) {
      try {
        const user: UserState = JSON.parse(userStr);
        dispatch(setUser(user));
    } catch (error) {
        console.error("Kullanıcı bilgisi parse edilirken hata oluştu:", error);

    }
    }
}, [dispatchh]);


  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: 'SET_ADDRESS', payload: value });
  
    if (!addressRegex.test(value)) {
      dispatch({ type: 'SET_ERROR', payload: 'Yanlış adres formatı!' });
      dispatch({ type: 'SET_FORMAT_MESSAGE', payload: 'Örnək format: Ataturk Ganclik Baku 45' });
    } else {
      dispatch({ type: 'SET_ERROR', payload: '' });
      dispatch({ type: 'SET_FORMAT_MESSAGE', payload: '' });
    }
  };
  

  const handleChange1 = (event: any) => {
    let value = event.target.value;

    if (!value.startsWith('+994')) {
      value = '+994' + value.replace(/^\+994/, '');
    }

    const formattedValue = formatPhoneNumber(value);

    dispatch({ type: 'SET_PHONE_NUMBER', payload: formattedValue });

    if (formattedValue === '+994' || formattedValue === '+994-' || azerbaijanPhoneRegex.test(formattedValue)) {
      dispatch({ type: 'SET_ERROR_NUMBER', payload: '' });
      dispatch({ type: 'SET_FORMAT_NUMBER', payload: '' });
    } else {
      dispatch({ type: 'SET_ERROR_NUMBER', payload: 'Azerbaycan nömresi girməlisiz!' });
      dispatch({ type: 'SET_FORMAT_NUMBER', payload: 'Örnək: +994-55-555-55-55' });
    }
  };

  const toast = useToast();
  const [state, setState] = useState({
    error: '',
    formatMessage: '',
    errorNumber: '',
    formatNumber: '',
  });

  const onSubmit = (values: FormValues) => {
    // Submit işlemi burada
    console.log('Form submitted:', values);
    toast({
      title: 'Form submitted successfully',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };
  const handleToggle = () => {
    setIsRectVisiblee2(true);
    setIsRectVisiblee(false);
  };
  
  const handleToggle2 = () => {
    setIsRectVisiblee(true);
    setIsRectVisiblee2(false);
  };


  const { div, inpdiv } = style;


  
  const handleCheckout = async (values: FormValues) => {
    const RecordsData = {
      id: "",
      user_id: user.id ?? "",
      basket_id: basketIdData,
      contact: values.phoneNumber, // User's input value
      delivery_address: values.address, // User's input value
      fullname: user.fullname,
      payment_method: 'Bank Kartlı ilə ödəmə', // Replace with actual method
      email: user.email,
      date: new Date().toISOString(),
      amount: basketAmount ?? 0,
      created: new Date().toISOString(),
      price: 0,
    };

    setPaymentScreen(true);
    
    const action = await dispatchw(addRecord(RecordsData));
    if (action.type === addRecord.rejected.type) {
      toast({
        title: "Failed to add product to the basket",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      dispatchw(fetchRecords());
      toast({
        title: "Product added to the basket successfully!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };


  return (
    <div>
            <div className=' flex flex-col'>

           <Formik
          initialValues={initialValuess}
          validationSchema={validationSchema}
          onSubmit={handleCheckout}
        >
          {({ handleChange, values }) => (
            <Form>
              <div className='mt-12 ml-6 flex flex-col'>
                <label className='text-grayText2 font-bold' htmlFor="phoneNumber">Phone Number</label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  placeholder="+994"
                  className={style.customInput} // style.customInput yerine doğrudan className
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-mainRed" />

                <label className='mt-10 text-grayText2 font-bold' htmlFor="address">Address</label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className={style.customInput}
                />
                <ErrorMessage name="address" component="div" className="text-mainRed" />
              </div>

             <button
                      className={`w-11/12 h-11 ml-5 mt-14 ${(isRectVisiblee || isRectVisiblee2) && basketId?.items?.length > 0  ? 'bg-textColorGreen' : 'bg-overlayColorGreen'} text-white rounded-sm`}
                     type="submit"
                      disabled={!((isRectVisiblee || isRectVisiblee2) && basketId?.items?.length  > 0)}
                   >
                      Checkout
                   </button>
            </Form>
          )}
        </Formik>



                   <h1 className='ml-6  font-bold text-grayText2 '></h1>
                   {/* <button
                      className={`w-11/12 h-11 ml-5 mt-14 ${(isRectVisiblee || isRectVisiblee2) && basketId?.items?.length > 0  ? 'bg-textColorGreen' : 'bg-overlayColorGreen'} text-white rounded-sm`}
                      onClick={handleCheckout}
                      disabled={!((isRectVisiblee || isRectVisiblee2) && basketId?.items?.length  > 0)}
                   >
                      Checkout
                   </button> */}


                   <div className="flex ml-6 mt-12 ">
                
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
            </div>


            <div>
            {paymentScreen?<OverlayPayment/>:'' }
           </div>

</div>
      {reducerState.error && <span className="text-mainRed">{reducerState.error}</span>}
      <br />
      {reducerState.formatMessage && <span className="text-green">{reducerState.formatMessage}</span>}
      <br />
      {reducerState.errorNumber && <span className="text-mainRed">{reducerState.errorNumber}</span>}
      <br />
      {reducerState.formatNumber && <span className="text-green">{reducerState.formatNumber}</span>}
</div>



  );
};

export default SimpleForm;
