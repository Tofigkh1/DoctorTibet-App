import React, { useEffect, useRef, useState } from "react"
import ThemeToggler from "../../@/components/my-components/theme/theme-toggler"
import { useResize } from "../../Shared/Hooks/useResize";
import TryInfoUser from "../../Shared/Components/Client/tryInfoUserComponent";
import HamburgerBtn from "../../Shared/Components/Client/hamburgerButton";
import Nav from "../../Shared/Components/Client/Nav/Nav";
import BasketMenu from "../../Shared/Components/sliderBasket/sliderBasket";
import Auth from "../../Shared/Components/Client/Auth/Auth";
import styles from "./aboutUs.module.css"
import styled from "styled-components";
import { createTheme } from "@mui/material";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { motion } from "framer-motion";
import { Box, Tag, VStack, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { DotLoader } from "react-spinners";
import { useModalOpen } from "../../Shared/Hooks/useModalOpen";
import { getCategories, GetProducts } from "../../Services";
import { AppDispatch, RootState } from "../../Shared/Redux/Store/store";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Shared/Components/Client/productsCard/products";
import { sortDataByCreated } from "../../Shared/Utils/sortData";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import DoctorAbouImg from '../../public/Başlıqsız dizayn(2).png'
import Footer from "../../Shared/Components/Client/Footer";
import { Swiper as SwiperType } from 'swiper';

import DoctorPhoto from '../../public/Doctorphoto.jpg';
import Bacground from '../../public/homeBacground.svg';
import Medicine from "../../public/home_swiper2.jpg";
import Medicinees from "../../public/medicalbanner.jpg";
import Doctortb from "../../public/doctortb.jpg";
import ArrovRight2 from '../../public/next.png';

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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { push } = useRouter();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  let { isOpen, onClose, onOpen } = useModalOpen();
  const [isOpenn, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [chooseCategory, setChooseCategory] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isError, setIsError] = useState(false);
  let user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const getProductsByCategory = (categoryId: string) => {
    return products?.filter((product: any) => product.category_id === categoryId);
  };


  const handleMouseEnter = () => {
    setIsHovered(true);  
  };

  const handleMouseLeave = () => {
    setIsHovered(false);  
    setHoveredCategory(null); 
  };


  const handleCategoryHover = (categoryId: string | null) => {
    setHoveredCategory(categoryId);

    onClose(); 
  };

  const handleCategory = (categoryName: string | null) => {
    setChooseCategory(categoryName);
    onClose(); 
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, productsData] = await Promise.all([
          getCategories(),
          GetProducts()
        ]);

        if (categoryData?.data?.result?.data) {
          setCategories(sortDataByCreated(categoryData.data.result.data));
        }
        if (productsData?.data?.result?.data) {
          setProducts(sortDataByCreated(productsData.data.result.data));
        }
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  function onDetail(id: number) {
    router.push(`/medicines/${id}`);
  }


  
  const getAllProductsSortedByDate = () => {
    // Tüm kategorilerdeki ürünleri birleştir
    const allProducts = categories.flatMap((category: any) => getProductsByCategory(category.id));
  
    // Ürünleri tarihe göre sıralayın (en yeni en üstte olacak şekilde)
    return allProducts.sort((a: any, b: any) => new Date(b.created).getTime() - new Date(a.created).getTime());
  };

  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  const onAutoplayTimeLeft = (s: SwiperType, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };


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


  {isLoading ? (
   <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh'
  }}>
    <DotLoader color="#28e4c5" speedMultiplier={1.6} size={90} />
  </div>
  ) : (
    <div>
      <Box
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        width="100%"
        borderWidth="1px"
        borderTopRadius="0"  
        borderBottomRadius="3xl"
        overflow="hidden"
        background="linear-gradient(135deg, #7f00ff, #e100ff)"
        p={4}
        transition="all 0.3s ease"
      >
      


      <div>


  <Flex wrap="wrap" justifyContent="start" gap={3}>


    
    {categories?.map((category: any) => (
      <Text
        key={category.id}
        position="relative"
        fontSize="19px"
        letterSpacing="0.03em"
        color="white"
        cursor="pointer"
        onMouseEnter={() => handleCategoryHover(category.id)}  
        onMouseLeave={() => !isHovered && setHoveredCategory(null)}
        onClick={() => handleCategory(category.id)} 
        className="cursor-pointer"
        style={{ transition: 'background-color 0.3s ease' }}
       
        _before={{
          content: '""',
          position: 'absolute',
          width: hoveredCategory === category.id ? '100%' : '0',
          height: '2px',
          left: 0,
          bottom: '-2px',
          backgroundColor: '#26d6a1',
          transition: 'width 0.3s ease',
        }}
        _hover={{
          color: '#26d6a1',
        }}
      >
        {category.name}
      </Text>
    ))}
  </Flex>

  {hoveredCategory && (
    <MotionVStack
      align="start"
      mt={4}
      initial={{ height: 0, opacity: 0, y: -20 }}
      animate={{ height: 'auto', opacity: 1, y: 0  }}
      transition={{ duration: 0.2 }}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
    >
<SimpleGrid columns={12} spacing={3} >
      {getProductsByCategory(hoveredCategory)?.map((product: any) => (
    
        <Box
     
          key={product.id}
          borderWidth="1px"
          borderRadius="full"
          p={3}
          textAlign="center"
          background="white"
          width="100px"
          height="100px"
          onClick={() => onDetail(product.id)} 
          cursor="pointer"
        >
          <Image
          className=" ml-2 "
            src={product?.img_url}
            alt={product?.name}
            width={55}
            height={55}
  
          />
          <Text fontSize="sm" >{product.name}</Text>
        </Box>
     
      ))}
</SimpleGrid>
    </MotionVStack>
  )}
</div>

        
      </Box>


      {chooseCategory ? (
  getProductsByCategory(chooseCategory).length > 0 ? (
    <div className="w-full h-auto m-4 rounded-2xl ">
      <div className="flex flex-wrap gap-16 ">
        {getProductsByCategory(chooseCategory).map((product: any) => (
          <div key={product.id} className="border border-whiteLight3 rounded-xl ">
            <ProductCard {...product} onReadMore={() => onDetail(product.id)} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p className="text-center mt-4">Bu kategoride ürün bulunmamaktadır.</p>
  )
) : (

<div>

</div>
)}

      </div>
   )}


</div>


}



<div className=" flex justify-around gap-14 p-9">


<div className=" mt-20">
  <h1 className=" font-bold text-xl">DOKTOR TIBET</h1>
<p className=" mt-10 text-xl w-96">

Beybudov Rövşən Aslan oğlu  
1995 - ci ildə ATU-ni btirib.İxtisasca 
həkim pediatr.
Fitoterapiya,
Akupunktura,Meridianterapiya,Cinsəlterapiya,
klinik bəslənmə,
mineralterapiya,
İnsulin dirənci,metabolik pozuntular üzrə Türkiyə Egitim ,Ademer EgitimAkademiyalarında uzaqdan kurslar almış,
Tibet-Çin təbabəti məhsulları üzrə  lektor-təlimçi,qida mütəxəssisidir..
Ehtiyyatda olan t/x mayoru,Səhiyyə təşkilatçısıdır. 
-Tibet təbabəti 5000 illik resepti olan və Akupressor,Akupunktura,Meridianterapiya kimi profilaktika ,təmizləmə,
bərpaetmə,tamamlama kimi müalicə metodları ilə dünyada məşhurdur.
Ağıl,bədən və ruhun vəhdəti proqramı ilə insan vücudunun sağlam olması üçün aminturşulu,mineral,
mikroelementlər və vitaminlər vasitəsilə orqanizmdə gedən metabolik prosesləri,sinir sisteminin,endokrin vəzilərin funksiyalarını və orqanların düzgün çalışması üçün vacib maddələr mübadiləsini normal çalışmasına təkan verir.

</p>

</div>

<Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={`${styles.mySwiper} ${styles.background}`}
      >
         <SwiperSlide style={{ height: isMobile ? '570px' : '570px', position: 'relative' }}>
<div
style={{ height: '480px', width: '750px',  WebkitBorderRadius: '120px'}}
className=" bg-emerald-300  mt-12 p-5">


<div style={{ height: '420px', width: '670px',  marginLeft: '9px', }}>
 <Image alt="doctorAbout"  src={DoctorAbouImg}
              style={ { transform: 'scale(1.1)', objectPosition: 'bottom', borderRadius: '100px' }} 
         
               objectFit="cover"  
         
 />
</div>
</div>
</SwiperSlide>
        <SwiperSlide>
        <div
style={{ height: '480px', width: '750px',  WebkitBorderRadius: '120px'}}
className=" bg-emerald-300  mt-12 p-5">


<div style={{ height: '420px', width: '670px',  marginLeft: '9px', }}>
 <Image alt="doctorAbout"  src={Medicinees}
              style={ { transform: 'scale(1.1)', objectPosition: 'bottom', borderRadius: '100px' }} 
         
               objectFit="cover"  
         
 />
</div>
</div>
   
        </SwiperSlide>
        <SwiperSlide>
        <div
style={{ height: '480px', width: '760px',  WebkitBorderRadius: '120px'}}
className=" bg-emerald-300  mt-12 p-5 ">


<div style={{ height: '420px', width: '670px',  marginLeft: '14px', }}>
 <Image alt="doctorAbout"  src={Medicine}
              style={ { transform: 'scale(1.1)', objectPosition: 'bottom', borderRadius: '100px' }} 
         
               objectFit="cover"  
         
 />
</div>
</div>
        
        </SwiperSlide>
 

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
         
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
</div>






<div className=" mt-64">

</div>

<Footer/>


</div>
  


)

}

export default AboutUs;