import React, { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './contactUs.module.css';
import Nav from '../../Shared/Components/Client/Nav/Nav';
import { useResize } from '../../Shared/Hooks/useResize';
import { useModalOpen } from '../../Shared/Hooks/useModalOpen';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Search from '../../Shared/Components/Client/Search/Search';
import Auth from '../../Shared/Components/Client/Auth/Auth';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../Shared/Redux/Store/store';
import DoctorPhoto from '../../public/Doctorphoto.jpg';
import Bacground from '../../public/homeBacground.svg';
import Medicine from "../../public/home_swiper2.jpg";
import Medicinees from "../../public/medicalbanner.jpg";
import Doctortb from "../../public/doctortb.jpg";
import ArrovRight2 from '../../public/next.png';
import HamburgerBtn from '../../Shared/Components/Client/hamburgerButton';

import { useTranslation } from 'next-i18next';
import BasketMenu from '../../Shared/Components/sliderBasket/sliderBasket';
import { NextSeo } from 'next-seo';
import { Alert } from '@chakra-ui/react';
import DoctorImg2 from '../../../../public/doctorImg2.png';
import DoctorImg3 from '../../../../public/doctorImg3.png';
import DoctorCollcet from '../../../../public/doctorCollect.png';
import { analytics } from '../../server/configs/firebase';
import { logEvent } from 'firebase/analytics';
import TiensBackground1 from '../../public/home_swiper2 (1).jpg';
import TiensBackground2 from '../../public/Tiensbackground2.jpg';
import home3 from '../../public/home_3.png';
import Product2 from '../../public/home_2.png';


const Curve = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: #7f00ff;
  clip-path: ellipse(80% 50% at 50% 0%);
`;

export default function Header() {

  const { t} = useTranslation('common');


  let user = useSelector((state: RootState) => state.user);
  const [infoUser, setInfoUser] = useState(false)
  let { isOpen, onOpen, onClose } = useModalOpen();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  let { isMobile } = useResize();
  let { push } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('user_info');
    setAccessToken(token);
  }, [user]);

  function goAuthGetStarted() {
    push('/login-register?form=register');

    if (analytics) {
      logEvent(analytics, "button_click", { label: "Test Button", value: 1 });
      console.log("Event logged: button_click");
    }
  }

  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (s: SwiperType, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };


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
    <div className={styles.container}>
             <NextSeo
        title="doctor-tibet.com"
        description="Həkiminizin sağlamlığınız üçün təyin etdiyi bütün Tibet məhsulları bizdə."
        canonical="https://www.doctor-tibet.com"
        openGraph={{
          url: 'https://www.doctor-tibet.com',
          title: 'doctor-tibet.com',
          description: 'Həkiminizin sağlamlığınız üçün təyin etdiyi bütün Tibet məhsulları bizdə.',
          images: [{ url: 'https://www.doctor-tibet.com' }],
          site_name: 'doctor-tibet.com',
        }}
      />


{!isMobile &&

<div>
<div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={`${styles.mySwiper} ${styles.background}`}
      >
        <SwiperSlide style={{ height: isMobile ? '600px' : '500px', position: 'relative' }}>
          <div style={{ height: '670px', width: '100%', position: 'relative' }}>
            <Image 
              src={DoctorPhoto} 
              alt="Doctor" 
         
              objectFit="cover"  
              style={isMobile ? { transform: 'scale(1.1)', objectPosition: 'bottom' } : {}} 
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
  <div
    style={{
      height: '100vh',
      width: '100vw',
      display: 'flex', // Görüntüyü merkezlemek için
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', // Taşmayı önlemek için
    }}
  >
    <Image
   
      objectFit="cover" // Resmin tamamını göstermesi için
      layout="fill" // Alanı kaplama için
      src={TiensBackground1} 
      alt="Image 1" 
    />
  </div>
</SwiperSlide>
<SwiperSlide>
  <div
    style={{
      height: '100vh',
      width: '100vw',
      display: 'flex', // Görüntüyü merkezlemek için
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', // Taşmayı önlemek için
    }}
  >
    <Image
  
      objectFit="cover" // Resmin tamamını göstermesi için
      // Alanı kaplama için
      src={TiensBackground2} 
      alt="Image 2" 
    />
  </div>
</SwiperSlide>

     
        <SwiperSlide>
  <div
    style={{
      height: '100vh',
      width: '100vw',
      display: 'flex', // Görüntüyü merkezlemek için
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', // Taşmayı önlemek için
    }}
  >
    <Image
      objectFit="cover" // Resmin tamamını göstermesi için
      layout="fill" // Alanı kaplama için
      src={home3} 
      alt="Image 1" 
    />
  </div>
</SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      </div>
<div>
  

 
        
     
      


  



    <div>


  
      <div className={styles.headerText}>
        <h1 className=''>Doctor Tibet ilə</h1>
        <h1>Sağlam gələcək.</h1>
      </div>

      <div className={styles.headerSmallText}>
        <h1 className=''>Həkiminizin sağlamlığınız üçün təyin etdiyi bütün Tibet məhsulları bizdə</h1>
        <h1>biz bunu sizə çatdıra bilərik.</h1>
      </div>
    </div>


   




  </div>
</div>

      


     }


{isMobile &&
<div>
<div>

  
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={`${styles.mySwiper} ${styles.background}`}
      >
        <SwiperSlide style={{ height: isMobile ? '600px' : '500px', position: 'relative' }}>
          <div style={{ height: '670px', width: '100%', position: 'relative' }}>
            <Image 
              src={DoctorPhoto} 
              alt="Doctor" 
         
              objectFit="cover"  
              style={isMobile ? { transform: 'scale(1.1)', objectPosition: 'bottom' } : {}} 
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
  <div
    style={{
      height: '100vh',
      width: '100vw',
      display: 'flex', // Görüntüyü merkezlemek için
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', // Taşmayı önlemek için
    }}
  >
    <Image
   
      objectFit="cover" // Resmin tamamını göstermesi için
      layout="fill" // Alanı kaplama için
      src={TiensBackground2} 
      alt="Image 1" 
    />
  </div>
</SwiperSlide>
<SwiperSlide>
  <div
    style={{
      height: '100vh',
      width: '100vw',
      display: 'flex', // Görüntüyü merkezlemek için
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', // Taşmayı önlemek için
    }}
  >
    <Image
  
      objectFit="cover" // Resmin tamamını göstermesi için
      // Alanı kaplama için
      src={Product2} 
      alt="Image 2" 
    />
  </div>
</SwiperSlide>

     
        <SwiperSlide>
  <div
    style={{
      height: '100vh',
      width: '100vw',
      display: 'flex', // Görüntüyü merkezlemek için
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', // Taşmayı önlemek için
    }}
  >
    <Image
      objectFit="cover" // Resmin tamamını göstermesi için
      layout="fill" // Alanı kaplama için
      src={home3} 
      alt="Image 1" 
    />
  </div>
</SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      </div>

      <div>
  

   

    <div className={styles.hambrBtn}>
      <HamburgerBtn />
    </div>


  <div className={styles.bgimage}>
    <section className={`${styles.header_box}  ${isOpen ? styles.shadow : ''}`}>
      <div className={`${styles.logo_box} flex gap-3 items-center`}>
        <button className={styles.button}></button>
        <div className={styles.cursor}>
          <img onClick={() => push('/')} style={{ width: '90px', height: '90px' }} className={styles.logo} src="/Logo.png" alt="Logo" />
        </div>
      </div>

  

     

      <div className='flex flex-row gap-4 items-center'>
      <div>
      <BasketMenu/>
      </div>
      
        <div className={styles.mobile_hide}>
          <Auth />
        </div>
        
      </div>
      
    </section>

  






    <div>


  
      <div className={styles.headerText}>
        <h1 className=''>Doctor Tibet ilə</h1>
        <h1>Sağlam gələcək.</h1>
      </div>

      <div className={styles.headerSmallText}>
        <h1 className=''>Həkiminizin sağlamlığınız üçün təyin etdiyi bütün Tibet məhsulları bizdə</h1>
        <h1>biz bunu sizə çatdıra bilərik.</h1>
      </div>
    </div>


    <div>
<Search />
</div>

    {!accessToken && (
      <button onClick={goAuthGetStarted} className={styles.getStartedButton}>
        <div className={styles.textContainer}>{t("Sağlam həyata Başla")}</div>
        <div className={styles.arrowContainer}>
          <Image alt="Next arrow icon" src={ArrovRight2} width={30} height={30} className={styles.arrowImage} />
        </div>
      </button>
    )}





  </div>
</div>
</div>
     
      
     }

    
    </div>
  );
}


