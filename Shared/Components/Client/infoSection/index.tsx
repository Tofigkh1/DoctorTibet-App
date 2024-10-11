import React, { useEffect, useState } from 'react';
import InfoBox from '../adminInfoBox';
import styles from "./infoSection.module.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Props {
    data: any,
    TITLE: string,
    DES: string,
    ProductID: string
}



function InfoSection(props: Props) {
    const [animationPlayed, setAnimationPlayed] = useState(false);

    useEffect(() => {
        AOS.init({
            once: true, // Animasyonların yalnızca bir kez çalışmasını sağlamak için
        });

        if (!animationPlayed) {
            AOS.refreshHard(); // Sayfa yüklendiğinde veya yenilendiğinde animasyonları zorla tetikler
            setAnimationPlayed(true);
        }
    }, [animationPlayed]);

    let {
        data,
        TITLE,
        DES,
        ProductID
    } = props;

    const { Title, des, div } = styles;
    let newData = [];
    if (data && data.length) {
        newData = data.slice(-3);
    }

    return (
        <div className=''>
            <h2 className={Title} data-aos='fade-up'>{TITLE}</h2>
            <p className={des} data-aos='fade-up'>{DES}</p>
            <div className='' data-aos='fade-up'>
            <InfoBox 
                    img={data[0]?.img || ''} 
                    Title={TITLE} 
                    Desc={DES} 
                    ProductID={ProductID} 
                />
            </div>

            <div>
                <div data-aos="zoom-in" data-aos-delay="300" style={{ display: 'none' }}>
                </div>
            </div>
        </div>
    );
}

export default InfoSection;
