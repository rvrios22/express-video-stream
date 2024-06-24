import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { useLocation } from "react-router-dom";

function Video() {
  const location = useLocation();

  return <VideoPlayer location={location.pathname} />;
}

export default Video;
