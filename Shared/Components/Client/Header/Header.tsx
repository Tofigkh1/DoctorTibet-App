import styles from './navbar.module.css'; // Eğer stil dosyasını kullanıyorsanız
import Nav from '../Nav/Nav';
import { useResize } from '../../../Hooks/useResize';
import { useModalOpen } from '../../../Hooks/useModalOpen';
import { useRouter } from 'next/router';
import Logo from '../../Svg/Logo';

export default function Header() {
    let { isOpen, onOpen, onClose } = useModalOpen();
    let { isMobile } = useResize();
    let { push } = useRouter();

    return (
        <>
            <section>
                <div>
                    <button className={styles.button}></button>

                    <div className={styles.cursor} onClick={() => push('/')}>
                        <img className={styles.logo} src="/Logo.png" alt="Logo" />
                    </div>
                </div>

                <Nav />
            </section>
        </>
    );
}
