import styless from './navbar.module.css'
import Nav from '../Nav/Nav'
import { useResize } from '../../../Hooks/useResize'
import {useModalOpen} from "../../../Hooks/useModalOpen";
import { useRouter } from 'next/router';
import Logo from "../../Svg/Logo"


export default function Header() {
    let {isOpen, onOpen, onClose} = useModalOpen();
    let {isMobile} = useResize();
    let {push} = useRouter();

    return (
        <>
        <section>
            <div>
                <button className=''></button>
                <div className='cursor pointer' onClick={()=>push('/')}><Logo/></div>
            </div>

            <Nav/>
        </section>
        </>
    )
}