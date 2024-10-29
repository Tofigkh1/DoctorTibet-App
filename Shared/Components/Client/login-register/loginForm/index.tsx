import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './loginForm.module.css';
import { useRouter } from 'next/router';
import LoginInp from '../loginInp';
import Spiner from '../../Spiner';
import { Post } from '../../../../../server/helper/reguests';
import { useToast } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../Redux/Store/store';
import { setUser } from '../../../../Redux/Featuries/User/userSlice';
import { UserAuth } from '../../../../Context';
import { FaGoogle } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const phoneRegExp = /^\+?[1-9]\d{1,14}$/;

interface SignInFormValues {
  phoneNumber: string;
  password: string;
}

const initialValues: SignInFormValues = {
  phoneNumber: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const auth = UserAuth();
  const { useer, googleSignIn } = auth || { useer: null, googleSignIn: () => {} };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Invalid phone number format')
      .required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values: SignInFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      setLoading(true);
      const res = await Post(values, `auth/signin`);
      setLoading(false);
      console.log(res);

      localStorage.setItem("access_token", res.user.access_token);
      localStorage.setItem("user_info", JSON.stringify(res.user));
      dispatch(setUser(res.user));

      toast({
        title: `Signed in successfully!`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        variant: 'subtle'
      });
      router.push('/');
    } catch (err) {
      setLoading(false);
      toast({
        title: `Phone number or password is incorrect`,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        variant: 'subtle'
      });
    }
    setSubmitting(false);
  };

  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true);
      const signInResult = await googleSignIn();
      setLoading(false);

      if (useer) {
        const accessToken = await useer?.getIdToken();
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("user_info", JSON.stringify(useer));
        dispatch(setUser(useer));

        toast({
          title: `Signed in successfully!`,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
          variant: 'subtle'
        });
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: `Google sign-in failed`,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        variant: 'subtle'
      });
    }
  };

  return (
    <div>
      <button onClick={handleSignInWithGoogle} className={styles.googleSignInButton}>
        <FaGoogle className={styles.googleIcon} />
        Sign up with Google
      </button>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className={styles.form}>
            <h1 className=' text-xl font-semibold text-inpColor'>Phone Number</h1>
            <PhoneInput
              country={'az'}
              onChange={(phone) => {
                const formattedPhone = `+${phone}`;
                setFieldValue('phoneNumber', formattedPhone);
              }}
              inputProps={{
                name: 'phoneNumber',
                required: true,
                autoFocus: true,
              }}
              containerStyle={{
                width: '100%',
                backgroundColor: '#f0f4f8',
              }}
              inputStyle={{
                width: '100%',
                height: '69px',
                color: '#333',
                backgroundColor: '#FFE7E7',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
              buttonStyle={{
                backgroundColor: '#FFE7E7',
                color: '#fff',
                border: 'none',
              }}
              dropdownStyle={{
                backgroundColor: '#fff',
                color: '#333',
                position: 'absolute',
              }}
            />
            <LoginInp
              name='password'
              title="Password"
              icon={false}
              type='password'
            />
            <button
              className={styles.button}
              type="submit"
              disabled={isSubmitting}
              style={loading ? { cursor: "not-allowed" } : { cursor: 'pointer' }}
            >
              {loading ? <Spiner /> : `Login`}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
