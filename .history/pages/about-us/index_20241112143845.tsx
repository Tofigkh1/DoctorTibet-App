import React from "react"
import ThemeToggler from "../../@/components/my-components/theme/theme-toggler"
import { useResize } from "../../Shared/Hooks/useResize";


function AboutUs(){
  let { isMobile } = useResize();
return (


    <div>

{!isMobile &&
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
}




    </div>
  
   
)
}

export default AboutUs