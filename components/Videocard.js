"use client";
import { useState } from "react";
import VideoPlayer from "./Videoplayer";
import { Cross1Icon } from "@radix-ui/react-icons";

const Videocard = ({ file }) => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const title = file.title;
  const createdAt = file.createdAt;
  const URL = file.id;
  const description = file.description;
  const thumbnail = `https://picsum.photos/320/220?random=${Math.random()}`;

  const handlePlay = () => {
    setShowVideoPlayer(true);
    console.log("Clicked");
    console.log(URL);
  };

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false);
  };

  const FormatedDate = new Date(createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });

  const UserProfileIcon = () => {
    const userId = Math.floor(Math.random() * 100); // generate a unique user identifier for each user;
    const profilePicUrl = `https://randomuser.me/api/portraits/thumb/men/${userId}.jpg`;

    return (
      <img
        src={profilePicUrl}
        alt="profile"
        className="w-12 h-12 rounded-full object-cover object-top"
      />
    );
  };
  return (
    <div className="relative flex flex-col items-center ml-12 mt-4 ">
      {showVideoPlayer && (
        <div className="fixed inset-0 z-50">
          <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-75 ">
            <div className="w-[50vw] h-full bg-black bg-opacity-75 flex items-center justify-center">
              <h1 className="absolute top-12 left-[26%] text-3xl font-bold text-white">
                {title}
              </h1>
              <VideoPlayer
                videoUrl={`http://localhost:4000/api/video/stream/${URL}`}
              />

              <button
                className="absolute top-4 right-4 text-white"
                onClick={closeVideoPlayer}
              >
                <Cross1Icon />
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="w-[320px] h-[220px] bg-cover bg-center rounded-2xl shadow-lg cursor-pointer"
        onClick={handlePlay}
      >
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="bg-purple-400 w-[320px] p-2 rounded-b-2xl -translate-y-8">
        <div className="flex items-center ">
          <UserProfileIcon />
          <div className="flex flex-col ml-2">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-gray-500 text-xs">{FormatedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videocard;
