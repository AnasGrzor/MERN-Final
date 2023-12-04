"use client";

import { useContext } from "react";
import { AuthContext } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";

export const LogOut = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useContext(AuthContext);

  fetch("http://localhost:4000/auth/logout", {
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
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/");
      }
    })
    .catch((error) => {
      console.error(error, "Failed to log out");
      
    });
};
