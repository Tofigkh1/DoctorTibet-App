import styles from './navbar.module.css';
import Nav from '../Nav/Nav';
import { useResize } from '../../../Hooks/useResize';
import { useModalOpen } from '../../../Hooks/useModalOpen';
import { useRouter } from 'next/router';
import Logo from '../../Svg/Logo';
import Bacground from '../../../../public/homeBacground.svg'
import Image from 'next/image';

export default function Header() {
    let { isOpen, onOpen, onClose } = useModalOpen();
    let { isMobile } = useResize();
    let { push } = useRouter();

    return (
        <div className={styles.bgimage}>
            <section className={`${styles.header_box} ${isOpen? styles.shadow : ''} `}>
                <div className={`${styles.logo_box} flex gap-3 items-center`}>
                    <button className={styles.button}></button>
                    <h1 className={styles.logotext}>Doctor Tibet</h1>
                    <div className={styles.cursor} onClick={() => push('/')}>
                        
                        <img style={{width:'55px', height:'55px'}} className={styles.logo} src="/Logo.png" alt="Logo" />
                    </div>
                </div>

                <Nav />
                
            </section>
          
            </div>
    );
}
