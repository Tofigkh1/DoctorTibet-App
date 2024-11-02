import Head from "next/head";
import styless from "./MainHeaderLayout.module.css";
import Header from "../../Components/Client/Header/Header";
import Footer from "../Client/Footer";
import React, { useEffect } from "react";
import { setUser, UserState } from "../../Redux/Featuries/User/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store/store";
import { NextSeo } from "next-seo";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const dispatch: AppDispatch = useDispatch();
   

  useEffect(() => {
    const userStr = localStorage.getItem("user_info");
    if (userStr) {
        try {
            const user: UserState = JSON.parse(userStr);
            dispatch(setUser(user));
        } catch (error) {
            console.error("Kullanıcı bilgisi parse edilirken hata oluştu:", error);
  
        }
    }
  }, [dispatch]);

  return (
    <div>
  
      <Head>
        <title>doctor-tibet.com</title>
        <meta name="Həkiminizin sağlamlığınız üçün təyin etdiyi bütün Tibet məhsulları bizdə" content="Həkiminizin sağlamlığınız üçün təyin etdiyi bütün Tibet məhsulları bizdə." />
        <link rel="icon" href="/favicon" />
      </Head>
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
      <div className={styless.main_container}>
        <div className="">
          <Header />
          <div className="md:px-8">
            {/* <Header/> */}
          </div>
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
