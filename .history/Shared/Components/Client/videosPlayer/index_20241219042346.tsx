import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from '../../../../pages/';

const fetchMedia = async () => {
  const response = await axios.get("/api/uploads?folder=videos&all=true");
  return response.data.mediaList;
};

const VideoPlayer = () => {
  const [visibleVideo, setVisibleVideo] = useState(null); // Oynatılacak video
  const observer = useRef(null);

  // React Query kullanarak veriyi çek
  const { data: mediaList, isLoading } = useQuery({
    queryKey: ["mediaList"],
    queryFn: fetchMedia,
  });

  // Lazy load için IntersectionObserver kullanımı
  useEffect(() => {
    const lazyLoadMedia = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const mediaId = entry.target.getAttribute("data-id");
          const element = document.querySelector(`[data-id="${mediaId}"]`);
          element.classList.add("loaded"); // Lazy load yapıldı işareti
          observer.current.unobserve(entry.target);
        }
      });
    };

    observer.current = new IntersectionObserver(lazyLoadMedia, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    const mediaElements = document.querySelectorAll(".lazy-media");
    mediaElements.forEach((el) => observer.current.observe(el));

    return () => {
      observer.current && observer.current.disconnect();
    };
  }, [mediaList]);

  if (isLoading) {
    return <div>Loading...</div>; // İlk veri yükleme ekranı
  }

  return (
 <div>
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
      style={{ width: "100vw", height: "100vh" }} // Tam ekran için stil
    >
      {mediaList.map((media, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#000",
            }}
          >
            {media.type === "video" ? (
              <ReactPlayer
                url={media.videos[0].videoUrl} // Video URL'si
                playing={false} // Otomatik oynatma kapalı
                controls
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <img
                src={media.covers[0].coverImageUrl}
                alt="Media Cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
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
    </Swiper>
 </div>
  );
};

export default VideoPlayer;
