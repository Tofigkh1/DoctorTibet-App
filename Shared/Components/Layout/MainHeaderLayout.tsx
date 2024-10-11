import Head from "next/head";
import styless from "./MainHeaderLayout.module.css";
import Header from "../../Components/Client/Header/Header";
import Footer from "../Client/Footer";
import React, { useEffect } from "react";
import { setUser, UserState } from "../../Redux/Featuries/User/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store/store";

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
        <title>Tiens App</title>
        <meta name="DoctorTibet" content="Doctor Tibet by Tiens App" />
        <link rel="icon" href="/favicon" />
      </Head>
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
