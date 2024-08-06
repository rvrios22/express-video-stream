import React, { useState, useEffect } from "react";
import "../../css/videoUpload.css";

function VideoUpload({ setVideoData, folderData, handleOptimisticUpload }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    folder: "",
    video: null,
    thumbnail: null,
    serviceDate: "",
  });
  const [message, setMessage] = useState("");

  const handleTitleChange = (e) => {
    setFormData({
      ...formData,
      title: e.target.value,
    });
  };

  const handleDescriptionChange = (e) => {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };

  const handleFolderChange = (e) => {
    setFormData({
      ...formData,
      folder: e.target.value,
    });
  };

  const handleVideoChange = (e) => {
    setFormData({
      ...formData,
      video: e.target.files[0],
    });
  };

  const handleThumbnailChange = (e) => {
    setFormData({
      ...formData,
      thumbnail: e.target.files[0],
    });
  };

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      serviceDate: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newVideo = {
      title: formData.title,
      description: formData.description,
      folder: formData.folder,
      thumbnail: formData.thumbnail,
      serviceDate: formData.serviceDate,
      thumbnailPath: "",
    };

    const originalVideos = handleOptimisticUpload(newVideo);

    const formEntries = new FormData();
    formEntries.append("title", formData.title);
    formEntries.append("description", formData.description);
    formEntries.append("folderName", formData.folder);
    formEntries.append("video", formData.video);
    formEntries.append("thumbnail", formData.thumbnail);
    formEntries.append("serviceDate", formData.serviceDate);
    try {
      const response = await fetch("http://localhost:3001/video/upload", {
        method: "POST",
        body: formEntries,
      });
      if (!response.ok) {
        throw new Error(`Response Error: ${response.status}`);
      }
      const result = await response.json();
      setMessage(`upload successfull: ${result.title}`);
    } catch (err) {
      console.error(err);
      setVideoData(originalVideos);
    } finally {
      setFormData({
        title: "",
        description: "",
        folder: "",
        video: null,
        thumbnail: null,
        serviceDate: Date.now(),
      });
    }
  };

  return (
    <div className="video-upload-container font-clamp">
      <h2 className="header">Upload A Video</h2>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={handleTitleChange}
        />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          id="description"
          required
          onChange={handleDescriptionChange}
        />
        <label htmlFor="folder">Choose a Folder:</label>
        <input list="folder" name="folder" onChange={handleFolderChange} />
        <datalist id="folder">
          {folderData.map((folder) => (
            <option key={folder.id}>{folder.name}</option>
          ))}
        </datalist>
        <label htmlFor="serviceDate">Sermon Date: </label>
        <input
          type="date"
          name="serviceDate"
          id="serviceDate"
          onChange={handleDateChange}
        />
        <label htmlFor="video">Choose a Video: </label>
        <input
          type="file"
          name="video"
          id="video"
          accept="video/mp4"
          required
          onChange={handleVideoChange}
        />
        <label htmlFor="thumbnail">Choose a Thumbnail: </label>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          accept="image/*"
          required
          onChange={handleThumbnailChange}
        />
        <input type="submit" value="Submit" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default VideoUpload;
