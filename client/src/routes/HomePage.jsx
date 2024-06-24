import React, { useEffect, useState } from "react";
import VideoDisplay from "../components/VideoDisplay";
import VideoUpload from "../components/VideoUpload";

function HomePage() {
  const [videoData, setVideoData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/video");
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        const data = await response.json();
        setVideoData(data);
      } catch (err) {
        console.error("something went wrong", err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <VideoDisplay videoData={videoData}/>
      <VideoUpload />
    </>
  );
}

export default HomePage;
