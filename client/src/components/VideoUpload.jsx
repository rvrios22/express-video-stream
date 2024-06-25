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

    const formData = new FormData();

    formData.append("title", formData.title);
    formData.append("description", formData.description);
    formData.append("video", formData.video);

    console.log(formData.entries)
    try {
      const response = await fetch("http://localhost:3001/api/video/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("upload failed");
      }
      const result = await response.json();
      setMessage(`Upload successful: ${result.title}`);
    } catch (err) {
      console.error("error uploading", err);
      setMessage("error uploading");
    } finally {
      setFormData({ title: "", description: "", video: null });
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
