import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";

const fetchMedia = async () => {
  const response = await axios.get("/api/uploads?folder=videos&all=true");
  return response.data.mediaList;
};

const VideoPlayer = () => {
  const [visibleVideo, setVisibleVideo] = useState(null); // Oynatılacak video
  const observer = useRef(null);

  // React Query kullanarak veriyi çek
  const { data: mediaList, isLoading } = useQuery({
    queryKey: ["mediaList"],
    queryFn: fetchMedia,
  });

  // Lazy load için IntersectionObserver kullanımı
  useEffect(() => {
    const lazyLoadMedia = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const mediaId = entry.target.getAttribute("data-id");
          const element = document.querySelector(`[data-id="${mediaId}"]`);
          element.classList.add("loaded"); // Lazy load yapıldı işareti
          observer.current.unobserve(entry.target);
        }
      });
    };

    observer.current = new IntersectionObserver(lazyLoadMedia, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    const mediaElements = document.querySelectorAll(".lazy-media");
    mediaElements.forEach((el) => observer.current.observe(el));

    return () => {
      observer.current && observer.current.disconnect();
    };
  }, [mediaList]);

  if (isLoading) {
    return <div>Loading...</div>; // İlk veri yükleme ekranı
  }

  return (
 div
  );
};

export default VideoPlayer;
