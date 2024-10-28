import { useRef, useState, useEffect } from 'react';
import styles from './overlayPayment.module.css';
import WhatsAppButton from '../whatsappButton';
import TelegramButton from '../telegramButton';
import { useResize } from '../../../Hooks/useResize';

const OverlayPayment = () => {
    const menuRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const { isMobile } = useResize();

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Bileşenin dışına tıklayınca menüyü kapatmak için olay dinleyici ekle
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                overlayRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !overlayRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {!isMobile && (
                <div>
                    {isMenuOpen && (
                        <div
                            className='rounded-lg w-7/12 h-80 bg-white absolute z-50'
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                            ref={menuRef}
                        >
                            <h1 className='text-center text-3xl font-semibold mt-7'>
                                Mehsulun almaq ucun zehmet olmasa bizimle elaqeye kecerek odenis edin!
                            </h1>
                            <div className='flex gap-10 ml-20 mt-14'>
                                <div>
                                    <WhatsAppButton />
                                </div>
                                <div>
                                    <TelegramButton />
                                </div>
                            </div>
                        </div>
                    )}

                    {isMenuOpen && (
                        <div
                            ref={overlayRef}
                            className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}
                            onClick={() => setIsMenuOpen(false)}
                        ></div>
                    )}
                </div>
            )}

            {isMobile && (
                <div>
                    {isMenuOpen && (
                        <div
                            className={styles.overlayContainer}
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                            ref={menuRef}
                        >
                            <h1 className={styles.centeredText}>
                                Mehsulun almaq ucun zehmet olmasa bizimle elaqeye kecerek odenis edin!
                            </h1>
                            <div className='flex gap-7 ml-4 mt-14'>
                                <div>
                                    <WhatsAppButton />
                                </div>
                                <div>
                                    <TelegramButton />
                                </div>
                            </div>
                        </div>
                    )}

                    {isMenuOpen && (
                        <div
                            ref={overlayRef}
                            className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}
                            onClick={() => setIsMenuOpen(false)}
                        ></div>
                    )}
                </div>
            )}
        </>
    );
};

export default OverlayPayment;
