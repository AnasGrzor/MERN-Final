"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

import { AuthContext } from "@/features/auth/AuthContext";

const LoginForm = () => {
  const router = useRouter();
  const { IsLoggedIn,setIsLoggedIn, setProfileOnLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.replace("/dash");
    }
  }, [IsLoggedIn]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear any existing errors when input changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation example
    const newErrors = {
      username: formData.username.trim() === "" ? "Username is required" : "",
      password: formData.password.trim() === "" ? "Password is required" : "",
    };

    setErrors(newErrors);

    // Check if there are no errors before proceeding
    if (Object.values(newErrors).every((error) => error === "")) {
      // Perform your sign-in logic here
      try {
        const response = await fetch("http://localhost:4000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.status === 200) {
          // Handle successful signup (redirect, show success message, etc.)
          response.json().then((data) => {
            console.log(data);
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("profile", JSON.stringify(data.profile));
            setProfileOnLogin();
            setIsLoggedIn(true);
          })

          toast.success("Sign-in successful", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            router.push("/dash");
          }, 1000);
        } else {
          toast.error("Error signing in user. Please try again.", {
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
    }
  };

return (
  <div className="flex items-center justify-center min-h-screen bg-purple-100">
    <div className="w-96">
      <div className="flex flex-col gap-10 items-center bg-slate-100 rounded-xl p-6 shadow-lg">
        <div className="w-full">
          <h1 className="text-3xl">Sign In</h1>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          {/* ... (form input fields) */}
          <div className="flex flex-col gap-2">
            <label>Username</label>
            <input
              className={`rounded-md w-full pl-4 py-3 ${
                errors.username && "border-red-500"
              }`}
              type="text"
              name="username"
              placeholder="Email"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="pt-2">Password</label>
            <input
              className={`rounded-md w-full pl-4 py-3 ${
                errors.password && "border-red-500"
              }`}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          <p className="text-xs mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-purple-500">
              Sign Up
            </Link>
          </p>
          {/* ... (form submission button) */}
          <button
            className="mt-4 hover:bg-purple-700 transition-all duration-300 bg-purple-400 text-white rounded-md w-full py-3"
            type="submit"
          >
            Sign In
          </button>
        </form>
        {/* ... (footer text) */}
        <p className="text-xs font-light">
          ©2001–2022 All Magical Rights Reserved. WIZARDO® is a registered
          enchantment of The WIZARDO GROUP, LLC. Sorcery Preferences, Enchanted
          Privacy, and Mystical Terms.
        </p>
      </div>
    </div>
  </div>
)

}


export default LoginForm;
