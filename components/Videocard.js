
const Videocard = ({ imageUrl, title, userProfileIcon, postedTime }) => {
  return (
    <div className="flex flex-col items-center ml-4 mt-4">
      <div className="w-[320px] h-[220px] bg-cover bg-center rounded-2xl z-50 shadow-lg ">
        <img
          src={imageUrl}
          alt="Video"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="bg-purple-400 w-[320px] p-2 rounded-b-2xl pt-4 -translate-y-2">
        <div className="flex items-center space-x-4">
          <img
            src={userProfileIcon}
            alt="User Profile"
            className="w-12 h-12 object-cover object-top rounded-full "
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-gray-500 text-xs">{postedTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videocard;

