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
        console.log("response",response.data.videos);
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
            {!selectedVideo || selectedVideo.name !== video.name ? (
              <>
                {/* Placeholder image */}
                <img
                  src="https://via.placeholder.com/300x200.png?text=Video+Placeholder"
                  alt="Placeholder"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                {/* Play Button */}
                <button
                  onClick={() => handlePlay(video)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Play
                </button>
              </>
            ) : (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
