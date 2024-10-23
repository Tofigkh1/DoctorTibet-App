import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './language.module.css';
import { useModalOpen } from '../../Hooks/useModalOpen';

export default function ChangeLanguage() {
    const router = useRouter();
    const [language, setLanguage] = useState<string>('');  // Dil durumu için state
    const { isOpen, onClose, onToggle } = useModalOpen();  // Modal açma ve kapama için hook

    useEffect(() => {
        const storedLanguage = typeof window !== 'undefined' ? window.localStorage.getItem('language') : null;
        const initialLang = storedLanguage || 'az';  // Eğer localStorage'da dil yoksa varsayılan 'az'
        
        // Eğer mevcut dil router.locale'den farklıysa, sayfayı seçilen dil ile yeniden yönlendir
        if (router.locale !== initialLang) {
            router.push(router.pathname, router.asPath, { locale: initialLang });
        }

        setLanguage(initialLang);  // Seçilen dili state'e kaydet
    }, [router.locale]);  // router.locale her değiştiğinde effect tetiklenir

    // Dil değiştirme fonksiyonu
    function changeLang(lang: string) {
        router.push(router.pathname, router.asPath, { locale: lang }).then(() => {
            localStorage.setItem('language', lang);  // Seçilen dili localStorage'a kaydet
            setLanguage(lang);  // Dili state'e kaydet
            onClose();  // Modal'ı kapat
        });
    }

    return (
        <>
            <div className={styles.lang_box}>
                {/* Modal açma/kapatma düğmesi */}
                <button onClick={onToggle}>
                    <img src={`/imgs/${language}.png`} alt={`${language} flag`} />
                </button>

                {/* Eğer modal açıksa dil seçeneklerini göster */}
                {isOpen && (
                    <ul className={styles.lang_list}>
                        <li onClick={() => changeLang('en')}>
                            <img src="/imgs/en.png" alt="English" />
                        </li>
                        <li onClick={() => changeLang('az')}>
                            <img src="/imgs/az.png" alt="Azerbaijani" />
                        </li>
                    </ul>
                )}
            </div>

            {/* Modal açıkken arka plan gölgesi, modal'ı kapatmak için */}
            {isOpen && <div className={styles.shadow} onClick={onClose} />}
        </>
    );
}
