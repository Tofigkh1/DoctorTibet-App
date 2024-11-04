import React, { useEffect, useRef, useState } from 'react';



import { useRouter } from 'next/router';



import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store/store';


import { useTranslation } from 'next-i18next';

import { Alert } from '@chakra-ui/react';
import ArrovLeft from '../../../../public/right-arrow (3).png'
import InforIcon from '../../../../public/information.png'
import Image from 'next/image';
import { useResize } from '../../../Hooks/useResize';




export default function TryInfoUser() {

  const { t} = useTranslation('common');


  let user = useSelector((state: RootState) => state.user);
  const [infoUser, setInfoUser] = useState(false)
 
  const [accessToken, setAccessToken] = useState<string | null>(null);

  let { push } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('user_info');
    setAccessToken(token);
  }, [user]);

  function goAuthGetStarted() {
    push('/login-register?form=register');
  }

  let { isMobile } = useResize();

  useEffect(() => {
    if (
      user.id && // Kullanıcının giriş yaptığını kontrol etmek için
      (
        !user.phoneNumber || user.phoneNumber.length <= 0 || 
        !user.email || user.email.length <= 0 || 
        !user.username || user.username.length <= 0 || 
        !user.fullname || user.fullname.length <= 0 || 
        !user.address || user.address.length <= 0
      )
    ) {
      setInfoUser(true);
    } else {
      setInfoUser(false);
    }
  }, [user]);
  

  return (
    <div>

    {!isMobile &&
          <div>

{infoUser && 
  <div className='flex'>

<div >
<Alert fontWeight='bold' gap={2} roundedLeft={20} marginLeft={20} width={830} height={8} status="info" title="Invalid Fields">
<Image src={InforIcon} width={23} alt="Info icon"/>
Məlumatlarınız tam doldurulmayıb xaiş olunur profile səhifəsine keçərək məlumatlarinizi doldurun!
</Alert>
</div>



<button 
 onClick={() => push('/user/profile')}
className="bg-sky-300 pl-2 rounded-e-2xl w-12 h-8 font-bold transition-all hover:bg-teal-400 ">
<Image alt="Info icon" src={ArrovLeft}  width={30}/>
</button>
  </div>

}
        
           
          </div>
}

{isMobile &&
          <div>

{infoUser && 
  <div className='flex'>

<div >
<Alert fontWeight='bold' fontSize={11} gap={2} roundedLeft={20} marginLeft={5} width={350} height={8} status="info" title="Invalid Fields">
<Image alt="Info icon" src={InforIcon} width={23}/>
Məlumatlarınız tam doldurulmayıb xaiş olunur profile səhifəsine keçərək məlumatlarinizi doldurun!
</Alert>
</div>



<button 
 onClick={() => push('/user/profile')}
className="bg-sky-300 pl-2 rounded-e-2xl w-12 h-8 font-bold transition-all hover:bg-teal-400 ">
<Image alt="Info icon" src={ArrovLeft}  width={30}/>
</button>
  </div>

}
        
           
          </div>
}

</div>        
  );
}


