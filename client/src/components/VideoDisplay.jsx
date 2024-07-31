import React, { useState } from "react";
import { Link } from "react-router-dom";
import UpdateModal from "./UpdateModal";

function VideoDisplay({ videoData, folderData }) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState();

  const handleUpdateVideo = (id) => {
    const videoToUpdate = videoData.find((element) => element.id === id);
    setDataToUpdate(videoToUpdate);
    setIsUpdateModal(!isUpdateModal);
  };
  const handleDeleteVideo = async (id) => {
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
      console.log("video deleted", data);
    } catch (err) {
      console.error("There was a problem deleting the video", err);
    }
  };
  return (
    <>
      <h1>Choose A Video</h1>
      <main className="grid">
        {videoData.map((data) => (
          <div key={data.id} className="thumbnail-container">
            <button onClick={() => handleDeleteVideo(data.id)}>
              Delete Video
            </button>
            <button onClick={() => handleUpdateVideo(data.id)}>
              Edit Video
            </button>
            <Link to={`video/${data.id}`}>
              <img
                src={`http://localhost:3001${data.thumbnailPath}`}
                alt={data.description}
                width="300px"
              />
            </Link>
            <h3>{data.title}</h3>
          </div>
        ))}
        {isUpdateModal && (
          <UpdateModal
            folderData={folderData}
            dataToUpdate={dataToUpdate}
            setIsUpdateModal={setIsUpdateModal}
            isUpdateModal={isUpdateModal}
          />
        )}
      </main>
    </>
  );
}

export default VideoDisplay;
