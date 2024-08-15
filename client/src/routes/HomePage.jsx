import React, { useEffect, useState } from "react";
import VideoDisplay from "../components/VideoDisplay";
import VideoUpload from "../components/VideoUpload";
import FolderSelector from "../components/FolderSelector";

function HomePage() {
  const [videoData, setVideoData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
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
        setOriginalData(data.videos);
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

  const handleOptimisticUpload = (newVideo) => {
    const originalVideos = [...videoData];
    const tempId = originalVideos[originalVideos.length - 1].id + 1;
    const optimisticVideo = {
      ...newVideo,
      id: tempId,
      thumbnailPath: URL.createObjectURL(newVideo.thumbnail),
    };
    setVideoData([...videoData, optimisticVideo]);
    return originalVideos;
  };
  return (
    <div id="home-page-container">
      <h1 className="header">Choose A Video</h1>
      <FolderSelector
        folderData={folderData}
        setVideoData={setVideoData}
        originalData={originalData}
      />
      <VideoDisplay
        videoData={videoData}
        setVideoData={setVideoData}
        folderData={folderData}
      />
      <VideoUpload
        setVideoData={setVideoData}
        folderData={folderData}
        handleOptimisticUpload={handleOptimisticUpload}
      />
    </div>
  );
}

export default HomePage;
