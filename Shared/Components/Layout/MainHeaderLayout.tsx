import Head from "next/head"
import styless from "./MainHeaderLayout.module.css"
import Header from "../../Components/Client/Header/Header"
import Footer from "../Client/Footer";
import React, {useEffect} from "react";
import { setUser } from "../../Redux/Featuries/User/userSlice";
import { UseSelector, useDispatch } from "react-redux";






const MainLayout = ({children}) => {
    const dispatch = useDispatch();
    useEffect(()=> {
        let user = localStorage.getItem("user_info");
        if(user){
            user = JSON.parse(user);
            if(user) dispatch(setUser(user));
        }
    }, [])

    return (
        <div>
        <Head>
            <title>Tiens App</title>
            <meta name="DoctorTibet" content="Doctor Tibet by Tiens App"/>
            <link rel="icon" href="/favicon" />
        </Head>
        <div className={styless.main_container}>
            <div className="">
               <Header/>
            <div className="md:px-8">
               {/* <Header/> */}
            </div>
            {children}
            <Footer/>
        </div>
    </div>
    </div>
    );
}

export default MainLayout;