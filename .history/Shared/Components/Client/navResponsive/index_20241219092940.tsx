import { useRouter } from 'next/router';
import { useResize } from "../../../Hooks/useResize";
import styless from './navResponse.module.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { clearUser } from '../../../Redux/Featuries/User/userSlice';

export default function NavRes() {
    let { push, pathname } = useRouter();
    let { isMobile } = useResize();
    const [accessToken, setAccessToken] = useState<string | null>(null); // Tipi belirtilmiş state
    const dispatch = useDispatch();

    // `p` parametresine `string` tipi ekleniyor
    const isActive = (p: string) => (pathname === p ? "active" : "");
    
    let user = useSelector((state: any) => state.user);

    useEffect(() => {
        const token = localStorage.getItem('user_info');
        setAccessToken(token);
    }, [user]);

    return (
        <>
            <nav className={styless.nav_box}>
                <ul>
                    {(isMobile && accessToken) ? (
                        <>
                        <li onClick={() => push('/')} className={styless[`${isActive("/")}`]}>Əsas səhifə</li>
                            <li className={styless[`${isActive("/user/profile")}`]} onClick={() => push('/user/profile')}>Profilin</li>
                            {/* <li className={styless[`${isActive("/user/basket")}`]} onClick={() => push('/user/basket')}>Your Basket</li>
                            <li className={styless[`${isActive("/user/orders")}`]} onClick={() => push('/user/orders')}>Your Orders</li>
                            <li className={styless[`${isActive("/user/checkout")}`]} onClick={() => push('/user/checkout')}>Checkout</li> */}
                   
                        </>
                    ) : ''}

                    
                    <li onClick={() => push('/medicines')} className={styless[`${isActive("/medicines")}`]}>Tibet məhsulları</li>
                    <li onClick={() => push('/contact-us')} className={styless[`${isActive("/contact-us")}`]}>Seanslar</li>
                    <li onClick={() => push('/about-us')} className={styless[`${isActive("/about-us")}`]}>Haqqında</li>
                    <li onClick={() => push('/faq')} className={styless[`${isActive("/faq")}`]}>F.A.Q</li>
                    <li className={styless[`${isActive("/user/checkout")}`]} onClick={() => {
                                push('/user/checkout');
                                localStorage.removeItem("user_info");
                                localStorage.removeItem("access_token");
                                dispatch(clearUser());
                            }}>Çıxış et</li>
                </ul>
            </nav>
        </>
    );
}
