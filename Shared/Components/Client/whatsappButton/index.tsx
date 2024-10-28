import { WhatsApp } from '@mui/icons-material';
import Image from 'next/image';
import React from 'react';
import WhatssapIcon from '../../../../public/whatsapplogo.png'
import { useResize } from '../../../Hooks/useResize';


const WhatsAppButton = () => {
    let { isMobile } = useResize();
    const handleWhatsAppClick = () => {
        const phoneNumber = '+994556065471'; // Telefon numarası (başında '+' olmadan)
        const message = 'Salam, mən bu tibet mehsulunu almaq istəyirəm.'; // Gönderilecek mesaj
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Kullanıcıyı WhatsApp URL'ine yönlendir
        window.open(whatsappUrl, '_blank');
    };

    return (

        <div>
              {!isMobile &&
 <button  className='flex gap-5' onClick={handleWhatsAppClick}>
             <Image src={WhatssapIcon} width={70} height={70} alt='icon'/>
         <h1 className=' mt-6 text-xl font-medium'>WhatsApp ile Mesaj Gönder</h1>
        </button>
}


{isMobile &&
<div>
<button  className='flex gap-1' onClick={handleWhatsAppClick}>
             <Image src={WhatssapIcon} width={60} height={60} alt='icon'/>
         <h1 className='  text-lg font-medium'>WhatsApp ile Mesaj Gönder</h1>
        </button>
</div>
}
        </div>
       
    );
};

export default WhatsAppButton;
