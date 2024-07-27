import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { useLocation } from "react-router-dom";

function Video() {
  const [videoSrc, setVideoSrc] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001${location.pathname}`,
          { headers: { range: "bytes=0-1023" } }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoSrc(videoUrl);
      } catch (err) {
        console.error("error fetching video", err);
      }
    };

    fetchVideo();
  }, []);

  return <VideoPlayer videoSrc={videoSrc} />;
}

export default Video;
