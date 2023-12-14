
const VideoCardSkeleton = ({ count }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div key={index} className="flex flex-col items-center ml-4 mt-4 ">
      <div className="w-[320px] h-[220px] bg-gray-300 rounded-2xl animate-pulse">
        {/* Placeholder for the image */}
      </div>
      <div className="bg-purple-400 w-[320px] p-2 rounded-b-2xl pt-4 -translate-y-2">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="flex flex-col ">
            <h1 className="text-lg font-bold bg-gray-400 w-20 h-4 mb-2 animate-pulse"></h1>
            <p className="text-gray-500 text-xs w-16 h-3 animate-pulse"></p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="grid ml-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-4 gap-2">
      {skeletons}
    </div>
  );
};

export default VideoCardSkeleton;
