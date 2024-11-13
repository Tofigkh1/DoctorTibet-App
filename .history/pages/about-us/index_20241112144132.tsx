import React from "react"
import ThemeToggler from "../../@/components/my-components/theme/theme-toggler"
import { useResize } from "../../Shared/Hooks/useResize";
import TryInfoUser from "../../Shared/Components/Client/tryInfoUserComponent";
import HamburgerBtn from "../../Shared/Components/Client/hamburgerButton";
import Nav from "../../Shared/Components/Client/Nav/Nav";




const Container = styled.div`
  background: linear-gradient(135deg, #7f00ff, #e100ff);
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #7f00ff, #e100ff);
  padding: 10px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainSection = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Curve = styled.div`
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
    width: '16px',
    height: '16px',
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
      transform: 'scale(0.8)',
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
      transform: scale(0.8);
      opacity: 1;
    }
    100% {
      transform: scale(2.4),
      opacity: 0;
    }
  }
`;

const LargeAvatar = styled(Avatar)({
  width: 100,
  height: 100,
});

const StyledSwiperSlide = styled(SwiperSlide)`
  transition: background-color 0.3s ease; /* Hover efekti için geçiş efekti */
  
  &:hover {
    background-color: green; /* Hover efektinde arka plan rengi yeşil olacak */
  }
`;


const MotionVStack = motion(VStack); 

function AboutUs(){
  let { isMobile } = useResize();
return (


    <div>

{!isMobile &&
<div>
<Container>
  <div className="  ml-72">
        <TryInfoUser/>
        </div>
  <div>
      {isMobile && (
      <div className={styles.hambrBtn}>
        <HamburgerBtn />
      </div>
    )}
      </div>
    <Header>
      <div className="flex">
        <img
          onClick={() => push('/')}
          style={{ width: '90px', height: '90px' }}
          className={styles.logo}
          src="/Logo.png"
          alt="Logo"
        />
      </div>

      <div>
      {!isMobile && (
      <div className={styles.hambrBtn}>
        <Nav />
      </div>
    )}
      </div>
     
    
      
      <div className="flex gap-4 z-50">
      {accessToken && (
     
     <BasketMenu/>
    )}
                    <Auth/>
  </div>
    </Header>
  
    <MainSection>
      <Curve />
    </MainSection>
  </Container>
</div>
}




    </div>
  
   
)
}

export default AboutUs