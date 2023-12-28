"use client";
import { useState } from "react";
import VideoPlayer from "./Videoplayer";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

const Videocard = ({ file }) => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(true);

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
    <div className="flex">
      {showVideoPlayer && (
        <div className="w-[320px] flex justify-center items-center h-[220px] mt-16 ml-4 mr-4">
          <Dialog>
            <DialogTrigger asChild className="">
              <Button variant="ghost" size="sm" className="ml-auto">
                <div className="flex flex-col">
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
                  <div className="bg-purple-400 w-[320px] p-2 rounded-b-2xl -translate-y-8 z-0 flex">
                    <div className="flex items-center">
                      <UserProfileIcon />
                      <div className="flex flex-col ml-4 items-start">
                        <h1 className="text-lg font-bold">{title}</h1>
                        <p className="text-gray-500 text-xs">{FormatedDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <div className="w-[462px] h-[271px]">
                <VideoPlayer
                  videoUrl={`http://localhost:4000/api/video/stream/${URL}`}
                />
              </div>
              <div>
                {description && <p className="text-gray-500">{description}</p>}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Videocard;
