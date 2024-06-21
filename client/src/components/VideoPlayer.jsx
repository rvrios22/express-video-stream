import React, { useEffect, useState, useRef } from "react";

function VideoPlayer() {
  const [videoSrc, setVideoSrc] = useState("");
  const videoRef = useRef(null)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch("http://localhost:3001/video/test1.mp4");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob)
        videoRef.current.src = videoUrl
      } catch (err) {
        console.error('error fetching video', err)
      }
    };

    fetchVideo()
  }, []);
  return (
    <div>
      <video ref={videoRef} width="500" controls />
    </div>
  );
}

export default VideoPlayer;
