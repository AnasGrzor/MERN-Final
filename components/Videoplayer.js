"use client"

import React, { useState, useEffect } from "react";

const VideoPlayer = ({ videoUrl }) => {
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);

  useEffect(() => {
    // Fetch the video data as a stream when the component mounts
    fetch(videoUrl)
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
    <div className="min-h-screen bg-purple-100">
      <div className="flex flex-col justify-center w-[60%] p-12">
        <h1 className="text-3xl font-bold pb-4">Video Player</h1>
        <div className="w-full">
          {videoBlobUrl && <video src={videoBlobUrl} autoPlay controls muted />}
        </div>
      <div className="mt-4 font-bold text-2xl">
        <h1>Classic</h1>
      </div>
      <div className="mt-4 font-bold text-2xl">
        <h1>Video Description</h1>
        <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
