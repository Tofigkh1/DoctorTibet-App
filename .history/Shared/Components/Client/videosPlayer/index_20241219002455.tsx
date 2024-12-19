import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/uploads?folder=	
videos&all=true");
        console.log("response",response);
        
        const responseVideos = response.data.videos.map((video) => video.videoUrl);
        console.log("responseVideos",responseVideos);
        
        setVideos(responseVideos); // Tüm videoları state'e ata
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      // IntersectionObserver kullanarak görünür videoları yükle
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleVideos((prev) => [...prev, entry.target.dataset.src]);
              observerRef.current.unobserve(entry.target); // Yüklenmiş videoları yeniden gözlemleme
            }
          });
        },
        { rootMargin: "100px" }
      );

      videos.forEach((video, index) => {
        const videoElement = document.querySelector(`[data-src="${video}"]`);
        if (videoElement) {
          observerRef.current.observe(videoElement);
        }
      });
    }
  }, [videos]);

  return (
    <div>
      <h1>Video List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {videos.map((video) => (
          <div
            key={video}
            data-src={video}
            style={{
              position: "relative",
              width: "300px",
              height: "200px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {visibleVideos.includes(video) ? (
              <video
                src={video}
                controls
                autoPlay
                preload="metadata"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div style={{ textAlign: "center", paddingTop: "80px" }}>Loading...</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
