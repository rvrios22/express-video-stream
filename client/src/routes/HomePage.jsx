import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [videoData, setVideoData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/video");
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        const data = await response.json();
        setVideoData(data);
      } catch (err) {
        console.error("something went wrong", err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>Choose A Video</h1>
      {videoData.map((data) => (
        <div key={data.id}>
          <Link to={data.location}>
            <img src={data.thumbnail} alt={data.description} />
            <h3>{data.title}</h3>
          </Link>
        </div>
      ))}
    </>
  );
}

export default HomePage;
