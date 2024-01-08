"use client";
import {  useState } from "react";

import VideoPlayerDialog from "./VideoCardModal";

const Videocard = ({ file }) => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(true);
  const user = JSON.parse(localStorage.getItem("profile"));
  const isOwner = file.userId === user._id
  const title = file.title;
  const createdAt = file.createdAt;
  const URL = file.id;
  const description = file.description;
  const category = file.category;
  const pfp = file.pfp;
  const thumbnail = `https://picsum.photos/320/220?random=${Math.random()}`;

  const handlePlay = () => {
    setShowVideoPlayer(true);
    console.log("Clicked");
    console.log(URL);
  };

  const FormatedDate = new Date(createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const UserProfileIcon =  () => {
    const userId = Math.floor(Math.random() * 100); // generate a unique user identifier for each user;
    const profilePicUrl = `https://randomuser.me/api/portraits/thumb/men/${userId}.jpg`;

    return profilePicUrl;

  };
  return (
    <div className="flex">
      {showVideoPlayer && (
        <VideoPlayerDialog
          thumbnail={thumbnail}
          title={title}
          FormatedDate={FormatedDate}
          description={description}
          URL={URL}
          handlePlay={handlePlay}
          UserProfile={pfp || UserProfileIcon()}
          category={category}
        />
      )}
    </div>
  );
};

export default Videocard;
