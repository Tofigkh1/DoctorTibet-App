import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation,FreeMode } from "swiper/modules";
import { Box } from "@chakra-ui/react";
import Playbutton from "../../../../public/play-button (1).png"
import Image from "next/image";
import { useResize } from "../../../Hooks/useResize";
import Search from "../Search2/search2";
import styles from './videoPlayer.module.css';
import { useModalOpen } from "../../../Hooks/useModalOpen";
import Nav from "../Nav/Nav";
import BasketMenu from "../../sliderBasket/sliderBasket";
import Auth from "../Auth/Auth";
import { useRouter } from "next/router";
import { RootState } from "../../../Redux/Store/store";
import { useSelector } from "react-redux";
import HamburgerBtn from "../hamburgerButton";
import { DotLoader } from "react-spinners";



const fetchMedia = async () => {
  const response = await axios.get("/api/uploads?folder=videos&all=true");
  console.log("response",response);
  
  return response.data.mediaList;
};



const VideoPlayer = () => {
    const [visibleVideo, setVisibleVideo] = useState<string | null>(null);
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  let user = useSelector((state: RootState) => state.user);
    let { isMobile } = useResize();
  let { isOpen, onOpen, onClose } = useModalOpen();
 let { push } = useRouter();
   const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem('user_info');
    setAccessToken(token);
  }, [user]);
  const { data: mediaList, isLoading } = useQuery({
    queryKey: ["mediaList"],
    queryFn: fetchMedia,
  });

  const onAutoplayTimeLeft = (s: SwiperType, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };


  interface Media {
    covers: { coverImageUrl: string }[];
    videos: { videoUrl: string }[];
  }

  return (
<div>


    {!isMobile &&


  
 
<div>
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


    <div>
    <Swiper
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 3500,
      disableOnInteraction: false,
    }}
    navigation
    modules={[Autoplay, Pagination, Navigation]}
    onAutoplayTimeLeft={onAutoplayTimeLeft}
    style={{ width: "100vw", height: "100vh" }} // Tam ekran için stil
  >
  {mediaList.map((media: Media, index: number) => (
  <SwiperSlide key={index}>
    <div
      style={{
        width: "100vw",
        height: "640px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          width: "100px",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "500px",
        }}
        onClick={() => setVisibleVideo(media.videos[0].videoUrl)}
      >
        <Image alt="videoplayer" src={Playbutton} width={100} height={100} />
      </button>
      {media.covers.length > 0 ? (
        <img
          src={media.covers[0].coverImageUrl}
          alt="Cover"
          style={{
            width: "100%",
            height: "calc(100% - 50px)",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "calc(100% - 50px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No Cover
        </div>
      )}
    </div>
  </SwiperSlide>
))}
    <div className="autoplay-progress" slot="container-end">
      <svg viewBox="0 0 48 48" ref={progressCircle}>
        <circle cx="24" cy="24" r="20"></circle>
      </svg>
      <span ref={progressContent}></span>
    </div>
    <div onClick={() => setVisibleVideo(null)}></div>
  </Swiper>

  <div className={styles.bgimage}>
    <section className={`${styles.header_box}  ${isOpen ? styles.shadow : ''}`}>
      <div className={`${styles.logo_box} flex gap-3 items-center`}>
        <button className={styles.button}></button>
        <div className={styles.cursor}>
          <img onClick={() => push('/')} style={{ width: '90px', height: '90px' }} className={styles.logo} src="/Logo.png" alt="Logo" />
        </div>
      </div>

      <div className={`${styles.menu_box} ${isMobile ? (isOpen ? styles.show : styles.hide) : styles.show}`}>
        <Nav />
      </div>

     

      <div className='flex flex-row gap-4 items-center'>
      <div>
      <BasketMenu/>
      </div>
      
        <div className={styles.mobile_hide}>
          <Auth />
        </div>
        
      </div>
      
    </section>


  </div>

  {/* Video Modal */}
  {visibleVideo && (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Karartma efekti
          zIndex: "999", // ReactPlayer'ın altına yerleştir
        }}
        onClick={() => setVisibleVideo(null)} // Tıklanabilir yap
      ></div>

      {/* ReactPlayer */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Ortala
          zIndex: "1000", // En üstte görünmesini sağla
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="gray.900"
          color="white"
          p={4}
          borderRadius="20px"
          maxWidth="1100px"
        >
            
                <div className=" flex  gap-3">
                <h1 style={{ fontSize: "24px", marginBottom: "16px" }}> Vidoe Player</h1>
                <div style={{width:"30px", marginTop: "5px"}}>
                <Image alt="videoplayer" src={Playbutton} width={50} height={50}/>
                </div>
            
                </div>
      
          <ReactPlayer
            url={visibleVideo}
            playing={true} // Otomatik oynatma

            controls={true} // Oynatıcı kontrollerini göster
            config={{
                file: {
                    attributes: {
                      playsInline: true, // iOS için yerleşik oynatma
                    },
                  },
              twitch: {
                options: {
                  autoplay: true, // Otomatik oynatma
          
                },
              },
            }}
            width="1100px" // Oynatıcı genişliği
            height="580px" // Oynatıcı yüksekliği
            style={{ borderRadius: "20px", overflow: "hidden" }}
          />
        </Box>
      </div>
    </>
  )}

    </div>




<div>
<Swiper
  slidesPerView={4} // Yan yana 4 slayt gösterilir
  centeredSlides={false} // Ortalamayı kapatır
  spaceBetween={20} // Slaytlar arasındaki boşluk
  grabCursor={true}
  pagination={{
    clickable: true,
  }}
  modules={[Pagination]}
  className="mySwiper"
  style={{
 

    width: "1360px",
    height: "200px",

  }}
>
  {mediaList.map((media:Media, index: number) => (
    <SwiperSlide
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",

        borderRadius: "8px", // Hafif yuvarlak köşeler
        overflow: "hidden",
      }}
    >
      {/* Video Kapak Resmi */}
      {media.covers.length > 0 ? (
        <Image
          src={media.covers[0].coverImageUrl}
          alt="Cover"
          layout="responsive"
          width={16} // Görüntü oranı (16:9)
          height={9}
          priority
          style={{
            objectFit: "cover",
            borderRadius: "8px 8px 0 0", // Sadece üst köşeler yuvarlak
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
      
          }}
        >
          No Cover
        </div>
      )}

      {/* Oynatma Butonu */}
      <button
        style={{
          width: "50px",
          height: "50px",
          marginTop: "-25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "50%",
    
          zIndex: 2,
        }}
        onClick={() => setVisibleVideo(media.videos[0].videoUrl)}
      >
        <Image alt="videoplayer" src={Playbutton} width={30} height={30} />
      </button>
    </SwiperSlide>
  ))}
</Swiper>
</div>




<div className=" mt-32">
<Swiper
  slidesPerView={4} // Yan yana 4 slayt gösterilir
  centeredSlides={false} // Ortalamayı kapatır
  spaceBetween={20} // Slaytlar arasındaki boşluk
  grabCursor={true}
  pagination={{
    clickable: true,
  }}
  modules={[Pagination]}
  className="mySwiper"
  style={{
 

    width: "1360px",
    height: "200px",

  }}
>
  {mediaList.map((media:Media, index: number) => (
    <SwiperSlide
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",

        borderRadius: "8px", // Hafif yuvarlak köşeler
        overflow: "hidden",
      }}
    >
      {/* Video Kapak Resmi */}
      {media.covers.length > 0 ? (
        <Image
          src={media.covers[0].coverImageUrl}
          alt="Cover"
          layout="responsive"
          width={16} // Görüntü oranı (16:9)
          height={9}
          priority
          style={{
            objectFit: "cover",
            borderRadius: "8px 8px 0 0", // Sadece üst köşeler yuvarlak
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
      
          }}
        >
          No Cover
        </div>
      )}

      {/* Oynatma Butonu */}
      <button
        style={{
          width: "50px",
          height: "50px",
          marginTop: "-25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "50%",
    
          zIndex: 2,
        }}
        onClick={() => setVisibleVideo(media.videos[0].videoUrl)}
      >
        <Image alt="videoplayer" src={Playbutton} width={30} height={30} />
      </button>
    </SwiperSlide>
  ))}
</Swiper>
</div>
</div>
)}
</div>

}






{isMobile &&
<div>
{isLoading ? (
    <div style={{
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     height: '80vh',
     marginLeft: "150px"
   }}>
     <DotLoader color="#28e4c5" speedMultiplier={1.6} size={90} />
   </div>
   ) : (

    <div>

   
<div

>
 {/* Swiper */}
 <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "420px",
        zIndex: 10, // En üstte kalmasını sağlar
      }}
 >
   {mediaList.map((media:Media, index: number) => (
     <SwiperSlide key={index}>
       <div
          style={{
            width: "100vw",
            height: "425px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
       >
         {/* Oynatma Butonu */}
         <button
           style={{
             width: "80px",
             height: "80px",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             position: "absolute",
             cursor: "pointer",
             fontSize: "16px",
             fontWeight: "bold",
             borderRadius: "50%",
             zIndex: 2,
           }}
           onClick={() => setVisibleVideo(media.videos[0].videoUrl)}
         >
          <div style={{ width: "60px", marginTop: "5px" }}>
             <Image alt="videoplayer" src={Playbutton} width={60} height={50} />
           </div>
         </button>

         {/* Video Kapağı */}
         {media.covers.length > 0 ? (
           <div
             style={{
               height: "auto",
               width: "100%",
               position: "relative",
             }}
           >
             <Image
               src={media.covers[0].coverImageUrl}
               alt="Cover"
               layout="responsive"
               width={16}
               height={9}
               priority
               style={{
                 borderRadius: "12px",
                 objectFit: "cover",
               }}
             />
           </div>
         ) : (
           <div
             style={{
               width: "100%",
               height: "100%",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               backgroundColor: "#ccc",
             }}
           >
             No Cover
           </div>
         )}
       </div>
     </SwiperSlide>
   ))}

   {/* Diğer Özellikler */}
   <div className="autoplay-progress" slot="container-end">
     <svg viewBox="0 0 48 48" ref={progressCircle}>
       <circle cx="24" cy="24" r="20"></circle>
     </svg>
     <span ref={progressContent}></span>
   </div>
 </Swiper>



 <div className={styles.bgimagemob}>
    <section className={`${styles.header_box}  ${isOpen ? styles.shadow : ''}`}>
      <div className={`${styles.logo_box} flex gap-3 items-center`}>
        <button className={styles.button}></button>
        <div className={styles.cursor}>
          <img onClick={() => push('/')} style={{ width: '90px', height: '90px' }} className={styles.logo} src="/Logo.png" alt="Logo" />
        </div>
      </div>

  

     

      <div className='flex flex-row gap-4 items-center'>
      <div>
      <BasketMenu/>
      </div>
      
        <div className={styles.mobile_hide}>
          <Auth />
        </div>
        
      </div>
      
    </section>

  







  






  </div>


 {/* Video Modal */}
 {visibleVideo && (
   <>
    {/* Overlay */}
    <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Karartma efekti
          zIndex: "999", // ReactPlayer'ın altına yerleştir
        }}
        onClick={() => setVisibleVideo(null)} // Tıklanabilir yap
      ></div>
     {/* Overlay */}
     <div
       style={{
 
         top: 0,
         left: 0,
         width: "100%",
         height: "100%",
         backgroundColor: "rgba(0, 0, 0, 0.7)",
         zIndex: 999,
       }}
       onClick={() => setVisibleVideo(null)}
     ></div>

     {/* ReactPlayer */}
     <div
       style={{
         position: "fixed",
         top: "50%",
         left: "50%",
         transform: "translate(-50%, -50%)",
         zIndex: 1000,
       }}
     >
       <Box
         display="flex"
         flexDirection="column"
         alignItems="center"
         justifyContent="center"
         bg="gray.900"
         color="white"
         p={4}
         borderRadius="20px"
         maxWidth="420px"
       >
         <div className="flex gap-3">
           <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>Video Player</h1>
           <div style={{ width: "30px", marginTop: "5px" }}>
             <Image alt="videoplayer" src={Playbutton} width={50} height={50} />
           </div>
         </div>
         <ReactPlayer
           url={visibleVideo}
           playing={true}
           controls={true}
           config={{
             file: {
               attributes: {
                 playsInline: true,
               },
             },
           }}
           style={{
             maxWidth: "370px",
             maxHeight: "300px",
             borderRadius: "12px",
             overflow: "hidden",
           }}
         />
       </Box>
     </div>
         <div>
     <Search />
     </div>
   </>
 )}
 
</div>











<div className="mt-96">
<Swiper
    slidesPerView={2}
    spaceBetween={10}
    pagination={{
      clickable: true,
    }}
    modules={[Pagination]}
    className="mySwiper"
  style={{
 

    width: "400px",
    height: "200px",
marginLeft: "1px"
  }}
>
  {mediaList.map((media:Media, index: number) => (
    <SwiperSlide
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    
        height: "200px",
        width: "240px",
        borderRadius: "8px", // Hafif yuvarlak köşeler
        overflow: "hidden",
      }}
    >
      {/* Video Kapak Resmi */}
      {media.covers.length > 0 ? (
        <Image
          src={media.covers[0].coverImageUrl}
          alt="Cover"
          layout="responsive"
          width={16} // Görüntü oranı (16:9)
          height={9}
          priority
          style={{
            objectFit: "cover",
            borderRadius: "8px 8px 0 0", // Sadece üst köşeler yuvarlak
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
      
          }}
        >
          No Cover
        </div>
      )}

      {/* Oynatma Butonu */}
      <button
        style={{
          width: "50px",
          height: "50px",
          marginTop: "-25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "50%",
    
          zIndex: 2,
        }}
        onClick={() => setVisibleVideo(media.videos[0].videoUrl)}
      >
        <Image alt="videoplayer" src={Playbutton} width={30} height={30} />
      </button>
    </SwiperSlide>
  ))}
</Swiper>
</div>




<div className=" mt-24">
<Swiper
     slidesPerView={2}
     spaceBetween={10}
     pagination={{
       clickable: true,
     }}
     modules={[Pagination]}
     className="mySwiper"
   style={{
  
 
     width: "410px",
     height: "200px",
 marginLeft: "1px"

  }}
>
  {mediaList.map((media:Media, index: number) => (
    <SwiperSlide
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        width: "340px",
        borderRadius: "8px", // Hafif yuvarlak köşeler
        overflow: "hidden",
      }}
    >
      {/* Video Kapak Resmi */}
      {media.covers.length > 0 ? (
        <Image
          src={media.covers[0].coverImageUrl}
          alt="Cover"
          layout="responsive"
          width={16} // Görüntü oranı (16:9)
          height={9}
          priority
          style={{
            objectFit: "cover",
            borderRadius: "8px 8px 0 0", // Sadece üst köşeler yuvarlak
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
      
          }}
        >
          No Cover
        </div>
      )}

      {/* Oynatma Butonu */}
      <button
        style={{
          width: "50px",
          height: "50px",
          marginTop: "-25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "50%",
    
          zIndex: 2,
        }}
        onClick={() => setVisibleVideo(media.videos[0].videoUrl)}
      >
        <Image alt="videoplayer" src={Playbutton} width={30} height={30} />
      </button>
    </SwiperSlide>
  ))}
</Swiper>
</div>






</div>
)}
</div>



}

</div>
  );
};

export default VideoPlayer;
