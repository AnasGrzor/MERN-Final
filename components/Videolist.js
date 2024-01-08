"use client";
import { useState, useEffect, useMemo } from "react";
import Videocard from "./Videocard";
import VideoCardSkeleton from "./VideoCardSkeleton";
import {Filter} from "./Filter";

const VideoList = () => {
   const [files, setFiles] = useState([]);
   const [filteredFiles, setFilteredFiles] = useState([]); // State for filtered files
   const [isLoading, setIsLoading] = useState(true);

   const [dataCache, setDataCache] = useState({});

   const memoCard = useMemo(() => {
     return (
       <div className="flex flex-wrap">
         {filteredFiles.map(
           (
             file // Use filteredFiles instead of files
           ) => (
             <Videocard key={file.id} file={file} />
           )
         )}
       </div>
     );
   }, [filteredFiles]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the data is already cached
        if (dataCache.hasOwnProperty("files")) {

          setFiles(dataCache.files);
          setIsLoading(false);
        } else {
          // Fetch video data from your server
          const response = await fetch(
            "https://wizbackend.cyclic.app/api/video/allFiles"
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();

          // Update cache with fetched data
          setDataCache({ files: data.files });

          setFiles(data.files);
          setFilteredFiles(data.files);
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

  return (
    <div>
      <div className="flex justify-end p-2 ">
        <Filter videos={files} setFilteredVideos={setFilteredFiles} />{" "}
      </div>

      <div className="flex flex-wrap ml-16 drop-shadow-2xl">{memoCard}</div>
    </div>
  );
};

export default VideoList;
