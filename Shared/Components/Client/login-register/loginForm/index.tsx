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
import { setUser, clearUser, updateUser } from '../../../../Redux/Featuries/User/userSlice';

interface SignInFormValues {
    phoneNumber: string;
    password: string;
}

const initialValues: SignInFormValues = {
    phoneNumber: '',
    password: '',
};

const SignInForm: React.FC = () => {
    let [loading, setLoading] = useState(false);
    const toast = useToast();

    const validationSchema = Yup.object({
        phoneNumber: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    });

    let router = useRouter();

    const handleSubmit = (values: SignInFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        (async () => {
            try {
                setLoading(true);
                await Post(values, `auth/signin`).then((res) => {
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
                });

            } catch (err) {

                toast({
                    title: `Phone number or password is wrong`,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });
            }

        })();

        setSubmitting(false);
    };

    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const handleLogout = () => {
        dispatch(clearUser());
    };

    const handleUpdateUser = () => {
        const updateData = {
            email: 'newemail@example.com',
        };
        dispatch(updateUser(updateData));
    };

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
                            name='phoneNumber'
                            title="Phone Number"
                            icon={true}
                            type='text'
                        />
                        <LoginInp
                            name='password'
                            title="Password"
                            icon={false}
                            type='password'
                        />
                        <button className={styles.button} type="submit" disabled={isSubmitting} style={loading ? { cursor: "not-allowed" } : { cursor: 'pointer' }}>
                            {loading ? <Spiner /> : `Login`}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignInForm;
