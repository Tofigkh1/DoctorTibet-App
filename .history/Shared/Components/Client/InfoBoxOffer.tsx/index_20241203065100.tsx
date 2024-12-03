import React, { useEffect, useState,useRef } from 'react';
import style from './infoBoxOffer.module.css';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MedicinesIcon from '../../../../public/MedicinesIcon.svg';
import Exclude from '../../../../public/Exclude.svg';
import buttonVector from '../../../../public/buttonVector.svg';
import bcichlesIcon from '../../../../public/bcichlesIcon.svg';
import groupHuman from '../../../../public/groupHuman.svg';
import feedBackImg from '../../../../public/E-Commerce Review 3D Animated Icon.gif';
import Testimonial from '../Testimol';
import { useRouter } from 'next/router';
import TiensLogoo from '../../../../public/Tiens_Logo.svg.png';

import './swiper-page.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


// import required modules
import { EffectCards } from 'swiper/modules';


interface Props {
    row: boolean,
    img: any,
    desc: string,
    title: string,
    w: number,
    h: number
}

function InfoBoxOffer(props: Props) {
    const [mobile, setMobile] = useState(false);
    const [animationPlayed, setAnimationPlayed] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        AOS.init({
            once: true, // Animasyonların yalnızca bir kez çalışmasını sağlamak için
        });

        if (!animationPlayed) {
            AOS.refreshHard(); // Sayfa yüklendiğinde veya yenilendiğinde animasyonları zorla tetikler
            setAnimationPlayed(true);
        }

        if (window.innerWidth < 800) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    }, [animationPlayed]);

    let { Title, des, bgDiv1, IMG, bgDiv2 } = style;
    let { row, img, desc, title, w, h } = props;

    return (
        <div className=' mt-20'>
             {mobile ? (
            // Mobil görünüm
            <div className={style.oneOfferDiv}>
               <div className='-ml-6 mt-4'>


<Swiper
  effect={'cards'}
  grabCursor={true}
  modules={[EffectCards]}
  className="mySwiper custom-swiper"
>
  <SwiperSlide>

<div className=' flex flex-col'>


<div className=' w-44 -mt-8 -ml-3'>
<Image src={TiensLogoo} width={300} height={300}/>
</div>

<div className=' pt-12'>
    <h1 className=' font-bold text-5xl'>
        20%
    </h1>
</div>
</div>
    
  </SwiperSlide>
  <SwiperSlide>
  <div className=' flex flex-col'>


<div className=' w-44 -mt-8 -ml-3'>
<Image src={TiensLogoo} width={300} height={300}/>
</div>

<div className=' pt-12'>
    <h1 className=' font-bold text-5xl'>
        10%
    </h1>
</div>
</div>
  </SwiperSlide>
  <SwiperSlide>
  <div className=' flex flex-col'>


<div className=' w-44 -mt-8 -ml-3'>
<Image src={TiensLogoo} width={300} height={300}/>
</div>

<div className=' pt-12'>
    <h1 className=' font-bold text-5xl'>
        30%
    </h1>
</div>
</div>
  </SwiperSlide>
</Swiper>



</div>

                <div className={`${style.textContainer}`} >
                <div className={style.oneTitle}>
                        <h1>Bütün tibet məhsullarında</h1>
                        <h1>endirim kartları mövcuddur</h1>
                    </div>
                    <div className={style.excludeAllText}>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={30} height={0} />
                            <h1 className=' font-semibold'>ilk alış-verişdə 4 və ya daha artiq müxtəlif məhsul al sonrakı alış-veriş 20%</h1>
                        </div>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={23} height={0} />
                            <h1 className=' font-semibold'>ilk alış-verişdə 3 müxtəlif məhsul al sonrakı alış-veriş 10%</h1>
                        </div>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={20} height={0} />
                            <h1 className=' font-semibold'>Daha çox endirim kartı üçün elə indicə abonə ol </h1>
                        </div>
                        <button
                            onClick={() => push('/medicines')}
                            
                            className={`bg-white bg- border border-clientButtonGreen rounded-full ml-12 px-4 py-2 flex items-center gap-5 justify-center w-60 transition-all duration-300 hover:bg-clientButtonGreen hover:text-white`}
                  
                        >
                            İndi əldə et
                            <Image src={buttonVector} alt="Icon" width={17} height={0} />
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            // Desktop görünüm
            <div className={style.oneOfferDiv}>
                <div className='' data-aos='fade-right'>
                    <div className={style.oneTitle}>
                        <h1>Bütün tibet məhsullarında</h1>
                        <h1>endirim kartları mövcuddur</h1>
                    </div>
                    <div className={style.excludeAllText}>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1 className=' font-semibold'>ilk alış-verişdə 4 və ya daha artiq müxtəlif məhsul al sonrakı alış-veriş 20%</h1>
                        </div>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1 className=' font-semibold'>ilk alış-verişdə 3 müxtəlif məhsul al sonrakı alış-veriş 10%</h1>
                        </div>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1 className=' font-semibold'>Daha çox endirim kartı üçün abonə ol</h1>
                        </div>
                        <button
                            onClick={() => push('/medicines')}
                            
                            className={`bg-white bg- border border-clientButtonGreen rounded-full px-4 py-2 flex items-center gap-5 justify-center w-60 transition-all duration-300 hover:bg-clientButtonGreen hover:text-white`}
                  
                        >
                            İndi əldə et
                            <Image src={buttonVector} alt="Icon" width={17} height={0} />
                        </button>
                    </div>
                </div>

<div className='-ml-36 mt-4'>


<Swiper
  effect={'cards'}
  grabCursor={true}
  modules={[EffectCards]}
  className="mySwiper custom-swiper"
>
  <SwiperSlide>

<div className=' flex flex-col'>


<div className=' w-44 -mt-8 -ml-6'>
<Image src={TiensLogoo} width={300} height={300}/>
</div>

<div className=' pt-2'>
    <h1 className=' font-bold text-5xl'>
        20%
    </h1>
</div>
</div>
    
  </SwiperSlide>
  <SwiperSlide>
  <div className=' flex flex-col'>


<div className=' w-44 -mt-8 -ml-6'>
<Image src={TiensLogoo} width={300} height={300}/>
</div>

<div className=' pt-2'>
    <h1 className=' font-bold text-5xl'>
        10%
    </h1>
</div>
</div>
  </SwiperSlide>
  <SwiperSlide>
  <div className=' flex flex-col'>


<div className=' w-44 -mt-8 -ml-6'>
<Image src={TiensLogoo} width={300} height={300}/>
</div>

<div className=' pt-2'>
    <h1 className=' font-bold text-5xl'>
        30%
    </h1>
</div>
</div>
  </SwiperSlide>
</Swiper>
</div>
        
            </div>
        )}



            <div className=' mt-24 justify-around'>
                <div className={style.oneOfferDiv}>
                <div className={`${!mobile ? 'ml-24' : ''}`} data-aos={mobile ? 'fade-up' : 'fade-right'}>
    <Image 
        className={style.oneImage2} 
        src={bcichlesIcon} 
        alt="Icon" 
        width={mobile ? 200 : 501} // Mobilde 300, masaüstünde 501
        height={0} 
    />
</div>
                    <div className='' >
                        <div className=' mr-10'>
                            <div className={style.oneTitle}>
                                <h1>Get your drugs at</h1>
                                <h1>your doorstep</h1>
                            </div>

                            <div className={style.excludeAllText}>
                                <div className={style.excludeText}>
                                    <Image src={Exclude} alt="Icon" width={18} height={0} />
                                    <h1>Get straight delivery to your doorstep</h1>
                                </div>
                                <div className={style.excludeText}>
                                    <Image src={Exclude} alt="Icon" width={18} height={0} />
                                    <h1>We deliver within 24hrs of request</h1>
                                </div>
                                <div className={style.excludeText}>
                                    <Image src={Exclude} alt="Icon" width={18} height={0} />
                                    <h1>We guarantee speedy response</h1>
                                </div>
                                <button
                                    onClick={() => push('/medicines')}
                                    className="bg-white text- border border-clientButtonGreen rounded-[50px] px-4 py-2 flex items-center gap-5 justify-center w-60 transition-all duration-300 hover:bg-clientButtonGreen hover:text-white"
                                 // Shifts the button to the right by 100px on mobile
                                >
                                    Get prescription
                                    <Image src={buttonVector} alt="Icon" width={17} height={0} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div><svg width="349" height="381" viewBox="0 0 349 381" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.9595 117.256C38.035 79.5484 51.4795 37.9298 85.6312 17.9185C120.929 -2.76438 168.53 -5.88649 205.149 12.2592C239.716 29.388 242.144 77.0837 266.088 107.341C287.666 134.608 325.641 147.037 337.642 179.687C351.338 216.95 352.595 260.091 335.398 295.91C317.58 333.022 282.902 360.803 244.108 374.508C207.028 387.607 168.085 374.599 129.221 368.746C87.3537 362.44 32.7493 374.09 8.92283 339.086C-15.4612 303.264 19.852 256.197 23.1732 212.952C25.6784 180.334 15.9801 148.418 25.9595 117.256Z" fill="#043CAA" fill-opacity="0.3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M180.997 67.7502C213.755 60.6419 249.961 52.8817 279.09 69.4506C309.197 86.5756 331.636 120.155 333.833 154.685C335.906 187.28 301.964 209.251 289.915 239.615C279.057 266.978 286.02 300.083 267.161 322.703C245.638 348.519 214.538 367.702 180.997 370.256C146.244 372.902 111.195 359.236 84.7253 336.594C59.4243 314.952 52.4766 280.892 40.3168 249.92C27.2171 216.554 -4.439 181.449 11.1392 149.162C27.0819 116.12 76.54 122.088 109.653 106.217C134.629 94.2456 153.924 73.6246 180.997 67.7502Z" fill="#043CAA"/>
</svg>


            <div className=' mt-24 justify-around'>
            {mobile ? (
            // Mobil görünüm
            <div className={style.oneOfferDiv}>
                  <div className='' >
                    <Image className={style.oneImage} src={groupHuman} alt="Icon" width={511} height={0} />
                </div>
                <div className='' >
                    <div className={style.oneTitle}>
                        <h1>Set up your profile</h1>
                        <h1>and get refill easily</h1>
                    </div>

                    <div className={style.excludeAllText}>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1>When you are a member your refill is easier</h1>
                        </div>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1>With one click your medicine is on its way</h1>
                        </div>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1>Select a health care specialist</h1>
                        </div>
                        <button
  onClick={() => push('/contact-us')}
  className="bg-white text- border border-clientButtonGreen rounded-[50px] px-4 py-2 flex items-center gap-5 justify-center w-60 transition-all duration-300 hover:bg-clientButtonGreen hover:text-white"
 
>
  Get prescription
  <Image src={buttonVector} alt="Icon" width={17} height={0} />
</button>
                    </div>
                </div>

              
            </div>
        ) : (
            // Desktop görünüm
            <div className={style.oneOfferDiv}>
                <div className={style.oneGroupTittle}>
                    <div className={style.oneTitle}>
                        <h1>Set up your profile</h1>
                        <h1>and get refill easily</h1>
                    </div>

                    <div className={style.excludeAllText}>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1>When you are a member your refill is easier</h1>
                        </div>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1>With one click your medicine is on its way</h1>
                        </div>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1>Select a health care specialist</h1>
                        </div>
                        <button
                            onClick={() => push('/contact-us')}
                            className="bg-white text- border border-clientButtonGreen rounded-[50px] px-4 py-2 flex items-center gap-5 justify-center w-60 transition-all duration-300 hover:bg-clientButtonGreen hover:text-white"
                        >
                            Get prescription
                            <Image src={buttonVector} alt="Icon" width={17} height={0} />
                        </button>
                    </div>
                </div>

                <div className='' >
                    <Image className={style.oneImage} src={groupHuman} alt="Icon" width={511} height={0} />
                </div>
            </div>
        )}
            </div>

            <div className=' mt-44 justify-around'>
                <div className={style.oneOfferDiv}>
                    <div 
                      style={mobile ? { transform: 'translateX(-42px)' } : {}}
                    className='ml-24 ' data-aos={mobile ? 'fade-up' : "fade-right"}>
                        <Image src={feedBackImg} alt="Icon" width={420} height={0} />
                    </div>

                    <div className=''>
                        <div className=' mr-10'>
                            <Testimonial />
                        </div>
                    </div>
                </div>
            </div>

            <div data-aos="zoom-in" data-aos-delay="300" style={{ display: 'none' }}>
                {/* İçerik */}
            </div>
        </div>
    );
}

export default InfoBoxOffer;
