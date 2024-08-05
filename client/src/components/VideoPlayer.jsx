import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { dateCleaner } from "../helpers";

function VideoPlayer({ videoSrc }) {
  const [isVideoSrcLoaded, setVideoSrcLoaded] = useState(false);
  const [videoData, setVideoData] = useState();
  const videoRef = useRef();
  const location = useLocation();
  useEffect(() => {
    videoRef.current?.load();
    setVideoSrcLoaded(true);
  }, [videoSrc]);

  useEffect(() => {
    if (!isVideoSrcLoaded) return;
    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api${location.pathname}`
        );
        const data = await response.json();
        setVideoData(data.video);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideoData();
  }, [isVideoSrcLoaded]);

  return (
    <div>
      <video ref={videoRef} width="320" controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support this video.
      </video>
      <h1>{videoData?.title}</h1>
      <p>{videoData?.description}</p>
      <p>{dateCleaner(videoData.serviceDate)}</p>
    </div>
  );
}

export default VideoPlayer;
