import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { useLocation } from "react-router-dom";

function Video() {
  const [videoSrc, setVideoSrc] = useState("");
  const location = useLocation();

  useEffect(() => {
    const videoURL = `http://localhost:3001${location.pathname}`;
    console.log(videoURL)
    setVideoSrc(videoURL);
  }, [location.pathname]);
  return <VideoPlayer videoSrc={videoSrc} />;
}

export default Video;
