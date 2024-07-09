import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './navbar.module.css';
import Nav from '../Nav/Nav';
import { useResize } from '../../../Hooks/useResize';
import { useModalOpen } from '../../../Hooks/useModalOpen';
import { useRouter } from 'next/router';
import Logo from '../../Svg/Logo';
import Bacground from '../../../../public/homeBacground.svg';
import Medicine from "../../../../public/Medicine.svg";
import Medicinees from "../../../../public/medicalbanner.jpg";
import Doctortb from "../../../../public/doctortb.jpg";
import Image from 'next/image';
import Search from '../Search/Search';
import Auth from '../Auth/Auth';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Footer from '../Footer';

export default function Header() {
  let { isOpen, onOpen, onClose } = useModalOpen();
  let { isMobile } = useResize();
  let { push } = useRouter();

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 5000)}s`;
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
        <SwiperSlide> <Image src={Bacground} alt="Image 1" layout="fill" objectFit="cover" /></SwiperSlide>
        <SwiperSlide><Image src={Medicine} alt="Image 1" layout="fill" objectFit="cover" /></SwiperSlide>
        <SwiperSlide><Image src={Medicinees} alt="Image 1" layout="fill" objectFit="cover" /></SwiperSlide>
        <SwiperSlide>  <SwiperSlide><Image src={Doctortb} alt="Image 1" layout="fill" objectFit="cover" /></SwiperSlide></SwiperSlide>

        {/* <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
        
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>




      <div className={styles.bgimage}>
        <section className={`${styles.header_box} ${isOpen ? styles.shadow : ''}`}>
          <div className={`${styles.logo_box}`}>
            <button className={styles.button}></button>
            <div className={styles.cursor} onClick={() => push('/')}>
              <img style={{ width: '84px', height: '84px' }} className={styles.logo} src="/Logo.png" alt="Logo" />
            </div>
          </div>
          <div>
            <Nav />
          </div>
          <div className="">
            <div className={styles.mobile_hide}>
              <Auth />
            </div>
          </div>
        </section>

        <div>
          <div className={styles.headerText}>
            <h1 className=''>We can get your Drug</h1>
            <h1>Prescriptions to You</h1>
          </div>
          <div className={styles.headerSmallText}>
            <h1 className=''>We have all the drugs your doctor prescribed for your health</h1>
            <h1>and what’s more, we can get it to you.</h1>
          </div>
        </div>

        <Search />
        
      </div>
    
    </div>
    
  );
}
