"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full flex justify-between items-center p-4 bg-white shadow-md z-10">
      <h1 className="text-2xl font-bold">Scott Makes You Move</h1>

      <nav className="flex justify-center gap-6 text-gray-700">
        <a href="/about" className="hidden md:block hover:underline">
          About Us
        </a>
        <a href="/contact" className="hidden md:block hover:underline">
          Contact
        </a>
        <div className="relative">
          <button className="block focus:outline-none" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <a
                href="/sessions"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Sessions
              </a>
              <Link
                href="/progress"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Progress
              </Link>
              <a
                href="/leaderboard"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Leaderboard
              </a>
              <a
                href="/posture-checks"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Posture Checks
              </a>
              <a
                href="/mini-workouts"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Mini Workouts
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
