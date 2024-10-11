import { ErrorMessage, Field } from 'formik';
import React from 'react';
import style from './checkoutinp.module.css';

interface Props {
    name: string;
    type: string;
    placeholder?: string;
    title?: string;
    value?: string;
    id?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange ekledim
}

function Input(props: Props) {
    let { label, inp, eror } = style;
    let { name, type, placeholder, title, value, id, onChange } = props; // onChange'yi destructuring yaptım
    return (
        <div className='flex flex-col h-[102px]'>
            <label htmlFor={name} className={label}>{title}</label>
            <Field 
                type={type} 
                id={id || name} 
                name={name} 
                className={inp} 
                value={value} 
                placeholder={placeholder} 
                onChange={onChange} 
            />
            <ErrorMessage name={name} component="div" className={eror} />
        </div>
    );
}

export default Input;
