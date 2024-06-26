import { useRouter } from 'next/router'
import {useResize} from "../../../Hooks/useResize";
import styless from './Nav.module.css'


export default function Nav() {
    let { push, pathname} = useRouter();
    let {isMobile} = useResize()
    const isActive = (p) => (pathname === p ? "active" : "");



    return (
        <>
        
        </>
    )
}

