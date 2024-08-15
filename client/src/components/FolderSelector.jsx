import React from "react";
import "../../css/folderSelector.css";

function FolderSelector({ folderData, originalData, setVideoData }) {
  const fetchFolderVideos = async (id) => {
    const response = await fetch(`http://localhost:3001/api/folder/${id}`);
    const data = await response.json();
    setVideoData(data.videos);
  };

  const setOriginalData = () => {
    setVideoData(originalData);
  };
  return (
    <div className="folder-selector-container">
      <span className="folder-button font-clamp" onClick={setOriginalData}>
        All
      </span>
      {folderData.map((folder) => (
        <span
          className="folder-button font-clamp"
          key={folder.id}
          onClick={() => fetchFolderVideos(folder.id)}
        >
          {folder.name}
        </span>
      ))}
    </div>
  );
}

export default FolderSelector;
