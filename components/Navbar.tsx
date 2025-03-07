"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";
import Logout from "@/components/Logout";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="w-full flex justify-between items-center p-4  shadow-md z-10 border-b-2 border-primary bg-primary">
            <Logo variant="white" size="md" showText={true} />

            <nav className="flex justify-center gap-6 text-background font-body font-bold">
                <Link
                    href="/about"
                    className="hidden md:block hover:text-accent transition-colors"
                >
                    About Us
                </Link>
                <Link
                    href="/contact"
                    className="hidden md:block hover:text-accent transition-colors"
                >
                    Contact
                </Link>
                <Logout />

                <div className="relative">
                    <button className="block focus:outline-none" onClick={toggleMenu}>
                        <svg
                            className="w-6 h-6 text-background"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
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
                        <div className="absolute -right-3 top-10 mt-2 w-48 bg-primary border border-primary rounded shadow-lg">
                            <Link
                                href="/sessions"
                                className="block px-4 py-2 text-background hover:bg-accent hover:text-background transition"
                            >
                                Sessions (X)
                            </Link>

                            <Link
                                href="/progress"
                                className="block px-4 py-2 text-background hover:bg-accent hover:text-background transition"
                            >
                                Progress
                            </Link>
                            <Link
                                href="/leaderboard"
                                className="block px-4 py-2 text-background hover:bg-accent hover:text-background transition"
                            >
                                Leaderboard (X)
                            </Link>
                            <Link
                                href="/posture-check"
                                className="block px-4 py-2 text-background hover:bg-accent hover:text-background transition"
                            >
                                Posture Check (X)
                            </Link>
                            <Link
                                href="/mini-workouts"
                                className="block px-4 py-2 text-background hover:bg-accent hover:text-background transition"
                            >
                                Mini Workouts (X)
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;