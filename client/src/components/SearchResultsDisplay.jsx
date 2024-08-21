import React from "react";

function SearchResultsDisplay({ videos }) {
  return (
    <div>
      {videos.map((video) => (
        <div key={video.id}>
          <h2>{video.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default SearchResultsDisplay;
