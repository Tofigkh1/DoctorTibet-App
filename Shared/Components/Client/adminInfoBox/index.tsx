import React, { useEffect } from "react";
import Image from "next/image";
import style from "./infoBox.module.css"
import { useRouter } from "next/router";
import {shortText} from "../../../Utils/shortText";
import JupenSpon from "../../../../public/jupenSpon.svg";
import MzorSpon from "../../../../public/mzorSpon.svg";
import GskSpon from "../../../../public/gskSpon.svg"
import ColorLine from "../../../../public/sectionColorLine.svg"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from "react-slick";

interface Props {
    img: any,
    Title: string,
    Desc: string,
    ProductID: string
}

function InfoBox (props:Props){
    let router = useRouter()

    const {title, des, box, icon} = style
    let {img, Title, Desc, ProductID} = props

    useEffect(() => {
        AOS.init();
      }, []);

      const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 5000,
        cssEase: "linear",
        infinite: true,
        arrows: false,
        variableWidth: true,
        dots: true,
      };
    
    return (

        <div className={style.bodyBackground}>

            <div className={style.sectionText} data-aos='fade-up'>
            <h1>Our Sponsors</h1>
            <Image src={ColorLine} alt="Icon" width={170} height={0}  />
            </div>

           

        <div className={style.sectionDiv} data-aos='fade-up'>
        {/* <div className={box}> */}



<div className="  mt-14">
<Slider {...settings}>
        <div>
          
            <Image src={JupenSpon} alt="Icon" width={170} height={0}  />

        </div>

        <div>
        <Image src={MzorSpon} alt="Icon" width={170} height={0}  />
            

        </div>

        <div>
        <Image src={GskSpon} alt="Icon" width={90} height={0}  />
            

        </div>

        <div>
            {/* <img src={img} className={icon} /> */}
            <Image src={JupenSpon} alt="Icon" width={170} height={0}  />
            

        </div>

        <div>
        <Image src={MzorSpon} alt="Icon" width={170} height={0}  />
            

        </div>

        <div>
        <Image src={GskSpon} alt="Icon" width={90} height={0}  />
        
        </div>


        <div>
            {/* <img src={img} className={icon} /> */}
            <Image src={JupenSpon} alt="Icon" width={170} height={0}  />
            

        </div>

        <div>
        <Image src={MzorSpon} alt="Icon" width={170} height={0}  />
            

        </div>

        <div>
        <Image src={GskSpon} alt="Icon" width={90} height={0}  />
        
        </div>



        <div>
            {/* <img src={img} className={icon} /> */}
            <Image src={JupenSpon} alt="Icon" width={170} height={0}  />
            

        </div>

        <div>
        <Image src={MzorSpon} alt="Icon" width={170} height={0}  />
            

        </div>

        <div>
        <Image src={GskSpon} alt="Icon" width={90} height={0}  />
        
        </div>
        </Slider>
</div>
       


        </div>

        <div className="mt-10">

</div>

        <div className={style.sectionText} data-aos='fade-up'>
            <h1 >Key Benefits</h1>
            <Image src={ColorLine} alt="Icon" width={170} height={0}  />
        </div>

            
     

            <div>
                <div data-aos="zoom-in" data-aos-delay="300" style={{ display: 'none' }}>
                </div>
            </div>

        </div>
        
      
    );
}

export default InfoBox;