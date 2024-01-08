"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Clear validation error when user starts typing
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = async (e) => {
    // Prevent form submission
    e.preventDefault();


    // Validate the form fields
    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid email address";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (!formData.password.length > 4 || !formData.password.length > 20) {
      validationErrors.password = "Password must be at least 4 characters long and no more than 20 characters";
    }

    if (!formData.confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If validation passes, handle form submission (send data to the server, etc.)
    // You can add your API call here or navigate to a different page
    try {
      const response = await fetch("https://wizbackend.cyclic.app/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful signup (redirect, show success message, etc.)
        toast.success("Signup successful! Redirecting...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } else {
        toast.error("Error creating user. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error("Error creating user:", response.statusText);
      }
    } catch (error) {
      toast.error("Error submitting form. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white p-6 rounded-2xl shadow-2xl sm:w-2/3 max-w-lg min-w-min sm:p-10 w-full mx-3 sm:mx-0 my-2">
        <h2 className="font-bold text-2xl sm:text-3xl text-center mb-8 text-gray-800">
          Create your free Account
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className={`py-3 px-4 border border-gray-200 rounded-lg w-full text-sm outline-none ${
                errors.username ? "border-red-500" : ""
              }`}
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              className={`py-3 px-4 border border-gray-200 rounded-lg w-full text-sm outline-none ${
                errors.email ? "border-red-500" : ""
              }`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`p-3 border border-gray-200 rounded-lg w-full outline-none ${
                errors.password ? "border-red-500" : ""
              }`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`p-3 border border-gray-200 rounded-lg w-full outline-none ${
                errors.password ? "border-red-500" : ""
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-purple-500">
              Login
            </Link>
          </p>
          {/* ... (form submission button) */}
          <button
            type="submit"
            className="content-center bg-purple-400 font-bold py-2 w-full rounded mt-6 hover:bg-purple-500 text-gray-800"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
