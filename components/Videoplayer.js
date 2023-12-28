"use client"

import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { VideoPlayerSkeleton } from "./VideoPlayerSkeleton";

const VideoPlayer = ({ videoUrl }) => {
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);

        // Clean up function
        return () => URL.revokeObjectURL(url);
      });
  }, [videoUrl]);

  return (
    <div>
    {isLoading && <VideoPlayerSkeleton />}
        <div>
          {/* {videoBlobUrl && <ReactPlayer url={videoBlobUrl} controls={true} width="100%" height="100%" playIcon={<PlayIcon className="w-12 h-12" />} playing={true} muted={true} />} */}
          <ReactPlayer url={videoBlobUrl} controls={true} playing muted width="100%" height="275px" />
        </div>
    </div>
  );
};

export default VideoPlayer;
