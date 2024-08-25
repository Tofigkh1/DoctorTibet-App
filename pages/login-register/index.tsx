import React, {useEffect, useState, useLayoutEffect} from "react";
import style from './loginRegister.module.css'
import Image from "next/image";
import registerIcon from '../../public/TiensRegister.png'
import SignInForm from '../../Shared/Components/Client/login-register/loginForm/index';
import RegisterForm from '../../Shared/Components/Client/login-register/RegisterForm/index';
import {useRouter} from "next/router";
import { GetServerSideProps } from 'next';
import loginIcon from '../../public/TiensAccount.png'
import loginIcon2 from '../../public/TiensAccount2.png'
import loginIcon3 from '../../public/Login3.png'
import { UserAuth } from "../../Shared/Context";


function LoginRegister(){

  let [singin, setSingin] = useState(false)
  let [mobile, setMobile] = useState(false)
  let router = useRouter()




  useEffect(()=>{
    if(window.innerWidth<800){
      setMobile(true)
    } else(
      setMobile(false)
    )
  },[mobile])


  useLayoutEffect(() => {
    // Bu işlev, bileşen mount olduğunda çalışacak ve kullanıcı bilgilerini kontrol edecek
    const checkUser = () => {
      const user = localStorage.getItem('user_info');
      if (user) {
        // Kullanıcı bilgileri varsa yönlendirme yap
        router.replace('/');
      }
    };

    // Kullanıcıyı kontrol et
    checkUser();

    // Temizleme işlevi: Unsubscribe işlevi olarak tanımlanmış
    return () => {
      // Bu durumda, `unsubscribe` işlevinin içi boş; temizlik kodu eklenebilir
    };
  }, [router]);

return (
  <div>
   <div className={style.Body +' w-full h-full p-7 '}>
            <header  className={style.blackbg + '  h-28 flex items-center justify-between  p-9 rounded-md '}>
            <img style={{ width: '80px', height: '80px' }} className={style.logo} src="/Logo.png" alt="Logo" onClick={()=>router.push("/")}/>
             
            </header>


            <div className={mobile?' flex flex-col gap-3 ':' flex flex-row gap-3 '}>
                <div className={mobile?style.blackbg +' flex justify-center items-center mt-5 rounded-md ':style.blackbg +' flex w-3/5 justify-center items-center mt-5 rounded-md ' }>
                {singin?<Image
                src={loginIcon}
                alt='Image'
                className={style.loginIcon}
                width={700}
                height={100}
                />:
                <Image
                src={registerIcon}
                alt='Image'
             
                width={500}
                height={728}
                />}
                </div>



                <div
                className={mobile?style.loginbg +'  h-full mt-5 rounded-md':style.loginbg +' w-2/5 h-full mt-5 rounded-md'}
                >
                   <div className='flex flex-row  gap-16 justify-center h-full  mt-20'>
                    <button className={!singin? style.headerTextActive: style.headerTextDeActive }  onClick={()=>setSingin(false)}>Login</button>
                    <button className={singin? style.headerTextActive: style.headerTextDeActive } onClick={()=>setSingin(true)}>Register</button>
                   </div>
                   {singin?<RegisterForm setsingin={()=>{
                    setSingin(true)
                   }}/>:<SignInForm/>}
                   
                </div>
            </div>
        </div>
  </div>
)

}

export default LoginRegister