import React, { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './Navbar.module.css';
import Nav from '../Nav/Nav';
import { useResize } from '../../../Hooks/useResize';
import { useModalOpen } from '../../../Hooks/useModalOpen';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Search from '../Search/Search';
import Auth from '../Auth/Auth';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Footer from '../Footer';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store/store';
import DoctorPhoto from '../../../../public/Doctorphoto.jpg';
import Bacground from '../../../../public/homeBacground.svg';
import Medicine from "../../../../public/home_swiper2.jpg";
import Medicinees from "../../../../public/medicalbanner.jpg";
import Doctortb from "../../../../public/doctortb.jpg";
import ArrovRight2 from '../../../../public/next.png';

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
  let user = useSelector((state: RootState) => state.user);
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

  return (
    <div className={styles.container}>
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
     <SwiperSlide style={{  height: isMobile ? '600px' : '500px', position: 'relative' }}>
  <div style={{ height: '670px', width: '100%', position: 'relative' }}>
    <Image 
      src={DoctorPhoto} 
      alt="Doctor" 
      layout="fill"  // Alanı doldurması için
      objectFit="cover"  // Görselin düzgün bir şekilde genişlemesi için
      style={isMobile ? { transform: 'scale(1.1)', objectPosition: 'bottom' } : {}} 
    />
  </div>
</SwiperSlide>
<SwiperSlide>
          <Image src={Medicinees} alt="Image 1" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Medicine} alt="Image 1" layout="fill" objectFit="cover" />
        </SwiperSlide>
 
        <SwiperSlide>
          <Image src={Doctortb} alt="Image 1" layout="fill" objectFit="cover" />
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>

      <div className={styles.bgimage}>
        
        <section className={`${styles.header_box}  ${isOpen ? styles.shadow : ''}`}>
          <div className={`${styles.logo_box} flex gap-3 items-center`}>
            <button className={styles.button}></button>
            <div className={styles.cursor}>
              <img onClick={() => push('/')} style={{ width: '90px', height: '90px' }} className={styles.logo} src="/Logo.png" alt="Logo" />
            </div>
          </div>

          <div className={`${styles.menu_box} ${isMobile ? (isOpen ? styles.show : styles.hide) : styles.show}`}>
            <Nav />
          </div>

          <div className='flex flex-row gap-4 items-center'>
            <div className={styles.mobile_hide}>
              <Auth />
            </div>
          </div>
        </section>

        <div>

          
          <div className={styles.headerText}>
            {/* <h1 className=''>We can get your Drug</h1>
            <h1>Prescriptions to You</h1> */}
                 <h1 className=''>Doctor Tibet ilə</h1>
                 <h1>Sağlam gələcək.</h1>
          </div>



          <div className={styles.headerSmallText}>
            <h1 className=''>Həkiminizin sağlamlığınız üçün təyin etdiyi bütün dərmanlar bizdə</h1>
            <h1>biz bunu sizə çatdıra bilərik.</h1>
          </div>
        </div>

        <Search />

        {!accessToken && (

          
          <button onClick={goAuthGetStarted} className={styles.getStartedButton}>
            <div className={styles.textContainer}>Get Started</div>
            <div className={styles.arrowContainer}>
              <Image alt="Next arrow icon" src={ArrovRight2} width={30} height={30} className={styles.arrowImage} />
            </div>
          </button>


        )}
      </div>
    </div>
  );
}
