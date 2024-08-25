import React, { useEffect, useState } from 'react';
import loadingMedicalGif from '../../../public/loadingMedical.gif'
import loadingMedicalGif2 from '../../../public/loadingMedical2.gif'
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Nav from '../../../Shared/Components/Client/Nav/Nav';
import Navbar from '../../../Shared/Components/Client/User-Layout';
import UploadImage from '../../../Shared/Components/uploadImage/UploadImage';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Shared/Redux/Store/store';
import withClientAuth from '../../../Shared/HOC/withClienAuth';
import styleds from 'styled-components';
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../../server/configs/firebase";
import Image from 'next/image';
import Footer from '../../../Shared/Components/Client/Footer';
import UserForm from '../../../Shared/Components/Client/userForm';
import Auth from '../../../Shared/Components/Client/Auth/Auth';


// Styled Components
const Container = styleds.div`
  font-family: Arial, sans-serif;
`;

const Header = styleds.header`
  background: linear-gradient(135deg, #7f00ff, #e100ff);
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainSection = styleds.section`
  position: relative;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;

`;

const Curve = styleds.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 99%;
  background: #7f00ff;
  clip-path: ellipse(80% 50% at 50% 0%);
`;

const theme = createTheme();
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    width: '16px', // Boyutu artırdık
    height: '16px', // Boyutu artırdık
    borderRadius: '50%',
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '16px',
      height: '16px',
      borderRadius: '20px',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const StyledBadge2 = styled(Badge)`
  & .MuiBadge-badge {
    background-color: red;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.background.paper};
  }
  @keyframes ripple {
    0% {
      transform: scale(.8);
      opacity: 1;
    }
    100% {
      transform: scale(2.4);
      opacity: 0;
    }
  }
`;

const LargeAvatar = styled(Avatar)({
  width: 100,
  height: 100,
});

function Profile() {
  const { push } = useRouter();
  const [IMG, setIMG] = useState([]);
  const [downloadURL, setDownloadURL] = useState(''); 
  const [loading, setLoading] = useState(false); 

  const [mobile, setmobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  console.log("reduxUser",user);



 


  useEffect(() => {
    if (window.innerWidth < 800) {
      setmobile(true);
    } else {
      setmobile(false);
    }

    const token = localStorage.getItem('access_token');
if (!token) {
  // Eğer token yoksa, kullanıcıyı giriş sayfasına yönlendirin
  push('/login');
}

    const userInfo = localStorage.getItem('user_info');
    if (token && userInfo) {
      setIsLoggedIn(true);
    }
  }, [mobile]);


  

  useEffect(() => {
    fetchProfileImage();
  }, []);

  const fetchProfileImage = async () => {
    setLoading(true); // Yüklenme durumu başlat
    const q = query(collection(db, "images"), orderBy("timestamp", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDownloadURL(doc.data().url);
    });
    setLoading(false); // Yüklenme durumu sona erdir
  };

  useEffect(() => {
    if (IMG.length > 0) {
      setDownloadURL(IMG[0]?.data_url || '');
    }
  }, [IMG]);

  


  return (
    <>
      <Container>
        <Header>
          <div className={styles.cursor}>
            <img
              onClick={() => push('/')}
              style={{ width: '90px', height: '90px' }}
              className={styles.logo}
              src="/Logo.png"
              alt="Logo"
            />
          </div>
          <Nav />

          <div>
           <Auth/>
          </div>
          
        </Header>

        <MainSection>
          <Curve />
        </MainSection>
        
      </Container>

      <div className="px-1 pb-[20px]">
       

        <div className="flex gap-10">
          
          <div className={mobile ? 'hidden' : ' w-80'}>
            <Navbar active={1} />
          </div>

         


          <div className=" w-9/12 h-60 mt-4 rounded-2xl mr-5">

          <div className=' flex gap-3'>
          <h1 className=' font-bold text-2xl'>Profile ></h1>
          <h1 className='  text-fontcolorhow text-2xl'>Dashboard</h1>
          </div>
         
            {loading ? (
             <Image className=' ml-52' width={600} height={500} src={loadingMedicalGif}/>
            ) : downloadURL ? (
              <div style={{ width: '100%', height: '300px', position: 'relative'}}>

                <Image
                  src={downloadURL}
                  alt="Uploaded Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl -z-40 mt-12"
                />
          
                <div className=" right-0 z-50 mt-72 mr-7 absolute">
                      <UploadImage setImageList={setIMG} IMG={IMG[0]?.data_url} uerPage={true} />
                </div>
              </div>
            ) : (
              <div className="w-9/12 h-60 mt-4 rounded-2xl mr-5" />
            )}
 
            <div className=" ml-28 bg-white rounded-full w-28 h-28 pl-1.5 pt-2">
              <ThemeProvider theme={theme}>
                <Stack direction="row" spacing={2}>
                  {isLoggedIn ? (
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <LargeAvatar alt="Remy Sharp" src="" />
                    </StyledBadge>
                  ) : (
                    <StyledBadge2
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <LargeAvatar alt="Travis Howard" src="" />
                    </StyledBadge2>
                  )}
                </Stack>
              </ThemeProvider>

            </div>
            
            <div className=' w-9/12 mt-12 z-50 h-auto'>
        <UserForm img={IMG}/>
        </div>
           
          </div>

          
         
        </div>


      
      </div>

      <Footer/>
    </>
  );
}

export default withClientAuth(Profile);