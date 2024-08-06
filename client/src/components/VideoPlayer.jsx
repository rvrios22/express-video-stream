import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { dateCleaner } from "../helpers";
import "../../css/videoPlayer.css";

function VideoPlayer({ videoSrc }) {
  const [videoData, setVideoData] = useState();
  const videoRef = useRef();
  const location = useLocation();
  useEffect(() => {
    videoRef.current?.load();
  }, [videoSrc]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="video-player-container">
      <video className="video-player-video" ref={videoRef} controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support this video.
      </video>
      <h1 className=" video-player-header header">{videoData && videoData.title}</h1>
      <p className="video-player-text font-clamp">{videoData && videoData.description}</p>
      <p className="video-player-text font-clamp">
        {videoData && dateCleaner(videoData.serviceDate)}
      </p>
    </div>
  );
}

export default VideoPlayer;
