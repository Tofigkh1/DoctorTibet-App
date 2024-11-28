import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './registerForm.module.css';
import RegisterInp from '../registerInp';
import LoginInp from '../loginInp';
import Spiner from '../../Spiner';
import { useToast } from '@chakra-ui/react';
import { postSignUp } from '../../../../../Services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store/store';
import { UserAuth } from '../../../../Context';
import {FcGoogle} from 'react-icons/fc'
import {signIn, signOut} from 'next-auth/react'

interface RegisterFormValues {
  fullname: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
};

const initialValues: RegisterFormValues = {
  fullname: '',
  username: '',
  email: '',
  password: '',
  phoneNumber: '',
};

interface Props {
  setsingin: any;
  initialEmail?: string;
}

const RegisterForm = (props: Props) => {
  const { setsingin, initialEmail = '' } = props;
  const toast = useToast();
  const user = useSelector((state: RootState) => state.user);
  let [Loading, setLoading] = useState(false);
  const [phoneNumberr, setPhoneNumber] = useState('+994'); // +994 örnek olarak seçildi

  const auth = UserAuth();
  const { useer, googleSignIn } = auth || { useer: null, googleSignIn: () => {} };

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    fullname: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address'), // Email artık zorunlu değil
    password: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'), // Telefon numarası zorunlu
  });

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setLoading(true);
  
      // Email alanını opsiyonel olarak backend'e gönder
      const formValues = {
        ...values,
        email: values.email ? values.email : undefined, // Email boşsa backend'e göndermiyoruz
        phoneNumber: phoneNumberr, // Telefon numarasını manuel olarak dahil et
      };
  
      await postSignUp(formValues); // Güncellenmiş form verilerini gönder
      console.log('formValues', formValues);
  
      toast({
        title: `Uğurla qeydiyyatdan keçdiniz!`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        variant: 'subtle',
      });
    } catch (err) {
      console.log(err);
  
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
  
      toast({
        title: errorMessage,
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        variant: 'subtle',
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  console.log("phoneNumber",phoneNumberr);
  

  return (
    <div>
  <button onClick={handleSignIn} className={styles.googleSignInButton}>
  <FcGoogle className={styles.googleIcon} />
  Sign up with Google
</button>

{/* 
<div className="flex  items-center  ml-8 bg-slate-50 mt-14">
      <div
        className="flex h-auto w-64 cursor-pointer items-center rounded-md border "
        onClick={signIn}
        >
            <FcGoogle fontSize={30} className="mr-2" />
            <span>Sign in with Google</span>
     </div>
    </div> */}



      <Formik
        initialValues={{ ...initialValues, email: initialEmail }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className={styles.form}>
            <RegisterInp title="Ad soyad" icon={true} name='fullname' />
            <RegisterInp title="istifadəçi adı" icon={true} name='username' />
            <LoginInp name='email' title="E-mail" icon={true} type='email' />
            <div className={styles.phoneInputContainer}>
              <h1 className=' text-xl font-semibold text-inpColor'>Telefon nömrəsi</h1>
            <PhoneInput
  country={'az'}
  value={phoneNumberr}
  onChange={(phone) => {
    const formattedPhone = `+${phone}`;
    setPhoneNumber(formattedPhone);
    setFieldValue('phoneNumber', formattedPhone);
  }}
  inputProps={{
    name: 'phoneNumber',
    required: true,
    autoFocus: true
  }}
  containerStyle={{
    width: '100%',
    backgroundColor: '#f0f4f8', // Arka plan rengi
  }}
  inputStyle={{
    width: '100%',
    height: '69px',
    color: '#333', // Yazı rengi
    backgroundColor: '#FFE7E7', // Giriş kutusu arka plan rengi
    borderRadius: '8px', // Köşeleri yuvarlat
    border: '1px solid #ddd', // Kenarlık rengi
  }}
  buttonStyle={{
    backgroundColor: '#FFE7E7',
    color: '#fff', // Buton yazı rengi
    border: 'none',
  }}
  dropdownStyle={{
    backgroundColor: '#fff', // Açılır menü arka plan rengi
    color: '#333', // Açılır menü yazı rengi
    position: 'absolute',

  }}
/>

            </div>
            <LoginInp name='password' title="Şifrə" icon={false} type='password' />

         

            <button
              className={styles.button}
              type="submit"
              disabled={isSubmitting}
              style={Loading ? { cursor: "not-allowed" } : { cursor: 'pointer' }}
            >
              {Loading ? <Spiner /> : `Register`}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
