import Head from "next/head"
import styless from "./MainHeaderLayout.module.css"
import Header from "../../Components/Client/Header/Header"
import Footer from "../Client/Footer";






const MainLayout = ({children}) => {

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
            
        </div>
    </div>
    );
}

export default MainLayout