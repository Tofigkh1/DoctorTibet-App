import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './loginForm.module.css'
import { useRouter } from 'next/router';
import LoginInp from '../loginInp';
import Spiner from '../../Spiner';

interface SignInFormValues {
    email: string
    password: string
}

const initialValues: SignInFormValues = {
    email: '',
    password: '',
  };




const SignInForm: React.FC  = () => {
    let [loading, setLoading] = useState(false)


     const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
     });

     let router = useRouter()

     const handleSubmit = (values: SignInFormValues, {setSubmitting}: { setSubmitting: (isSubmitting:boolean) => void }) => {

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
            
            {loading?<Spiner />: `${"Login"}` }
          </button>
        </Form>
      )}

            </Formik>
        </div>
     )
}

export default SignInForm