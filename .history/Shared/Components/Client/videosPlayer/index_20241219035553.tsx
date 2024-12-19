import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  const [mediaList, setMediaList] = useState([]);
  const [visibleVideo, setVisibleVideo] = useState(null);
  const observer = useRef(null);

  // API'den medya listesini getir
  const fetchMedia = async () => {
    try {
      const response = await axios.get("/api/uploads?folder=videos&all=true");
      const mediaWithLazyLoading = response.data.mediaList.map((media) => ({
        ...media,
        isLoaded: false,
      }));
      setMediaList(mediaWithLazyLoading);
    } catch (error) {
      console.error("Error fetching media list:", error);
    }
  };

  // Lazy load için IntersectionObserver kullanımı
  const lazyLoadMedia = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const mediaId = entry.target.getAttribute("data-id");
          setTimeout(() => {
            setMediaList((prevMediaList) =>
              prevMediaList.map((media) =>
                media.id === mediaId ? { ...media, isLoaded: true } : media
              )
            );
            observer.current.unobserve(entry.target);
          }, 100); // Gecikmeyi azaltmak için timeout ekleyin
        }
      });
    },
    [setMediaList]
  );

  // Component mount olduğunda medya listesini getir ve observer oluştur
  useEffect(() => {
    fetchMedia();

    observer.current = new IntersectionObserver(lazyLoadMedia, {
      root: null,
      rootMargin: "100px", // Daha erken yüklemek için margin artırıldı
      threshold: 0.5, // %50 göründüğünde tetikle
    });

    return () => {
      observer.current && observer.current.disconnect();
    };
  }, [lazyLoadMedia]);

  useEffect(() => {
    const mediaElements = document.querySelectorAll(".lazy-media");
    mediaElements.forEach((el) => observer.current.observe(el));
  }, [mediaList]);

  const handlePlayVideo = (videoUrl) => {
    setVisibleVideo(videoUrl);
  };

  return (
    <div>
      <h1>Media Gallery</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {mediaList.map((media) => (
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
            {media.isLoaded && media.covers.length > 0 ? (
              <img
                src={media.covers[0].coverImageUrl}
                alt="Cover"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handlePlayVideo(media.videos[0].videoUrl)}
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
                Loading...
              </div>
            )}
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
              disabled={!media.isLoaded}
            >
              Play Video
            </button>
          </div>
        ))}
      </div>
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
          onClick={() => setVisibleVideo(null)}
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
