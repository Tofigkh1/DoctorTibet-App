import React, { useEffect, useState } from 'react';
import style from './infoBoxOffer.module.css'
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MedicinesIcon from '../../../../public/MedicinesIcon.svg'
import Exclude from '../../../../public/Exclude.svg';
import buttonVector from '../../../../public/buttonVector.svg'
import bcichlesIcon from '../../../../public/bcichlesIcon.svg'
import groupHuman from '../../../../public/groupHuman.svg'
import medicinesHomeImage from '../../../../public/medicinesHomeImage.svg'
import patternIcon from '../../../../public/patternIcon.svg'
import feedBackImg from '../../../../public/Feedback.jpg'
import feedBack2 from '../../../../public/Feedback2.jpg'
import Testimonial from '../Testimol';

interface Props{
    row:boolean,
    img:any,
    desc:string,
    title:string,
    w:number,
    h:number
}



function InfoBoxOffer (props:Props){
    let [mobile,setMobile] = useState(false)

    useEffect(() => {
        AOS.refresh();
        if(window.innerWidth<800){
            setMobile(true)
        }else{
            setMobile(false)
        }
    },[]);

    let {Title,des,bgDiv1,IMG,bgDiv2}=style
    let {row,img,desc,title,w,h}=props

    return (
        <div className={style.bodyBackground} >

<div className={style.oneOfferDiv}>
<div className='' data-aos={mobile?'fade-up':"fade-right"}>


<div className={style.oneTitle}>
<h1>All your Medicine</h1>
<h1>needs in one place</h1>
</div>


<div className={style.excludeAllText}>
<div className={style.excludeText}>
    <Image  src={Exclude} alt="Icon" width={18} height={0}  />
    <h1>Search and find all kind of medicine</h1>
</div> 
<div className={style.excludeText}>
    <Image  src={Exclude} alt="Icon" width={18} height={0}  />
    <h1>We have medicines for special case treatments</h1>
</div> 
<div className={style.excludeText}>
    <Image  src={Exclude} alt="Icon" width={18} height={0}  />
    <h1>Get notified when your medicine is available</h1>
</div> 
<button className="bg-white text- border border-clientButtonGreen rounded-[50px] px-4 py-2 flex items-center gap-5 justify-center w-60 transition-all duration-300 hover:bg-clientButtonGreen hover:text-white  " >Get prescription<Image  src={buttonVector} alt="Icon" width={17} height={0}  /></button>
</div>





</div>

<div className='' data-aos={mobile?'fade-up':"fade-left"}>
<Image className={style.oneImage} src={MedicinesIcon} alt="Icon" width={511} height={0}  />
</div >

        </div>
     



<div className=' mt-24 justify-around'>
<div className={style.oneOfferDiv}>


<div className='ml-24' data-aos={mobile?'fade-up':"fade-right"}>
<Image className={style.oneImage} src={bcichlesIcon} alt="Icon" width={501} height={0}  />
</div >


<div className='' data-aos={mobile?'fade-up':"fade-left"}>



<div className=' mr-10'>
<div className={style.oneTitle}>
<h1>Get your drugs at</h1>
<h1>your doorstep</h1>
</div>


<div className={style.excludeAllText}>
<div className={style.excludeText}>
    <Image  src={Exclude} alt="Icon" width={18} height={0}  />
    <h1>Get straigh delivery to your doorstep</h1>
</div> 
<div className={style.excludeText}>
    <Image  src={Exclude} alt="Icon" width={18} height={0}  />
    <h1>We deliver within 24hrs of request</h1>
</div> 
<div className={style.excludeText}>
    <Image  src={Exclude} alt="Icon" width={18} height={0}  />
    <h1>We guarantee speedily response</h1>
</div> 
<button className="bg-white text- border border-clientButtonGreen rounded-[50px] px-4 py-2 flex items-center gap-5 justify-center w-60 transition-all duration-300 hover:bg-clientButtonGreen hover:text-white  " >Get prescription<Image  src={buttonVector} alt="Icon" width={17} height={0}  /></button>
</div>

</div>







</div>



</div>
</div>



<div className=' mt-24 justify-around'>
<div className={style.oneOfferDiv}>
<div className='' data-aos={mobile?'fade-up':"fade-right"}>


<div className={style.oneTitle}>
<h1>Set up your profile</h1>
<h1>and get refill easily</h1>
</div>


<div className={style.excludeAllText}>
<div className={style.excludeText}>
    <Image  src={Exclude} alt="Icon" width={18} height={0}  />
    <h1>When you are a member your refill is easier</h1>
</div> 
<div className={style.excludeText}>
    <Image  src={Exclude} alt="Icon" width={18} height={0}  />
    <h1>With one click your medicine is on it’s way</h1>
</div> 
<div className={style.excludeText}>
    <Image  src={Exclude} alt="Icon" width={18} height={0}  />
    <h1>Select a health care specialist</h1>
</div> 
<button className="bg-white text- border border-clientButtonGreen rounded-[50px] px-4 py-2 flex items-center gap-5 justify-center w-60 transition-all duration-300 hover:bg-clientButtonGreen hover:text-white  " >Get prescription<Image  src={buttonVector} alt="Icon" width={17} height={0}  /></button>
</div>





</div>

<div className='' data-aos={mobile?'fade-up':"fade-left"}>
<Image className={style.oneImage} src={groupHuman} alt="Icon" width={511} height={0}  />
</div >

        </div>
</div>


<div className=' mt-24 justify-around'>
<div className={style.oneOfferDiv}>


<div className='ml-24 mt-2' data-aos={mobile?'fade-up':"fade-right"}>

<Image src={feedBackImg} alt="Icon" width={420} height={0}  />
</div >


<div className='' data-aos={mobile?'fade-up':"fade-left"}>



<div className=' mr-10'>

<Testimonial/>
</div>

</div>



</div>
</div>




        <div data-aos="zoom-in" data-aos-delay="300" style={{display: 'none'}}>
            {/* Содержимое */}
        </div>


    </div>
    )

}

export default InfoBoxOffer