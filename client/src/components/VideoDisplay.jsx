import React from "react";
import { Link } from "react-router-dom";

function VideoDisplay({ videoData }) {
  return (
    <>
      <h1>Choose A Video</h1>
      <main className="grid">
        {videoData.map((data) => (
          <div key={data.id} className="thumbnail-container">
            <Link to={data.videoPath}>
              <img
                src={`http://localhost:3001${data.thumbnailPath}`}
                alt={data.description}
                width="300px"
              />
            </Link>
            <h3>{data.title}</h3>
          </div>
        ))}
      </main>
    </>
  );
}

export default VideoDisplay;
