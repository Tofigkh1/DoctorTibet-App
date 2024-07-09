import axios from "axios";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import InfoSection from "../Shared/Components/Client/infoSection";
import InfoBoxOffer from "../Shared/Components/Client/InfoBoxOffer.tsx";
import Footer from "../Shared/Components/Client/Footer";


const MainLayout = dynamic(() => import("../Shared/Components/Layout/MainHeaderLayout"), { ssr: false });

const Home: NextPage = (props) => {
  console.log("MainLayout",MainLayout); 
  return (
    <>
      <MainLayout>
        <InfoSection />
        <InfoBoxOffer/>
        {/* <InfoBox/> */}
        <Footer/>
      </MainLayout>
    </>
  );
};

export default Home;