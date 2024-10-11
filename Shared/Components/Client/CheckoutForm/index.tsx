import React, { useEffect, useReducer, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@chakra-ui/react';
import style from './checkForm.module.css';
import { fetchBasket } from '../../../Redux/Featuries/basketSlice/basketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/Store/store';
import { setUser, UserState } from '../../../Redux/Featuries/User/userSlice';

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

const initialValues: FormValues = {
  phoneNumber: '',
  address: '',
};

const SimpleForm: React.FC = () => {
  const dispatchh: AppDispatch = useDispatch();

  const [initialValues, setInitialValues] = useState<FormValues>({
    phoneNumber: '',
    address: ''
});

  const basket = useSelector((state: RootState) => state.basket);

  const user = useSelector((state: RootState) => state.user);

  const [reducerState, dispatch] = useReducer(reducer, initialState);


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



  const { div, inpdiv } = style;

  return (
    <div>
            <div className=' flex flex-col'>
      <Formik
  initialValues={{
    phoneNumber: user.phoneNumber || '',
    address: user.address || '',
  }}
  validationSchema={validationSchema}
  onSubmit={onSubmit}
>
  {({ handleChange, values, setFieldValue }) => (
      
    <Form>
  

    
      <div className=' mt-6 ml-6'>
     
          <label className='text-grayText2 font-bold' htmlFor="phoneNumber">Phone Number</label>
          <Field
  type="text"
  id="phoneNumber"
  name="phoneNumber"
  value={values.phoneNumber} 
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFieldValue('phoneNumber', formattedPhone);
  }}
  placeholder="+994"
  className='w-11/12 h-14 p-5 rounded-md'
/>


          <ErrorMessage name="phoneNumber" component="div" className="text-mainRed" />
    

 
          <label className=' mt-10' htmlFor="address">Address</label>
          <Field
            type="text"
            id="address"
            name="address"
            value={values.address}
            onChange={handleChange} 
            placeholder="Enter your address"
         className='w-11/12 h-14 p-5 rounded-md'
          />
          <ErrorMessage name="address" component="div" className="text-mainRed" />
      

      </div>

    </Form>
    
  )}
</Formik>
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
