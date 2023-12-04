"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";

function UploadForm() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const submitForm = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("myVideo", file);
    formData.append("thumbnail", thumbnail);

    const response = await fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: formData,
    });

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
      FormData.reset();
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
        />
      </div>

      <label className="block text-lg font-semibold mb-4 text-gray-800">
        Upload Thumbnail
      </label>
      <div className="mb-4">
        <input
          type="file"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
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
