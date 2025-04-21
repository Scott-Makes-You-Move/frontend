'use client';

import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Logout from '@/components/Logout';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';

export interface NavbarHandle {
  getHeight: () => number;
}

const Navbar = forwardRef<NavbarHandle>((_, ref) => {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const mobileLinks: [string, string][] = [
    ['Movement', '/'],
    ['Sessions', '/sessions'],
    ['Progress', '/progress'],
    ['Leaderboard', '/leaderboard'],
    ['Mini Workouts', '/mini-workouts'],
  ];

  useImperativeHandle(ref, () => ({
    getHeight: () => navRef.current?.offsetHeight || 0,
  }));

  return (
    <header
      ref={navRef}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-screen-lg bg-primary rounded-full shadow-lg px-6 py-3 flex items-center justify-between"
    >
      <Link href="/">
        <Logo showText variant="white" size="md" />
      </Link>

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
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl text-foreground block"
                >
                  ×
                </motion.span>
              ) : (
                <motion.svg
                  key="hamburger"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </Button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute -right-3 top-10 mt-2 w-48 bg-primary border border-border rounded-xl shadow-lg z-50"
              >
                {mobileLinks.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-background hover:bg-accent hover:text-background transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;
