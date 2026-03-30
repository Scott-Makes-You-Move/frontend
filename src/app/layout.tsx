'use client';

import './globals.css';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar, { NavbarHandle, NavbarLink, NavbarAppearance, NavbarCTA } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from './Providers';
import SessionGuard from '@/components/SessionGuard';
import ChatWidget from '@/components/ChatWidget';
import { getNavConfig, resolveRouteMeta } from '@/lib/navigation/navigation';

/* type NavbarConfig = {
  appearance: NavbarAppearance;
  links: NavbarLink[];
  cta?: NavbarCTA;
  showLogout: boolean;
}; */

/* const getNavbarConfig = (pathname: string | null): NavbarConfig => {
  if (pathname === '/') {
    return {
      appearance: 'overlay',
      links: [
        { label: 'Probleem', href: '#probleem', kind: 'anchor' },
        { label: 'Oplossing', href: '#oplossing', kind: 'anchor' },
        { label: 'Voordelen', href: '#voordelen', kind: 'anchor' },
        { label: 'Hoe het werkt', href: '#hoe-het-werkt', kind: 'anchor' },
        { label: 'Over Scott', href: '#over-scott', kind: 'anchor' },
      ],
      cta: {
        label: 'Plan een demo',
        href: '#contact',
        kind: 'anchor',
      },
      showLogout: false,
    };
  }

  return {
    appearance: 'solid',
    links: [
      { label: 'About', href: '/about', kind: 'route' },
      { label: 'Contact', href: '/contact', kind: 'route' },
    ],
    showLogout: true,
  };
}; */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navbarRef = useRef<NavbarHandle>(null);
  const [navHeight, setNavHeight] = useState(80);
  const pathname = usePathname();

  const routeMeta = resolveRouteMeta(pathname);
  const navbarConfig = getNavConfig(pathname);

  return (
    <html lang="en">
      <body className="antialiased flex min-h-screen flex-col">
        <Providers>
          <SessionGuard>
            {routeMeta.showNavbar !== false && <Navbar ref={navbarRef} {...navbarConfig} />}
            <main
              className="flex-1 w-full bg-gray-100 text-center"
              style={
                routeMeta.showNavbar !== false
                  ? { paddingTop: navHeight, paddingBottom: 'var(--footer-height)' }
                  : { paddingTop: 0, paddingBottom: 0 }
              }
            >
              {children}
              {routeMeta.showNavbar !== false && <ChatWidget />}
            </main>
            {routeMeta.showNavbar !== false && <Footer />}
          </SessionGuard>
        </Providers>
      </body>
    </html>
  );
}
