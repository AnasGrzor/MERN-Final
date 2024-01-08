"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const LogOut = () => {
  const router = useRouter();
  const { setIsLoggedIn} = useContext(AuthContext);

  // Check if running on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("https://wizbackend.cyclic.app/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Logout failed");
          }
          return response;
        })
        .then((response) => {
          if (response.status === 204) {
            toast.success("Logged out successfully", {
              toastId: "logout-success",
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setIsLoggedIn(false);
            localStorage.clear();
            router.push("/");
          }
        })
        .catch((error) => {
          console.error(error, "Failed to log out");
        });
    }
  }, []);
};
