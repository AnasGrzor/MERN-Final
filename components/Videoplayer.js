"use client"

import React, { useState, useEffect } from "react";

const VideoPlayer = ({ videoUrl }) => {
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);


  useEffect(() => {
    // Fetch the video data as a stream when the component mounts
    fetch(videoUrl, {
      headers: {
        "Range": "bytes=0-",
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Fetch response:", response);
        return response.blob();
      })
      .then((blob) => {
        console.log("Fetched Blob:", blob);

        const url = URL.createObjectURL(blob);
        console.log("Created Blob URL:", url);

        setVideoBlobUrl(url);

        // Clean up function
        return () => URL.revokeObjectURL(url);
      });
  }, [videoUrl]);

  return (
    <div className="bg-purple-100">
        <div className="w-[50vw]">
          {videoBlobUrl && <video src={videoBlobUrl} autoPlay controls muted />}
        </div>
    </div>
  );
};

export default VideoPlayer;
