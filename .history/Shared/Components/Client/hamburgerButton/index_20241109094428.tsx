import React, { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './hamburger.module.css';
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
import NavRes from '../navResponsive';

const Curve = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: #7f00ff;
  clip-path: ellipse(80% 50% at 50% 0%);
`;

export default function HamburgerBtn() {
  let user = useSelector((state: RootState) => state.user);
  let { isOpen, onOpen, onClose } = useModalOpen();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  let { isMobile } = useResize();
  let { push } = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false); 



  const toggleMenu = () => setMenuOpen(!isMenuOpen);

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
    <div>
  


     <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
  
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={`${styles.mySwiper} ${styles.background}`}
      >

        <div className="autoplay-progress" slot="container-end">
        

        </div>
      </Swiper>

    </div>
  );
}
