import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../Client/userInp/index';
import style from './form.module.css';
import { AppDispatch, RootState } from '../../../Redux/Store/store';
import uploadFile from '../../../Utils/uploadFile';
import { PutAuthUserr } from '../../../../Services/index';
import Spiner from '../../../Components/Client/Spiner/index';
import { useToast } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, UserState } from "../../../Redux/Featuries/User/userSlice";
import { useResize } from '../../../Hooks/useResize';

interface FormValues {
    phoneNumber: string;
    username: string;
    email: string;
    fullname: string;
    address: string;
}



const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .matches(/^\+994\d{9}$/, 'Phone number must start with +994 and have 9 additional digits')
        .required('Phone number is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    fullname: Yup.string().required('Full name is required'),
    address: Yup.string().required('Address is required'),
});

const initialValues: FormValues = {
    phoneNumber: '',
    username: '',
    email: '',
    fullname: '',
    address: '',
};

interface Props {
    img: any | undefined;
}

const UserForm: React.FC<Props> = (props: Props) => {
    const toast = useToast();
    let { img } = props;
    let [logoding, setlogoding] = useState(false);
    let { isMobile } = useResize();

    const [initialValues, setInitialValues] = useState<FormValues>({
        phoneNumber: '',
        username: '',
        email: '',
        fullname: '',
        address: ''
    });

    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const storedUser = localStorage.getItem("user_info");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser) {
                dispatch(setUser(parsedUser));
                setInitialValues({
                    phoneNumber: parsedUser.phoneNumber || '',
                    username: parsedUser.username || '',
                    email: parsedUser.email || '',
                    fullname: parsedUser.fullname || '',
                    address: parsedUser.address || ''
                });
            }
        }
    }, [dispatch]);

    useEffect(() => {
        const userStr = localStorage.getItem("user_info");
        if (userStr) {
            try {
                const user: UserState = JSON.parse(userStr);
                dispatch(setUser(user));
            } catch (error) {
                console.error("Kullanıcı bilgisi parse edilirken hata oluştu:", error);
      
            }
        }
    }, [dispatch]);

    const onSubmit = async (values: FormValues) => {
        if (!img) {
            toast({
                title: `You have to add an image to the profile`,
                status: 'info',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle',
            });
            return;
        }

        setlogoding(true);

        try {
            let imgres = await uploadFile({
                file: img,
                collectionId: "users-hash-password",
                documentId: "users-hash-password",
            }) as string | null;

            if (!imgres) {
                throw new Error('Image upload failed');
            }
console.log("values", values);

            let userInfo = {
                ...values,
                img_url: imgres,
            };

            let res = await PutAuthUserr(userInfo);

            if (!res) {
                throw new Error('User update failed');
            }

            localStorage.setItem("user_info", JSON.stringify(userInfo));
            dispatch(setUser(userInfo));

            toast({
                title: `User info is updated`,
                status: 'info',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle',
            });

            setlogoding(false);
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            toast({
                title: `Error: ${errorMessage}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle',
            });
            setlogoding(false);
        }
    };

    let { div, inpdiv, button } = style;
    let { divMob, inpdivMob, buttonMob } = style;
    return (

        <div>


        {!isMobile &&
        <div>
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}    
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
                {({ handleChange, values }) => (


                    <Form>
                        <div className={div}>
                            <div className={inpdiv}>
                            <Input
    name='phoneNumber'
    type='text'
    value={values.phoneNumber}
    onChange={handleChange}
    placeholder='+994 XX XXX XX XX'
    title="Telefon nömrəsi"
/>
                                <Input
                                    name='username'
                                    type='text'
                                    value={values.username}
                                    onChange={handleChange}
                                    placeholder='User Name'
                                    title="istifadəci adi"
                                />
                                <Input
                                    name='fullname'
                                    type='text'
                                    value={values.fullname}
                                    onChange={handleChange}
                                    placeholder='Full Name'
                                    title="Ad soyad"
                                />
                            </div>
                            <div className={inpdiv}>
                                <Input
                                    name='email'
                                    type='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    title='Email'
                                />
                                <Input
                                    name='Ünvan'
                                    type='text'
                                    value={values.address}
                                    onChange={handleChange}
                                    placeholder='Address'
                                    title="Ünvan"
                                />
                                <button
                                    type="submit"
                                    className={button}
                                    style={logoding ? { cursor: "not-allowed" } : { cursor: 'pointer' }}
                                    disabled={logoding}
                                >
                                    {logoding ? <Spiner /> : "Yadda saxla"}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
        }




{isMobile &&
        <div>
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}    
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
                {({ handleChange, values }) => (


                    <Form>
                        <div className={div}>
                            <div className={inpdivMob}>
                            <Input
    name='Telefon nömrəsi'
    type='text'
    value={values.phoneNumber}
    onChange={handleChange}
    placeholder='+994 XX XXX XX XX'
    title="Telefon nömrəsi"
/>
                                <Input
                                    name='istifadəçi adı'
                                    type='text'
                                    value={values.username}
                                    onChange={handleChange}
                                    placeholder='istifadəçi adı'
                                    title="istifadəçi adı"
                                />
                                <Input
                                    name='Ad soyad'
                                    type='text'
                                    value={values.fullname}
                                    onChange={handleChange}
                                    placeholder='Ad soyad'
                                    title="Ad soyad"
                                />
                            </div>
                            <div className={inpdivMob}>
                                <Input
                                    name='email'
                                    type='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    title='Email'
                                />
                                <Input
                                    name='Ünvan'
                                    type='text'
                                    value={values.address}
                                    onChange={handleChange}
                                    placeholder='Ünvan'
                                    title="Ünvan"
                                />
                                <button
                                    type="submit"
                                    className={button}
                                    style={logoding ? { cursor: "not-allowed", marginLeft:'140px' } : { cursor: 'pointer', marginLeft:'140px' }}
                                    disabled={logoding}
                                >
                                    {logoding ? <Spiner /> : "Yadda saxla"}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
        }

        </div>
    );
};

export default UserForm;
