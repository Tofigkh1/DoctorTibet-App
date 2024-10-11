import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MainLayout from '../../../../Shared/Components/Layout/MainHeaderLayout';
import styles from './profile.module.css'
import { AppDispatch, RootState } from '../../../../Shared/Redux/Store/store';
import { useDispatch, useSelector } from 'react-redux';
import withClientAuth from '../../../../Shared/HOC/withClienAuth';
import styleds from 'styled-components';
import Nav from '../../../../Shared/Components/Client/Nav/Nav';
import { useRouter } from 'next/router';
import Auth from '../../../../Shared/Components/Client/Auth/Auth';
import Navbar from '../../../../Shared/Components/Client/User-Layout/index';





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

const Logo = styleds.h1`
  font-size: 24px;
  margin: 0;
`;

const Navi = styleds.nav`
  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 15px;
  }

  & li {
    display: inline;
  }

  & a {
    color: white;
    text-decoration: none;
  }
`;

const MainSection = styleds.section`
  position: relative;
  display: flex;
  padding: 50px;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
`;

const MainContent = styleds.div`
  flex: 1;
`;

const ImageWrapper = styleds.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    max-width: 100%;
    height: auto;
  }
`;

const Curve = styleds.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  background: #7f00ff;
  clip-path: ellipse(80% 50% at 50% 0%);
`;

const DepartmentsSection = styleds.section`
  padding: 50px;
  background-color: #fff;
`;

const DepartmentList = styleds.div`
  display: flex;
  justify-content: space-around;
`;

const Department = styleds.div`
  text-align: center;
  max-width: 150px;
`;









const theme = createTheme();

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
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

const StyledBadge2 = styleds(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'red',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
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

const SmallAvatar = styleds(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));




function Profile() {

  let { push } = useRouter();

  let [IMG,setIMG]=useState<any>("")

let [mobile,setmobile]=useState(false)

useEffect(()=>{
    if(window.innerWidth<800){
        setmobile(true)
    }else{
        setmobile(false)
    }
},[mobile])

let {Profile, headText, addPhoto} = styles
const dispatch: AppDispatch = useDispatch();
const user = useSelector((state: RootState) => state.user);


const isLoggedIn = localStorage.getItem('access_token') && localStorage.getItem('user_info');

  return (

 <>
 

<Container>
  <Header>
    
  <div className={styles.cursor}>
      <img  onClick={() => push('/')} style={{ width: '90px', height: '90px' }} className={styles.logo} src="/Logo.png" alt="Logo" />
  </div>

   
      <Nav/>

      <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2}>
        {isLoggedIn ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src="" />
          </StyledBadge>
        ) : (
          <StyledBadge2
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="Travis Howard" src="" />
          </StyledBadge2>
        )}
      </Stack>
    </ThemeProvider>
      
    {/* <div className={styles.mobile_hide}>
          <Auth/>
    </div> */}


  </Header>

  <MainSection>
    <Curve />
  
  
  </MainSection>


</Container>







 </>

 

   
  );
}


export default withClientAuth(Profile) 