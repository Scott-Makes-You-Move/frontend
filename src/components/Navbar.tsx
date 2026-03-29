'use client';

import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Logout from '@/components/Logout';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';

export interface NavbarHandle {
  getHeight: () => number;
}

export type NavbarLink = {
  label: string;
  href: string;
  kind?: 'route' | 'anchor';
};

export type NavbarAppearance = 'solid' | 'overlay';

export type NavbarCTA = {
  label: string;
  href: string;
  kind?: 'route' | 'anchor';
};

interface NavbarProps {
  appearance?: NavbarAppearance;
  links?: NavbarLink[];
  cta?: NavbarCTA;
  showLogout?: boolean;
}

const DEFAULT_APP_LINKS: NavbarLink[] = [
  { label: 'About', href: '/about', kind: 'route' },
  { label: 'Contact', href: '/contact', kind: 'route' },
];

const NavItem = ({
  item,
  onClick,
  className,
}: {
  item: NavbarLink | NavbarCTA;
  onClick?: () => void;
  className?: string;
}) => {
  const kind = item.kind ?? (item.href.startsWith('#') ? 'anchor' : 'route');

  if (kind === 'anchor') {
    return (
      <a href={item.href} onClick={onClick} className={className}>
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} onClick={onClick} className={className}>
      {item.label}
    </Link>
  );
};

const Navbar = forwardRef<NavbarHandle, NavbarProps>(
  ({ appearance = 'solid', links = DEFAULT_APP_LINKS, cta, showLogout = true }, ref) => {
    const navRef = useRef<HTMLElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prev) => !prev);

    useImperativeHandle(ref, () => ({
      getHeight: () => navRef.current?.offsetHeight || 0,
    }));

    useEffect(() => {
      setIsOpen(false);
    }, [links, appearance, cta, showLogout]);

    const isOverlay = appearance === 'overlay';

    const headerClasses = isOverlay
      ? 'fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-screen-lg rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 bg-primary/90 backdrop-blur-md shadow-lg'
      : 'fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-screen-lg rounded-full px-6 py-3 flex items-center justify-between bg-primary shadow-lg';

    const desktopLinkClasses = isOverlay
      ? 'text-white hover:text-accent transition-colors'
      : 'text-white hover:text-accent transition-colors';

    const mobileMenuClasses = isOverlay
      ? 'absolute -right-3 top-10 mt-2 w-56 bg-primary/95 backdrop-blur-md border border-border rounded-xl shadow-lg z-50'
      : 'absolute -right-3 top-10 mt-2 w-56 bg-primary border border-border rounded-xl shadow-lg z-50';

    /* const mobileLinks: [string, string][] = [
      ['Home', '/'],
      ['Sessions', '/sessions'],
      ['Progress', '/progress'],
      ['Leaderboard', '/leaderboard'],
      ['Mini Workouts', '/mini-workouts'],
    ]; */

    /* useImperativeHandle(ref, () => ({
      getHeight: () => navRef.current?.offsetHeight || 0,
    })); */

    return (
      <header ref={navRef} className={headerClasses}>
        <Link href="/" aria-label="Go to homepage">
          <Logo showText variant="white" size="md" />
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 font-medium text-foreground">
            {links.map((link) => (
              <NavItem
                key={`${link.kind ?? 'auto'}-${link.href}`}
                item={link}
                className={desktopLinkClasses}
              />
            ))}
            {cta && (
              <NavItem
                item={cta}
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-background"
              />
            )}

            {showLogout && <Logout />}
            {/* <Link href="/about" className="text-white hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-accent transition-colors">
              Contact
            </Link>
            <Logout /> */}
          </nav>

          {/* Mobile Toggle + Dropdown */}
          <div className="relative">
            <Button
              onClick={toggleMenu}
              size="icon"
              variant="ghost"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
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
                    className="block text-2xl text-foreground"
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
                  className={mobileMenuClasses}
                >
                  {/* {mobileLinks.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-background hover:bg-accent hover:text-background transition-colors"
                    >
                      {label}
                    </Link>
                  ))} */}

                  {links.map((link) => (
                    <NavItem
                      key={`${link.kind ?? 'auto'}-${link.href}`}
                      item={link}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-background transition-colors hover:bg-accent hover:text-background"
                    />
                  ))}

                  {cta && (
                    <div className="px-3 pb-3 pt-2">
                      <NavItem
                        item={cta}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-lg bg-white px-4 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-background"
                      />
                    </div>
                  )}

                  {showLogout && (
                    <div className="border-t border-border px-3 py-3">
                      <Logout />
                    </div>
                  )}
                  
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    );
  },
);

Navbar.displayName = 'Navbar';
export default Navbar;
