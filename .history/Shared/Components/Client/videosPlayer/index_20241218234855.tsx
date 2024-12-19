import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  console.log("videos",videos);
  

  useEffect(() => {
    // Videoları backend'den çekme
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/uploads?folder=uploads&all=true"); // Backend GET videos endpoint'i
        const responseVideos = response.data.videos
        console.log("response",response.data);
        setVideos(responseVideos)
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handlePlay = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div>
      <h1>Video List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {videos.map((video) => (
          <div
            key={video.name}
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
                src={video.url}
                controls
                autoPlay
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
