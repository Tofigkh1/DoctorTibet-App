import axios from "axios";
import dynamic from "next/dynamic";
import { GetStaticPropsContext, NextPage } from "next";
import InfoSection from "../Shared/Components/Client/infoSection";
import InfoBoxOffer from "../Shared/Components/Client/InfoBoxOffer.tsx";
import Footer from "../Shared/Components/Client/Footer";
import { useEffect, useState } from 'react';
import MedicinesIcon from '../public/MedicinesIcon.svg';
import { NextSeo } from "next-seo";

const MainLayout = dynamic(() => import("../Shared/Components/Layout/MainHeaderLayout"), { ssr: false });

interface Props {
    row: boolean,
    img: any,
    desc: string,
    title: string,
    w: number,
    h: number
}

const Home: NextPage = (props) => {
  // Örnek olarak data, TITLE, ve DES sabit veriler
  const data = { id: 1, name: "Example Data" };
  const TITLE = "";
  const DES = "";

  return (
    <div>
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
      <MainLayout>
      <InfoSection 
  data={data} 
  TITLE={TITLE} 
  DES={DES} 
  ProductID={data.id.toString()}  // ProductID özelliğini ekleyin
/>
        <InfoBoxOffer
    row={true}
    img={MedicinesIcon}
    desc=""
    title=""
    w={511}
    h={400}
/>

      </MainLayout>
    </div>
  );
};





export default Home;



