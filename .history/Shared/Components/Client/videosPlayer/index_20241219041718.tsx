import React, { useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const fetchMedia = async () => {
  const response = await axios.get("/api/uploads?folder=videos&all=true");
  return response.data.mediaList;
};

const VideoSwiper = () => {
  const [visibleVideo, setVisibleVideo] = useState(null); // Oynatılacak video

  // React Query ile medya listesini çek
  const { data: mediaList, isLoading } = useQuery({
    queryKey: ["mediaList"],
    queryFn: fetchMedia,
  });

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
     
      >
        {mediaList.map((media) => (
          <SwiperSlide key={media.id} style={{ height: "600px", position: "relative" }}>
            <div
              style={{
                height: "100%",
                width: "100%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#000",
              }}
            >
              <ReactPlayer
                url={media.videos[0]?.videoUrl}
                playing={visibleVideo === media.id} // Sadece seçilen video oynatılır
                controls
                width="100%"
                height="100%"
                onClickPreview={() => setVisibleVideo(media.id)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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
            url={mediaList.find((media) => media.id === visibleVideo)?.videos[0]?.videoUrl}
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

export default VideoSwiper;
