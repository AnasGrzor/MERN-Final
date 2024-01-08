"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const UserProfile = () => {
  const isLocalStorageAvailable = typeof localStorage !== "undefined";
  const user = isLocalStorageAvailable
    ? JSON.parse(localStorage.getItem("profile"))
    : null;
  const userId = user?._id;
  const closeRef = useRef(null);

  // Initialize initialFormData with the initial values from localStorage
  const initialFormData = {
    username: user?.username || "",
    email: user?.email || "",
    profilePic: "",
  };

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    profilePic: "", // You can handle file input separately
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Basic validation examples, adjust as needed
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters and numbers";
    } else if (formData.username.length < 3 || formData.username.length > 20) {
      newErrors.username = "Username must be between 3 and 20 characters long";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any changes in the form data
    if (JSON.stringify(formData) === JSON.stringify(initialFormData)) {
      // No changes, do nothing
      closeRef.current?.click();
      return;
    }

    const token = localStorage.getItem("token");

    // Validate the form
    if (validateForm()) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/users/${userId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.status === 200) {
          const updatedData = await response.json();

          // Retrieve existing data from localStorage
          const existingData =
            JSON.parse(localStorage.getItem("profile")) || {};

          // Update only the changed values
          const updatedUserData = {
            ...existingData,
            username: updatedData.username,
            email: updatedData.email,
          };

          // Store the updated data back in localStorage
          localStorage.setItem("profile", JSON.stringify(updatedUserData));

          // Update the form data in the component
          setFormData((prevFormData) => ({
            ...prevFormData,
            username: updatedData.username,
            email: updatedData.email,
          }));

          // Close the dialog
          closeRef.current?.click();

          // Handle success
          toast.success("Profile updated successfully.");
        } else {
          toast.error("Failed to update profile");
        }
      } catch (error) {
        toast.error("Failed to update profile");
        console.error(error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="p-2 bg-purple-300 text-black h-[400px] w-[400px] rounded-lg">
        <h1 className="text-2xl font-bold text-center">Profile</h1>
        <div className="flex items-center justify-center mt-4">
          <img
            src={user?.profilePic}
            alt=""
            className="w-[200px] h-[200px] rounded-full"
          />
        </div>
        <div>
          <h1 className="mt-2 text-lg font-bold">username: {user?.username}</h1>
          <p className="font-bold mt-2 text-xs">Email: {user?.email}</p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button variant="default" className="mt-4 text-black ">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col space-y-4">
                <Label htmlFor="username">Update Username</Label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="Username"
                  required
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}

                <Label htmlFor="email">Update Email</Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email"
                  required
                  className={`py-3 px-4 border border-gray-200 rounded-lg w-full text-sm outline-none ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}

                <Label htmlFor="profilePic">Update Profile Picture</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, profilePic: e.target.files[0] })
                  }
                  className="cursor-pointer"
                  disabled="true"
                />

                {/* Buttons */}
                <div className="flex justify-between">
                  <DialogClose ref={closeRef}>
                    <Button variant="destructive" className="ml-auto">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant="ghost"
                    type="submit"
                    className="bg-blue-600 text-white"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
