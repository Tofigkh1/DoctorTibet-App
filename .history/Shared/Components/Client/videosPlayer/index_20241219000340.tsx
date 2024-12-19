import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [firstVideo, setFirstVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/uploads?folder=uploads&all=true");
        const responseVideos = response.data.videos.map((video) => video.videoUrl);

        // İlk videoyu hemen yükle
        if (responseVideos.length > 0) {
          setFirstVideo(responseVideos[0]);
        }

        // Kalan videoları arka planda yükle
        setTimeout(() => setVideos(responseVideos), 0);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Video List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {/* İlk video */}
        {firstVideo && (
          <div
            style={{
              position: "relative",
              width: "300px",
              height: "200px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <video
              src={firstVideo}
              controls
              autoPlay
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* Kalan videolar */}
        {videos.slice(1).map((video) => (
          <div
            key={video}
            style={{
              position: "relative",
              width: "300px",
              height: "200px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <video
              src={video}
              controls
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
