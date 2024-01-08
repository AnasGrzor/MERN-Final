// VideoPlayerDialog.js

import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import VideoPlayer from "./Videoplayer"; // Make sure to adjust the import path

const VideoPlayerDialog = ({
  thumbnail,
  title,
  FormatedDate,
  description,
  URL,
  handlePlay,
  UserProfile,
  category,

}) => {
  return (
    <div className="w-[320px] flex justify-center items-center h-[320px] mt-4 ml-4 mb-2 p-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto">
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
                  <div className="w-12 h-12 bg-gray-200 rounded-full">
                    <img
                      className="w-12 h-12 bg-gray-200 rounded-full"
                      src={UserProfile}
                      alt="UserProfile"
                    />
                  </div>
                  <div className="flex flex-col ml-4 items-start">
                    <h1 className="text-lg font-bold">{title}</h1>
                    <p className="text-gray-500 text-xs">{FormatedDate}</p>
                    <p className="text-gray-500 text-xs">{category}</p>
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
  );
};

export default VideoPlayerDialog;
