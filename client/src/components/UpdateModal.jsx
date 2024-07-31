import React, { useEffect, useState } from "react";

function UpdateModal({
  folderData,
  dataToUpdate,
  setIsUpdateModal,
  isUpdateModal,
}) {
  const [folderToUpdate, setFolderToUpdate] = useState("");
  const handleUpdateTitle = (e) => {};
  const handleUpdateDescription = (e) => {};
  const handleUpdateFolder = (e) => {};
  const handleUpdateForm = (e) => {
    e.preventDefault();
    setIsUpdateModal(!isUpdateModal);
  };
  useEffect(() => {
    const folder = folderData.find(({ id }) => id === dataToUpdate.folderId);
    setFolderToUpdate(folder.name);
  }, []);

  return (
    <div id="update-modal">
      <form
        method="post"
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
        <textarea
          type="text"
          name="description"
          id="description"
          placeholder={dataToUpdate.description}
          onChange={handleUpdateDescription}
        ></textarea>
        <label htmlFor="folder">Choose a Folder:</label>
        <input
          list="folder"
          name="folder"
          onChange={handleUpdateFolder}
          placeholder={folderToUpdate}
        />
        <datalist id="folder">
          {folderData.map((folder) => (
            <option key={folder.id}>{folder.name}</option>
          ))}
        </datalist>
        {/* <label htmlFor="video">Choose a Video: </label>
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
        /> */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default UpdateModal;
