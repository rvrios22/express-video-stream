import React, { useState } from "react";
import { dateCleaner } from "../helpers";
import { Link } from "react-router-dom";
import UpdateModal from "./UpdateModal";
import "../../css/videoDisplay.css";

function VideoDisplay({ videoData, setVideoData, folderData }) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState();

  const handleUpdateVideo = (id) => {
    const videoToUpdate = videoData.find((element) => element.id === id);
    setDataToUpdate(videoToUpdate);
    setIsUpdateModal(!isUpdateModal);
  };

  const handleOptomisticUpdate = (updatedVideo) => {
    const originalVideos = [...videoData];
    const updatedVideos = videoData.map((video) =>
      video.id === updatedVideo.id ? updatedVideo : video
    );
    setVideoData(updatedVideos);

    return originalVideos;
  };

  const handleDeleteVideo = async (id) => {
    const originalVideos = [...videoData];
    setVideoData(videoData.filter((video) => video.id !== id));
    try {
      const response = await fetch(`http://localhost:3001/video/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response not okay");
      }
      const data = await response.json();
    } catch (err) {
      console.error("There was a problem deleting the video", err);
      setVideoData(originalVideos);
    }
  };

  return (
    <div className="video-display-container font-clamp">
      <main className="video-display-grid">
        {videoData.map((data) => (
          <div key={data.id} className="video-display-thumbnail-container">
            <button
              className="video-display-delete"
              onClick={() => handleDeleteVideo(data.id)}
            >
              Delete
            </button>
            <Link to={`video/${data.id}`}>
              <img
                src={
                  data.thumbnailPath.includes("blob")
                    ? data.thumbnailPath
                    : `http://localhost:3001${data.thumbnailPath}`
                }
                alt={data.description}
                className="video-display-thumbnail"
              />
            </Link>
            <h3 className="video-display-title">{data.title}</h3>
            <p className="video-display-description">{data.description}</p>
            <p className="video-display-date">
              {dateCleaner(data.serviceDate)}
            </p>
            <button
              className="video-display-update"
              onClick={() => handleUpdateVideo(data.id)}
            >
              Edit Video
            </button>
          </div>
        ))}
        {isUpdateModal && (
          <UpdateModal
            folderData={folderData}
            dataToUpdate={dataToUpdate}
            setIsUpdateModal={setIsUpdateModal}
            isUpdateModal={isUpdateModal}
            setVideoData={setVideoData}
            handleOptomisticUpdate={handleOptomisticUpdate}
          />
        )}
      </main>
    </div>
  );
}

export default VideoDisplay;
