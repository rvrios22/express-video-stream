import React, { useEffect, useState, useRef } from "react";

function VideoPlayer({ videoSrc, videoData }) {
  // console.log(videoData)
  return (
    <div>
      <video src={videoSrc} width="500" controls />
    </div>
  );
}

export default VideoPlayer;
