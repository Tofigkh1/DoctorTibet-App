import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoginInp from '../loginInp';
import styles from './registerForm.module.css'
import { useToast } from '@chakra-ui/react';
import Spiner from '../../Spiner/index';
import RegisterInp from '../registerInp/index';

interface RegisterFormValues {
    fullname:string;
    username: string;
    email:string;
    password:string;
};

const initialValues: RegisterFormValues = {
    "email": '',
    
    "password": '',
    "fullname": '',
    "username": '',
    
    
  };

interface Props{
    setsingin:any
  }

  const RegisterForm = (props:Props) => {
  const toast = useToast()
  let {setsingin}:any = props
  let [loading, setLoading] = useState(false)
  
    
  const validationSchema = Yup.object({
    fullname: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = (values: RegisterFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    setSubmitting(false);
  }

  return (
    <div>
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
          
           {/* <LoginInp
          title='User Name'
          icon={true}
          type='text'
          name='userName'
          /> */}
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
          <button className={styles.button} type="submit" disabled={isSubmitting} style={ loading?{cursor: "not-allowed"}:{cursor: 'pointer'}}>
            {loading?<Spiner/>: `${"Register"}`}
            
          </button>
        </Form>
      )}
        </Formik>
    </div>
  );
  }

  export default RegisterForm;