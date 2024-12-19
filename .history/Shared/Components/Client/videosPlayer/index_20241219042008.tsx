import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";

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
      <h1>Media Gallery</h1>
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {mediaList.map((media) => (
              <SwiperSlide style={{ height: isMobile ? '600px' : '500px', position: 'relative' }}>
              <div style={{ height: '670px', width: '100%', position: 'relative' }}>
                <Image 
                  src={DoctorPhoto} 
                  alt="Doctor" 
             
                  objectFit="cover"  
                  style={isMobile ? { transform: 'scale(1.1)', objectPosition: 'bottom' } : {}} 
                />
              </div>
            </SwiperSlide>
          <div
            key={media.id}
            data-id={media.id}
            className="lazy-media"
            style={{
              position: "relative",
              width: "300px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              background: "#f9f9f9",
            }}
          >
            {/* Kapak Resmi */}
            {media.covers.length > 0 ? (
              <img
                src={media.covers[0].coverImageUrl}
                alt="Cover"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => setVisibleVideo(media.videos[0].videoUrl)}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#eee",
                  color: "#888",
                }}
              >
                No Cover
              </div>
            )}
            {/* Buton */}
            <button
              style={{
                width: "100%",
                padding: "8px 16px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "0 0 8px 8px",
                cursor: "pointer",
              }}
              onClick={() => setVisibleVideo(media.videos[0].videoUrl)}
            >
              Play Video
            </button>
          </div>
        ))}
      </div>
      {/* Video Modal */}
      {visibleVideo && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "1000",
          }}
          onClick={() => setVisibleVideo(null)} // Modalı kapatmak için tıkla
        >
          <ReactPlayer
            url={visibleVideo}
            playing
            controls
            width="80%"
            height="80%"
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
