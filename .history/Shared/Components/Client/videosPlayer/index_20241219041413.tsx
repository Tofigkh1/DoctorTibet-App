import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ReactPlayer from "react-player";

const FullscreenSwiper = ({ mediaList }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
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
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      style={{ width: "100vw", height: "100vh" }}
    >
      {mediaList.map((media, index) => (
        <SwiperSlide key={index} style={{ position: "relative" }}>
          {/* Eğer video varsa ReactPlayer ile oynat */}
          {media.type === "video" ? (
            <div style={{ height: "100vh", width: "100vw" }}>
              <ReactPlayer
                url={media.url}
                playing
                controls
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            // Görüntü varsa Next.js Image bileşeni kullan
            <div
              style={{
                height: "100vh",
                width: "100vw",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={media.url}
                alt={media.alt || "Slide Image"}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
        </SwiperSlide>
      ))}
      {/* Otomatik oynatma ilerlemesi */}
      <div className="autoplay-progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    </Swiper>
  );
};

export default FullscreenSwiper;
