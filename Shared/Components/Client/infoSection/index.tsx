import React, { useEffect, useState } from 'react';
import InfoBox from '../adminInfoBox';
import styles from "./infoSection.module.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { shortText } from '../../../Utils/shortText';

interface Props {
    data: any,
    TITLE: string,
    DES: string
}

function InfoSection(props: Props) {
    let [mobile, setMobile] = useState(false);

    useEffect(() => {
        AOS.init(); 
        AOS.refresh();
        if (window.innerWidth < 800) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    }, []);

    let {
        data,
        TITLE,
        DES
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
                <InfoBox />
            </div>

            <div>
                <div data-aos="zoom-in" data-aos-delay="300" style={{ display: 'none' }}>
                </div>
            </div>
            
        </div>
    );
}

export default InfoSection;
