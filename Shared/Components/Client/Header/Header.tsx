import styles from './navbar.module.css';
import Nav from '../Nav/Nav';
import { useResize } from '../../../Hooks/useResize';
import { useModalOpen } from '../../../Hooks/useModalOpen';
import { useRouter } from 'next/router';
import Logo from '../../Svg/Logo';
import Bacground from '../../../../public/homeBacground.svg'
import Image from 'next/image';
import Search from '../Search/Search';
import Auth from '../Auth/Auth';

export default function Header() {
    let { isOpen, onOpen, onClose } = useModalOpen();
    let { isMobile } = useResize();
    let { push } = useRouter();

    return (
        <div className={styles.bgimage}>
            <section className={`${styles.header_box} ${isOpen? styles.shadow : ''} `}>
                <div className={`${styles.logo_box} flex gap-3 items-center`}>
                    <button className={styles.button}></button>
                    {/* <h1 className={styles.logotext}>Doctor Tibet</h1> */}
                    <div className={styles.cursor} onClick={() => push('/')}>
                        
                        <img style={{width:'80px', height:'80px'}} className={styles.logo} src="/Logo.png" alt="Logo" />
                    </div>
                </div>

                <div>
                <Nav />
                </div>
               
                <div className='flex flex-row gap-4 items-center'> 
                  
                    <div className={styles.mobile_hide}>
                        <Auth/>
                    </div>
                </div>
            </section>

            <div>
            <div className={styles.headerText}>
            <h1 >We can get your Drug</h1>
            <h1>Prescriptions to You</h1>
            </div>

            <div className={styles.headerSmallText}>
                <h1>We have all the drugs your doctor prescribed for your health</h1>
                <h1>and what’s more, we can get it to you.</h1>
            </div>
            </div>
           
          
           
            <Search/>
          
            </div>
    );
}
