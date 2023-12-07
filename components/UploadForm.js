"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { refreshToken } from "../features/auth/AuthToken";

function UploadForm() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [Description, setDescription] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    console.log(file);
    formData.append("title", title);
    formData.append("myVideo", file);

    formData.append("Description", Description);

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:4000/api/video/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token
      },
    });

    const data = await response.json();

    if (response.status === 403) {
      await refreshToken();
      const response = await fetch("http://localhost:4000/api/video/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      
      const data = await response.json();
      console.log(data);

    }

    if (response.status === 200) {
      toast.success("Video uploaded successfully"),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        };
      
    } else {
      toast.error("Error uploading video"),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        };
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <label className="block text-lg font-semibold mb-4 text-gray-800">
        Video Title
      </label>
      <div className="mb-4">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
          required
          placeholder="Enter video title"
          defaultValue={""}
        />
      </div>

      <label className="block text-lg font-semibold mb-4 text-gray-800">
        Description
      </label>
      <div className="mb-4">
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
          rows="4"
          cols="50"
          defaultValue={""}
          required
          placeholder="Enter video description"
          draggable="false"

        />
      </div>

      <label className="block text-lg font-semibold mb-4 text-gray-800">
        Upload Video
      </label>
      <div className="mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
          required
        />
      </div>

      <Button
        variant="default"
        type="submit"
        className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Upload
      </Button>
    </form>
  );
}

export default UploadForm;
