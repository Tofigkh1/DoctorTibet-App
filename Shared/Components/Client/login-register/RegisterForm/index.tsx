import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import styles from './registerForm.module.css';
import RegisterInp from '../registerInp';
import LoginInp from '../loginInp';
import Spiner from '../../Spiner';
import { useToast } from '@chakra-ui/react';
import { postSignUp } from '../../../../../Services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store/store';
import { UserAuth } from '../../../../Context';

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
}

const RegisterForm = (props: Props) => {
  const toast = useToast();
  const user = useSelector((state: RootState) => state.user);
  let { setsingin }: any = props;
  let [Loading, setLoading] = useState(false);


  
  const { useer, googleSignIn, logOut }:any = UserAuth();

  console.log(useer);
  

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  

  // Regex pattern to validate a phone number (international format)
  const phoneRegExp = /^\+?[1-9]\d{1,14}$/;

  const validationSchema = Yup.object({
    fullname: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Invalid phone number')
      .required('Required'),
  });

  const handleSubmit = (values: RegisterFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    (async () => {
      try {
        setLoading(true);
        await postSignUp(values)
          .then(() => {
            toast({
              title: `Register successfully!`,
              status: 'success',
              duration: 2000,
              isClosable: true,
              position: 'top-right',
              variant: 'subtle',
            });
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            toast({
              title: err.message,
              status: 'info',
              duration: 2000,
              isClosable: true,
              position: 'top-right',
              variant: 'subtle',
            });
          });
      } catch (err) {
        console.log(err);
      }
    })();

    setSubmitting(false);
  };

  return (
    <div>

<div>
          <button onClick={handleSignIn} >SignUp</button>
          </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <RegisterInp
              title="Full Name"
              icon={true}
              name='fullname'
            />
            <RegisterInp
              title="User Name"
              icon={true}
              name='username'
            />
            <LoginInp
              name='email'
              title="E-mail"
              icon={true}
              type='email'
            />
            <LoginInp
              name='password'
              title="Password"
              icon={false}
              type='password'
            />
            <LoginInp
              name='phoneNumber'
              title="Phone Number"
              icon={true}
              type='text'
            />
            <button className={styles.button} type="submit" disabled={isSubmitting} style={Loading ? { cursor: "not-allowed" } : { cursor: 'pointer' }}>
              {Loading ? <Spiner /> : `Register`}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
