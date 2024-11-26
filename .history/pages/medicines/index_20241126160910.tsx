import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Tag, VStack, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, UserState } from "../../Shared/Redux/Featuries/User/userSlice";
import loadingMedicalGif from '../../public/loadingMedical.gif';
import styled from "styled-components";
import { createTheme } from "@mui/material";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { getCategories, GetProducts } from "../../Services";
import { sortDataByCreated } from "../../Shared/Utils/sortData";
import styles from './medicines.module.css';

import recordButton from '../../public/recordbutton.png';
import Nav from "../../Shared/Components/Client/Nav/Nav";
import Auth from "../../Shared/Components/Client/Auth/Auth";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { useModalOpen } from "../../Shared/Hooks/useModalOpen";
import Image from "next/image";
import dynamic from "next/dynamic";
import { DotLoader } from "react-spinners";
import { motion } from "framer-motion";
import BasketMenu from "../../Shared/Components/sliderBasket/sliderBasket";
import { AppDispatch, RootState } from "../../Shared/Redux/Store/store";
import HamburgerBtn from "../../Shared/Components/Client/hamburgerButton";
import { useResize } from "../../Shared/Hooks/useResize";
import TryInfoUser from "../../Shared/Components/Client/tryInfoUserComponent";
import Footer from "../../Shared/Components/Client/Footer";

const ProductCard = dynamic(() => import('../../Shared/Components/Client/productsCard/products'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

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

function Medicines() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [chooseCategory, setChooseCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  let { isOpen, onClose, onOpen } = useModalOpen();
  const [isOpenn, setIsOpen] = useState(false);
  const { push } = useRouter();
  const router = useRouter();
  let { isMobile } = useResize();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  let user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('user_info');
    setAccessToken(token);
}, [user]);

  useEffect(() => {
    let userStr = localStorage.getItem("user_info");
    if (userStr) {
      try {
          const user: UserState = JSON.parse(userStr);
          dispatch(setUser(user));
      } catch (error) {
          console.error("Kullanıcı bilgisi parse edilirken hata oluştu:", error);

      }
  }
  }, [dispatch]);

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

  const getProductsByCategory = (categoryId: string) => {
    return products?.filter((product: any) => product.category_id === categoryId);
  };

  const handleCategory = (categoryName: string | null) => {
    setChooseCategory(categoryName);
    onClose(); 
  };

  const handleMouseEnter = () => {
    setIsHovered(true);  
  };

  const handleMouseLeave = () => {
    setIsHovered(false);  
    setHoveredCategory(null); 
  };

  // function onDetail(id: number) {
  //   router.push('medicines/' + id);
  // }

  const handlePrint = () => {
    window.print();
  };

  function onDetail(id: number) {
    router.push(`/medicines/${id}`);
  }



  const handleCategoryHover = (categoryId: string | null) => {
    setHoveredCategory(categoryId);

    onClose(); 
  };


  const getAllProductsSortedByDate = () => {
    // Tüm kategorilerdeki ürünleri birleştir
    const allProducts = categories.flatMap((category: any) => getProductsByCategory(category.id));
  
    // Ürünleri tarihe göre sıralayın (en yeni en üstte olacak şekilde)
    return allProducts.sort((a: any, b: any) => new Date(b.created).getTime() - new Date(a.created).getTime());
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
        <div className=" ">
        <Image src={recordButton} width={20} height={10}/>
        {category.name}
        </div>
      
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

      <div className="flex  justify-center    flex-col">
        
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
  // Kategori seçilmediğinde tüm ürünleri sıralı olarak göster
  <div className="w-full h-auto p-4 rounded-2xl ">
    <div className="flex flex-wrap mt-6 gap-16 ">
      {getAllProductsSortedByDate().map((product: any) => (
        <div key={product.id} className="border border-whiteLight3 rounded-xl ml-3  ">
          <ProductCard {...product} onReadMore={() => onDetail(product.id)} />
        </div>
      ))}
    </div>
  </div>
)}




      </div>
    </div>
  )}

  </div>
}







{isMobile &&
  <div>
  <Container>
  <div className='  absolute '>
          <TryInfoUser/>
          </div>
          
  <div className=" ">
      {isMobile && (
      <div className={styles.hambrBtn}>
        <HamburgerBtn />
      </div>
    )}
      </div>


    <Header>
      <div className="flex ">
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
<SimpleGrid columns={4} spacing={3} >
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

      <div className="flex  justify-center flex-col">
      {chooseCategory ? (
  getProductsByCategory(chooseCategory).length > 0 ? (
    <div className="w-full h-auto p-4 rounded-2xl pl-12 ">
      <div className="flex flex-wrap mt-6 gap-16 ">
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
  // Kategori seçilmediğinde tüm ürünleri sıralı olarak göster
  <div className="w-full h-auto p-4 rounded-2xl pl-9 ">
    <div className="flex flex-wrap mt-6 gap-16 ">
      {getAllProductsSortedByDate().map((product: any) => (
        <div key={product.id} className="border border-whiteLight3 rounded-xl ml-3 ">
          <ProductCard {...product} onReadMore={() => onDetail(product.id)} />
        </div>
      ))}
    </div>
  </div>
)}
      </div>
    </div>
  )}

  </div>
}

<div className=" mt-10">

</div>

<Footer/>
</div>


  );
}

export default Medicines;
