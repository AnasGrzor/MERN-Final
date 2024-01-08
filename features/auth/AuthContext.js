"use client";

import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

   const checkUserAuthentication = (token) => {
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const decodedToken = jwtDecode(token);
    console.log(decodedToken);

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.clear()
      setIsLoggedIn(false);
      router.push("/login");
      toast.error("Session expired. Please login again.");
      return;
    }

    setIsLoggedIn(true);
    // Set other state or perform necessary actions
  };

  // useEffect to check user authentication when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    checkUserAuthentication(token);
  }, []);

  // Function to set the profile when the user logs in
  const setProfileOnLogin = (token) => {
    checkUserAuthentication(token);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, setProfileOnLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
