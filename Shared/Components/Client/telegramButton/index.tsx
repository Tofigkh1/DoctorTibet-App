import React from 'react';
import TelegramIcon from '../../../../public/telegram.png'
import Image from 'next/image';
import { useResize } from '../../../Hooks/useResize';
const TelegramButton = () => {
    let { isMobile } = useResize();
    const handleTelegramClick = () => {
        const phoneNumber = '+994556065471'; // Telegram numarası
        const message = encodeURIComponent('Salam, mən bu tibet mehsulunu almaq istəyirəm.'); // Önceden yazılı mesaj (opsiyonel)
        const telegramUrl = `https://t.me/${phoneNumber}?text=${message}`;

        // Kullanıcıyı Telegram URL'ine yönlendir
        window.open(telegramUrl, '_blank');
    };

    return (
        <div>
              {!isMobile &&
        <button  className='flex gap-5' onClick={handleTelegramClick}>
                    <Image src={TelegramIcon} width={70} height={70} alt='icon'/>
                <h1 className=' mt-6 text-xl font-medium'>Telegram ile Mesaj Gönder</h1>
               </button>
}

<div>
{isMobile &&
   <button  className='flex gap-1' onClick={handleTelegramClick}>
   <Image src={TelegramIcon} width={60} height={60} alt='icon'/>
<h1 className='  text-lg font-medium'>Telegram ile Mesaj Gönder</h1>
</button>
}
</div>
               </div>
    );
};

export default TelegramButton;
