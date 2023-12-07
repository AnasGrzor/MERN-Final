"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { AuthContext } from "@/features/auth/AuthContext";

const routes = [
  {
    name: "Home",
    path: "/",
    id: 1,
  },
  {
    name: "About",
    path: "/about",
    id: 2,
  },
  {
    name: "Contact",
    path: "/contact",
    id: 3,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <header className="bg-purple-800 flex flex-col md:flex-row justify-between p-6 w-full text-white">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold pt-2">
          Wiz App
        </Link>
      </div>
      <nav className="md:inline-flex items-center">
        <ul className="md:flex items-center mr-4 space-x-8">
          {routes.map((route) => (
            <Button asChild variant="ghost" key={route.id}>
              <li>
                <Link href={route.path}>{route.name}</Link>
              </li>
            </Button>
          ))}
        </ul>
      </nav>
      <div className="mt-4 md:mt-0 flex">
        {isLoggedIn && (
          <>
            <Button
              variant="default"
              className="text-lg mr-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              <Link href="/vidupload">Upload</Link>
            </Button>
            <Avatar className="w-10 h-10 mr-4">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <AvatarFallback>
                <span className="sr-only">Upload</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </AvatarFallback>
            </Avatar>
          </>
        )}
        <Button
          variant="default"
          className="text-lg bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          <Link href={isLoggedIn ? "/logout" : "/login"}>
            {isLoggedIn ? "Logout" : "Login"}
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
