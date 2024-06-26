import axios from "axios";
import dynamic from "next/dynamic";
import { NextPage } from "next";


const MainLayout = dynamic(() => import("../Shared/Components/Layout/MainHeaderLayout"), { ssr: false });

const Home: NextPage = (props) => {
  console.log("MainLayout",MainLayout); 
  return (
    <>
      <MainLayout />
    </>
  );
};

export default Home;