import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const VideoPlayer = () => {
  const [mediaList, setMediaList] = useState([]);
  const [visibleVideo, setVisibleVideo] = useState(null); // Oynatılacak video

  const fetchMedia = async () => {
    try {
      const response = await axios.get("/api/uploads?folder=videos&all=true");
      setMediaList(response.data.mediaList); // Videolar ve kapak resimleri listeyi ata
    } catch (error) {
      console.error("Error fetching media list:", error);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handlePlayVideo = (videoUrl) => {
    setVisibleVideo(videoUrl); // Butona tıklandığında o videoyu oynat
  };

  return (
    <div>
      <h1>Media Gallery</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {mediaList.map((media) => (
          <div
            key={media.id}
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
                onClick={() => handlePlayVideo(media.videos[0].videoUrl)} // İlk videoyu oynat
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
              onClick={() => handlePlayVideo(media.videos[0].videoUrl)}
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
          onClick={() => setVisibleVideo(null)} // Videoyu kapatmak için tıkla
        >
          <video
            src={visibleVideo}
            controls
            autoPlay
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              background: "#000",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
