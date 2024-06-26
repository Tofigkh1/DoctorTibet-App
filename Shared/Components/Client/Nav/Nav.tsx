import { useRouter } from 'next/router'
import {useResize} from "../../../Hooks/useResize";
import styless from './Nav.module.css'


export default function Nav() {
    let { push, pathname} = useRouter();
    let {isMobile} = useResize()
    const isActive = (p) => (pathname === p ? "active" : "");



    return (
        <>
        <nav>
            <ul>
                <>
                <li onClick={()=>push('/')} className={styless[`${isActive("/")}`]}>
                    Home
                </li>
                <li onClick={()=>push('/medicines')} className={styless[`${isActive("/medicines")}`]}>
                Buy Medicine
                </li>
                <li onClick={()=>push('/contact-us')} className={styless[`${isActive("/contact-us")}`]}>
                Contact a doctor
                </li>
                <li onClick={()=>push('/about-us')} className={styless[`${isActive("/about-us")}`]}>
                About
                </li>
                <li onClick={()=>push('/faq')} className={styless[`${isActive("/faq")}`]}>
                F.A.Q
                </li>

                </>
            </ul>
        </nav>
        </>
    )
}

