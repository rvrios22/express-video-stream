import React, { useEffect, useState } from "react";
import VideoDisplay from "../components/VideoDisplay";
import VideoUpload from "../components/VideoUpload";

function HomePage() {
  const [videoData, setVideoData] = useState([]);
  const [folderData, setFolderData] = useState([]);
  //fetches video data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/video");
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        const data = await response.json();
        setVideoData(data.videos);
      } catch (err) {
        console.error("something went wrong", err);
      }
    };
    fetchData();
  }, []);

  //fetches folder data
  useEffect(() => {
    const fetchFolders = async () => {
      const response = await fetch("http://localhost:3001/folder");
      if (!response.ok) {
        throw new Error("Network response not okay");
      }
      const data = await response.json();
      setFolderData(data.folders);
    };

    fetchFolders();
  }, []);
  return (
    <div id="home-page-container">
      <VideoDisplay
        videoData={videoData}
        setVideoData={setVideoData}
        folderData={folderData}
      />
      <VideoUpload folderData={folderData} />
    </div>
  );
}

export default HomePage;
