import React from 'react';
import TelegramIcon from '../../../../public/telegram.png'
import Image from 'next/image';
const TelegramButton = () => {
    const handleTelegramClick = () => {
        const phoneNumber = '+994556065471'; // Telegram numarası
        const message = encodeURIComponent('Merhaba!'); // Önceden yazılı mesaj (opsiyonel)
        const telegramUrl = `https://t.me/${phoneNumber}?text=${message}`;

        // Kullanıcıyı Telegram URL'ine yönlendir
        window.open(telegramUrl, '_blank');
    };

    return (
        <div>
        <button  className='flex gap-5' onClick={handleTelegramClick}>
                    <Image src={TelegramIcon} width={70} height={70} alt='icon'/>
                <h1 className=' mt-6 text-xl font-medium'>Telegram ile Mesaj Gönder</h1>
               </button>
               </div>
    );
};

export default TelegramButton;
