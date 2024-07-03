import React, { useState } from "react";

function VideoUpload() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
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

  const handleVideoChange = (e) => {
    setFormData({
      ...formData,
      video: e.target.files[0],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formEntries = new FormData();
    formEntries.append("title", formData.title);
    formEntries.append("description", formData.description);
    formEntries.append("video", formData.video);
    try {
      const response = await fetch("http://localhost:3001/api/video/upload", {
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
        <label htmlFor="video">Choose a Video: </label>
        <input
          type="file"
          name="video"
          id="video"
          required
          onChange={handleVideoChange}
        />
        <input type="submit" value="Submit" />
      </form>
      {message && <p>{message}</p>}
    </>
  );
}

export default VideoUpload;
