"use client";
import { useState, useEffect, useMemo } from "react";
import Videocard from "./Videocard";
import VideoCardSkeleton from "./VideoCardSkeleton";

const VideoList = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dataCache, setDataCache] = useState({});

  const memoCard = useMemo(() => {
    return (
      <div className="flex flex-wrap">
        {files.map((file) => (
          <Videocard key={file.id} file={file} />
        ))}
      </div>
    );
  },[files]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the data is already cached
        if (dataCache.hasOwnProperty("files")) {
          console.log("Data retrieved from cache:", dataCache.files);
          setFiles(dataCache.files);
          setIsLoading(false);
        } else {
          // Fetch video data from your server
          const response = await fetch(
            "http://localhost:4000/api/video/allFiles"
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();

          // Update cache with fetched data
          setDataCache({ files: data.files });

          console.log("Fetched data:", data.files);
          setFiles(data.files);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchData();
  }, [dataCache]); // Include dataCache in dependencies to react to changes in the cache

  if (isLoading) {
    return (
      <>
        <div className="flex flex-wrap">
          <VideoCardSkeleton count={8} />
        </div>
      </>
    );
  }

  return <div className="flex flex-wrap">{memoCard}</div>;
};

export default VideoList;
