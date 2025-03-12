// import axios from "axios";
// import dynamic from "next/dynamic";
// import { GetStaticPropsContext, NextPage } from "next";
// import InfoSection from "../Shared/Components/Client/infoSection";
// import InfoBoxOffer from "../Shared/Components/Client/InfoBoxOffer.tsx";
// import Footer from "../Shared/Components/Client/Footer";
// import { useEffect, useState } from 'react';
// import MedicinesIcon from '../public/MedicinesIcon.svg';
// import { NextSeo } from "next-seo";

// const MainLayout = dynamic(() => import("../Shared/Components/Layout/MainHeaderLayout"), { ssr: false });

// interface Props {
//     row: boolean,
//     img: any,
//     desc: string,
//     title: string,
//     w: number,
//     h: number
// }

// const Home: NextPage = (props) => {
//   // Örnek olarak data, TITLE, ve DES sabit veriler
//   const data = { id: 1, name: "Example Data" };
//   const TITLE = "";
//   const DES = "";

//   return (
//     <div>
//        <NextSeo
//         title="doctor-tibet.com"
//         description="Həkiminizin sağlamlığınız üçün təyin etdiyi bütün Tibet məhsulları bizdə."
//         canonical="https://www.doctor-tibet.com"
//         openGraph={{
//           url: 'https://www.doctor-tibet.com',
//           title: 'doctor-tibet.com',
//           description: 'Həkiminizin sağlamlığınız üçün təyin etdiyi bütün Tibet məhsulları bizdə.',
//           images: [{ url: 'https://www.doctor-tibet.com' }],
//           site_name: 'doctor-tibet.com',
//         }}
//       />
//       <MainLayout>
//       <InfoSection 
//   data={data} 
//   TITLE={TITLE} 
//   DES={DES} 
//   ProductID={data.id.toString()}  // ProductID özelliğini ekleyin
// />
//         <InfoBoxOffer
//     row={true}
//     img={MedicinesIcon}
//     desc=""
//     title=""
//     w={511}
//     h={400}
// />

//       </MainLayout>
//     </div>
//   );
// };





// export default Home;


import axios from "axios";
import dynamic from "next/dynamic";
import { GetStaticPropsContext, NextPage } from "next";
import InfoSection from "../Shared/Components/Client/infoSection";
import InfoBoxOffer from "../Shared/Components/Client/InfoBoxOffer.tsx";
import Footer from "../Shared/Components/Client/Footer";
import { useEffect, useState } from 'react';
import MedicinesIcon from '../public/MedicinesIcon.svg'; 
import { NextSeo } from "next-seo";
// import {Chatbot} from "../Shared/Components/Client/AiChatBot/Chatbot";

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
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  // Örnek olarak data, TITLE, ve DES sabit veriler
  const data = { id: 1, name: "Example Data" };
  const TITLE = "";
  const DES = "";

  return (
    <div className="home-container relative min-h-screen">
      {!isChatVisible && (
        <div
          className="fixed bottom-4 right-4 flex justify-center items-center w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 z-[99999] cursor-pointer"
          onClick={toggleChat}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-bot"
          >
            <path d="M12 8V4H8"/>
            <rect width="16" height="12" x="4" y="8" rx="2"/>
            <path d="M2 14h2"/>
            <path d="M20 14h2"/>
            <path d="M15 13v2"/>
            <path d="M9 13v2"/>
          </svg>
        </div>
      )}
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

