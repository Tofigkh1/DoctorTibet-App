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
                <div className={`${style.imageContainer}`} >
                    <Image className={style.oneImage} src={MedicinesIcon} alt="Icon" width={511} height={0} />
                </div>

                <div className={`${style.textContainer}`} >
                    <div className={style.oneTitle}>
                        <h1>All your Medicine</h1>
                        <h1>needs in one place</h1>
                    </div>
                    <div className={style.excludeAllText}>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1>Search and find all kind of medicine</h1>
                        </div>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1>We have medicines for special case treatments</h1>
                        </div>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1>Get notified when your medicine is available</h1>
                        </div>

                        
                        <button
                   
                        className={`bg-white bg border border-clientButtonGreen rounded-full px-4 py-2 flex items-center gap-5 justify-center w-60 transition-all duration-300 hover:bg-clientButtonGreen hover:text-white`}
                  
                      
                            onClick={() => push('/medicines')}
                            
                      
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
                <div className='' data-aos='fade-right'>
                    <div className={style.oneTitle}>
                        <h1>Bütün tibet məhsullarında</h1>
                        <h1>endirim kartları mövcuddur</h1>
                    </div>
                    <div className={style.excludeAllText}>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1>4 müxtəlif məhsul al sonrakı ali 20%</h1>
                        </div>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1>We have medicines for special case treatments</h1>
                        </div>
                        <div className={style.excludeText}>
                            <Image src={Exclude} alt="Icon" width={18} height={0} />
                            <h1>Get notified when your medicine is available</h1>
                        </div>
                        <button
                            onClick={() => push('/medicines')}
                            
                            className={`bg-white bg- border border-clientButtonGreen rounded-full px-4 py-2 flex items-center gap-5 justify-center w-60 transition-all duration-300 hover:bg-clientButtonGreen hover:text-white`}
                  
                        >
                            Get prescription
                            <Image src={buttonVector} alt="Icon" width={17} height={0} />
                        </button>
                    </div>
                </div>

                {/* <div className='' data-aos='fade-left'>
                    <Image className={style.oneImage} src={MedicinesIcon} alt="Icon" width={511} height={0} />
                </div> */}

<Swiper
  effect={'cards'}
  grabCursor={true}
  modules={[EffectCards]}
  className="mySwiper custom-swiper"
>
  <SwiperSlide>Slide 1</SwiperSlide>
  <SwiperSlide>Slide 2</SwiperSlide>
  <SwiperSlide>Slide 3</SwiperSlide>
</Swiper>

        
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
            </div>

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
                <div className=''>
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

            <div className=' mt-24 justify-around'>
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
