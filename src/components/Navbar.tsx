'use client';
import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Logout from '@/components/Logout';
import { Button } from '@/components/ui/Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-screen-lg bg-primary rounded-full shadow-lg px-6 py-3 flex items-center justify-between">
      <Logo showText variant="white" size="md" />

      {/* Navigation + menu toggle */}
      <div className="flex items-center gap-4">
        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-foreground">
          <Link href="/about" className="text-white hover:text-accent transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-accent transition-colors">
            Contact
          </Link>
          <Logout />
        </nav>

        {/* Mobile Toggle + Dropdown */}
        <div className="relative">
          <Button
            onClick={toggleMenu}
            size="icon"
            variant="ghost"
            aria-label="Toggle menu"
            className="rounded-xl text-background"
          >
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </Button>

          {isOpen && (
            <div className="absolute -right-3 top-10 mt-2 w-48 bg-primary border border-border rounded-xl shadow-lg z-50">
              {[
                ['Sessions', '/sessions'],
                ['Progress', '/progress'],
                ['Leaderboard', '/leaderboard'],
                ['Mini Workouts', '/mini-workouts'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-background hover:bg-accent hover:text-background transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
