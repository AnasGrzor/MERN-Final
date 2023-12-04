"use client"

import React, { useState, useEffect } from "react";

const VideoPlayer = ({ videoUrl }) => {
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);

  useEffect(() => {
    // Fetch the video data as a stream when the component mounts
    fetch(videoUrl, {
    //   headers: {
    //     Range: "bytes=0-" + (10 ** 6 - 1), // Request the first 1,000,000 bytes of the video
    //   },
    })
      .then((response) => {
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
    <div className="grid place-content-center">
      {videoBlobUrl && (
        <video
          className="w-[300px] h-[calc(100vh-88px)]"
          src={videoBlobUrl}
          autoPlay
          controls
        />
      )}
    </div>
  );
};

export default VideoPlayer;
