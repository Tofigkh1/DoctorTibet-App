import { useRouter } from "next/router";
import ButtonHeader from "../Button/buttonHeader";
import styles from "./auth.module.css";
import { useEffect, useState } from "react";
import { useResize } from "../../../Hooks/useResize";


export default function Auth(){
    let {push} = useRouter();
    const [active,setActive]=useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    function goAuth() {
        push('/login-register');
    }


    let {isMobile} = useResize();
    
    function handleClick(){
        setActive(!active)
    }


    return (
        <>
         {accessToken ?
                <div className='flex items-center justify-end gap-3'>

                    {active &&
                    <>
                        {!isMobile &&
                        <>
                            <ul className={styles.submenu}>
                                <li onClick={() => push('/user/profile')}>Your Profile</li>
                                <li onClick={() => push('/user/basket')}>Your Basket</li>
                                <li onClick={() => push('/user/orders')}>Your Orders</li>
                                <li onClick={() => push('/user/checkout')}>Checkout</li>
                                
                               
                            </ul>
                            <div onClick={handleClick} className={styles.shadow}/>
                        </>
                        }
                    </>
                    }
                </div> :
                <ButtonHeader addButtonFun={goAuth} typeButton={true} title='Sign Up' btnSize={'sm'} addButton={false}/>
            }
        </>
    )




}