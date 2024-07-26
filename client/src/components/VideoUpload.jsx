import React, { useState, useEffect } from "react";

function VideoUpload({ folderData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    folder: "",
    video: null,
    thumbnail: null,
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formEntries = new FormData();
    formEntries.append("title", formData.title);
    formEntries.append("description", formData.description);
    formEntries.append("folderName", formData.folder);
    formEntries.append("video", formData.video);
    formEntries.append("thumbnail", formData.thumbnail);
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
      setFormData({
        title: "",
        description: "",
        folder: "",
        video: null,
        thumbnail: null,
      });
    } catch (err) {
      console.error(err);
      setFormData({
        title: "",
        description: "",
        folder: "",
        video: null,
        thumbnail: null,
      });
    }
  };

  return (
    <>
      <h2>Upload A Video</h2>
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
            <>
              <option>{folder.name}</option>
            </>
          ))}
        </datalist>
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
    </>
  );
}

export default VideoUpload;
