import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  const [mediaList, setMediaList] = useState([]);
  const [visibleVideo, setVisibleVideo] = useState(null); // Oynatılacak video
  const observer = useRef(null);

  const fetchMedia = async () => {
    try {
      const response = await axios.get("/api/uploads?folder=videos&all=true");
      const mediaWithLazyLoading = response.data.mediaList.map((media) => ({
        ...media,
        isLoaded: false, // Lazy load durumunu işaretlemek için
      }));
      setMediaList(mediaWithLazyLoading);
    } catch (error) {
      console.error("Error fetching media list:", error);
    }
  };

  const lazyLoadMedia = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const mediaId = entry.target.getAttribute("data-id");
          setMediaList((prevMediaList) =>
            prevMediaList.map((media) =>
              media.id === mediaId
                ? { ...media, isLoaded: true }
                : media
            )
          );
          observer.current.unobserve(entry.target); // Görünür olduğunda gözlemlemeyi bırak
        }
      });
    },
    [setMediaList]
  );

  useEffect(() => {
    fetchMedia();

    // IntersectionObserver kurulum
    observer.current = new IntersectionObserver(lazyLoadMedia, {
      root: null, // Varsayılan viewport
      rootMargin: "0px",
      threshold: 0.1, // %10 göründüğünde tetikle
    });

    return () => {
      observer.current && observer.current.disconnect();
    };
  }, [lazyLoadMedia]);

  useEffect(() => {
    const mediaElements = document.querySelectorAll(".lazy-media");
    mediaElements.forEach((el) => observer.current.observe(el));
  }, [mediaList]);

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
            {/* Kapak Resmi veya Yüklenme Durumu */}
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
              disabled={!media.isLoaded} // Yüklenmediyse devre dışı
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
