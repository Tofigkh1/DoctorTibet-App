import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState([]);
  const observerRef = useRef(null);
  const videoRefs = useRef(new Map()); // Her bir videoya ref bağlamak için Map kullanıyoruz

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/uploads?folder=uploads/videos&all=true");
        const responseCovers = await axios.get("/api/uploads?folder=uploads/videos&all=true");
        const responseVideos = response.data.videos.map((video) => video.videoUrl);
        setVideos(responseVideos); // Tüm videoları state'e ata
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      // IntersectionObserver'ı oluştur ve görünür elemanları takip et
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const videoSrc = entry.target.dataset.src;
              setVisibleVideos((prev) => (prev.includes(videoSrc) ? prev : [...prev, videoSrc]));
              observerRef.current.unobserve(entry.target); // Yüklenmiş olan videoyu artık gözlemleme
            }
          });
        },
        { rootMargin: "200px" }
      );

      // Tüm videoları gözlemle
      videos.forEach((video) => {
        const videoElement = videoRefs.current.get(video);
        if (videoElement) {
          observerRef.current.observe(videoElement);
        }
      });
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect(); // Eski gözlemleri temizle
    };
  }, [videos]);

  return (
    <div>
      <h1>Video List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {videos.map((video) => (
          <div
            key={video}
            data-src={video}
            ref={(el) => videoRefs.current.set(video, el)}
            style={{
              position: "relative",
              width: "300px",
              height: "200px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              background: "#f9f9f9",
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
              <div
                style={{
                  textAlign: "center",
                  paddingTop: "80px",
                  color: "#888",
                  fontSize: "14px",
                }}
              >
                Loading...
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
