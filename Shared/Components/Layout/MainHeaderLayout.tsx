import Head from "next/head"
import styless from "./MainHeaderLayout.module.css"




const MainLayout = ({children}) => {
    <div>
        <Head>
            <title>Tiens App</title>
            <meta name="DoctorTibet" content="Doctor Tibet by Tiens App"/>
            <link rel="icon" href="/favicon" />
        </Head>
        <div>
            <div className="md:px-8">
               <Header/>

            </div>
        </div>
    </div>
}