import React, {useState} from 'react';
import eyeIcon from '../../../../../public/eye.svg';
import { ErrorMessage, Field } from 'formik';
import styles from './loginInp.module.css'
import Image from 'next/image';

interface Props {
    title:string;
    type: string;
    icon:boolean;
    name:string;

}

function LoginInp (props:Props) {
    
    let {title, type, icon, name} = props

    let [show, setShow] = useState(false)

    return (
        <div className={styles.div}>
        <label htmlFor={name} className={styles.label}>{title}</label>
        <div className={'flex flex-row '+styles.relative}>
        <Field className={styles.inp} type={show?'text':type}  name={name}   />
        <Image
        src={eyeIcon}
        alt='ayeIcon'
        width={35}
        height={32}
        className={styles.ayeIcon}
        style={icon!?{display:'none'}:{display:'block'}}
        onClick={()=>setShow(prev=>!prev)}
        />
        </div>
        
        <ErrorMessage name={name}  component="div" />
      </div>
    );
}

export default LoginInp;