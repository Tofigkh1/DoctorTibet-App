import React, { useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const fetchMedia = async () => {
  const response = await axios.get("/api/uploads?folder=videos&all=true");
  return response.data.mediaList;
};

const VideoPlayerSwiper = () => {
  const [visibleVideo, setVisibleVideo] = useState(null); // Aktif video
  const { data: mediaList, isLoading } = useQuery({
    queryKey: ["mediaList"],
    queryFn: fetchMedia,
  });

  if (isLoading) {
    return <div>Loading...</div>; // Veri yüklenirken
  }

  return (
    <div>
      <h1>Video Gallery</h1>
      {/* Swiper Container */}
      <Swiper
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        style={{ width: "80%", margin: "0 auto" }}
      >
        {mediaList.map((media) => (
          <SwiperSlide key={media.id}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "400px",
                background: "#000",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {/* React Player ile Video */}
              <ReactPlayer
                url={media.videos[0].videoUrl}
                playing={visibleVideo === media.id} // Sadece aktif olan oynar
                controls
                width="100%"
                height="100%"
              />
              <button
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "10px 20px",
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setVisibleVideo(visibleVideo === media.id ? null : media.id)
                }
              >
                {visibleVideo === media.id ? "Stop" : "Play"}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoPlayerSwiper;
