"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
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
      <div className="mt-4 md:mt-0">
        {isLoggedIn && (
          <>
            <Button
              variant="default"
              className="text-lg mr-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              <Link href="/vidupload">Upload</Link>
            </Button>
            <Button
              variant="default"
              className="text-lg mr-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              <Link href="/dash">Dash</Link>
            </Button>
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
