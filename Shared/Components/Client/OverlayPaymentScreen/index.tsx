import { useRef, useState } from 'react';
import styles from './overlayPayment.module.css'
import Image from 'next/image';
import closedBag from '../../../../public/left-chevron.png';
import shoppingBag from '../../../../public/shopping-bag.png';
import { WhatsApp } from '@mui/icons-material';
import WhatsAppButton from '../whatsappButton';
import TelegramButton from '../telegramButton';


const OverlayPayment = () =>{
    const menuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(true);


    const handleToggleMenu = () => {
        setIsMenuOpen(false);
      };
    

    return(
        <>

        <div className=' '>

    
         {isMenuOpen ?  <div className=' rounded-lg w-7/12 h-80 bg-white absolute z-50' style={{
                    left: '50%',          // Sol kenarı %50
                    top: '50%',           // Üst kenarı %50
                    transform: 'translate(-50%, -50%)', // Kendini %50 sola ve %50 yukarı kaydır
                }}>
                    <h1 className='text-center text-3xl font-semibold mt-7'> Mehsulun almaq ucun zehmet olmasa bizimle elaqeye kecerek odenis edin!</h1>

                    {/* <button onClick={handleToggleMenu}>click</button> */}

                    <div className=' flex gap-10 ml-20 mt-14'>
                    <div>
                      <WhatsAppButton/>
                    </div>

                    <div>
                      <TelegramButton/>
                    </div>
                    </div>
                 
                </div>:''}
      


        <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : styles.overlayHidden}`}></div>
  
        <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}></div>
          <div ref={menuRef} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}></div>
       
        
              
  

                </div>
      </>
    )

}

export default OverlayPayment