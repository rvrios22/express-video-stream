import React, { useEffect, useState, useRef } from "react";

function VideoPlayer({ videoSrc }) {
  const videoRef = useRef()
  useEffect(() => {
    videoRef.current?.load()
  }, [videoSrc])
  return (
    <div>
      <video ref={videoRef} width='320' controls>
        <source src={videoSrc} type="video/mp4"/>
        Your browser does not support this video.
      </video>
    </div>
  );
}

export default VideoPlayer;
