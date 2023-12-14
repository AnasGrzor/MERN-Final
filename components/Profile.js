"use client";
import { useState, useEffect } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const thumbnail = `https://picsum.photos/1920/1080?random=${Math.random()}`;

  useEffect(() => {
    // Fetch a random user from the Random User Generator API
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        const randomUser = data.results[0];
        setUser({
          name: `${randomUser.name.first} ${randomUser.name.last}`,
          email: randomUser.email,
          picture: randomUser.picture.large,
          phone: randomUser.phone,
          location: `${randomUser.location.city}, ${randomUser.location.state}, ${randomUser.location.country}`,
        });
      })
      .catch((error) => console.error("Error fetching random user:", error));
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex flex-col">
        <div>
          <img
            src={thumbnail}
            alt="User Profile"
            className="w-full h-[300px] object-cover object-center"
          />
        </div>
        <div className="flex">
          <div className="flex flex-col p-6 w-[420px]">
            <img
              src={user.picture}
              alt="User Profile"
              className="w-24 h-24 object-cover object-top rounded-full mb-4"
            />
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">{user.location}</p>
            <p className="text-gray-500">{user.phone}</p>

            <button className="w-24 mt-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full justify-end">
              Follow
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
