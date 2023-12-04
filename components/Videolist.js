import React from "react";
import Videocard from "./Videocard";

const VideoList = () => {
  const videos = [
    {
      imageUrl:
        "https://images.pexels.com/photos/9956967/pexels-photo-9956967.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      title: "Video 1",
      userProfileIcon:
        "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      postedTime: "2 hours ago",
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/19294997/pexels-photo-19294997/free-photo-of-the-lonely-horse.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      title: "Video 2",
      userProfileIcon:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      postedTime: "1 day ago",
    },
    // Add more video objects as needed
  ];

  return (
    <div className="flex flex-wrap">
      {videos.map((video, index) => (
        <Videocard key={index} {...video} />
      ))}
    </div>
  );
};

export default VideoList;
