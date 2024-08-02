import React, { useEffect, useState } from "react";

function UpdateModal({
  folderData,
  dataToUpdate,
  setIsUpdateModal,
  isUpdateModal,
}) {
  const [updateData, setUpdateData] = useState({ ...dataToUpdate });

  const handleUpdateTitle = (e) => {
    setUpdateData({
      ...updateData,
      title: e.target.value,
    });
  };

  const handleUpdateDescription = (e) => {
    setUpdateData({
      ...updateData,
      description: e.target.value,
    });
  };

  const handleUpdateFolder = (e) => {
    setUpdateData({
      ...updateData,
      folder: e.target.value,
    });
  };

  const handleUpdateThumbnail = (e) => {
    setUpdateData({
      ...updateData,
      thumbnail: e.target.files[0],
    });
  };

  const handleUpdateDate = (e) => {
    setUpdateData({
      ...updateData,
      serviceDate: e.target.value,
    });
  };

  const handleUpdateForm = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", updateData.title);
    formData.append("description", updateData.description);
    formData.append("folderName", updateData.folder);
    formData.append("thumbnail", updateData.thumbnail);
    formData.append("serviceDate", updateData.serviceDate);
    try {
      const response = await fetch(
        `http://localhost:3001/video/${dataToUpdate.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const data = await response.json();
    } catch (err) {
      console.error(err);
    }

    setIsUpdateModal(!isUpdateModal);
  };

  useEffect(() => {
    const folder = folderData.find(({ id }) => id === dataToUpdate.folderId);
    setUpdateData({
      ...updateData,
      folder: folder.name,
    });
  }, []);

  return (
    <div id="update-modal">
      <form
        method="PUT"
        encType="multipart/form-data"
        onSubmit={handleUpdateForm}
      >
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder={dataToUpdate.title}
          onChange={handleUpdateTitle}
        />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder={dataToUpdate.description}
          onChange={handleUpdateDescription}
        />
        <label htmlFor="folder">Choose a Folder:</label>
        <input
          list="folder"
          name="folderName"
          onChange={handleUpdateFolder}
          placeholder={updateData.folder}
        />
        <label htmlFor="serviceDate">New Date:</label>
        <input
          type="date"
          name="serviceDate"
          id="serviceDate"
          onChange={handleUpdateDate}
        />
        <datalist id="folder">
          {folderData.map((folder) => (
            <option key={folder.id}>{folder.name}</option>
          ))}
        </datalist>
        <label htmlFor="thumbnail">Choose a Thumbnail: </label>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          accept="image/*"
          onChange={handleUpdateThumbnail}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default UpdateModal;
