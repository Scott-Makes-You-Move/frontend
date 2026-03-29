'use client';

import './globals.css';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar, { NavbarHandle, NavbarLink, NavbarAppearance, NavbarCTA } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from './Providers';
import SessionGuard from '@/components/SessionGuard';
import ChatWidget from '@/components/ChatWidget';

type NavbarConfig = {
  appearance: NavbarAppearance;
  links: NavbarLink[];
  cta?: NavbarCTA;
  showLogout: boolean;
};

const getNavbarConfig = (pathname: string | null): NavbarConfig => {
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navbarRef = useRef<NavbarHandle>(null);
  const [navHeight, setNavHeight] = useState(80);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (navbarRef.current) {
        setNavHeight(navbarRef.current.getHeight());
      }
    };

    handleResize(); // initial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (navbarRef.current) {
      setNavHeight(navbarRef.current.getHeight());
    }
  }, [pathname]);

  const isPilotChallenge = pathname === '/pilot-challenge';
  const navbarConfig = getNavbarConfig(pathname);

  return (
    <html lang="en">
      <body className="antialiased flex min-h-screen flex-col">
        <Providers>
          <SessionGuard>
            {!isPilotChallenge && <Navbar ref={navbarRef} {...navbarConfig} />}
            <main
              className="flex-1 w-full bg-gray-100 text-center"
              style={
                !isPilotChallenge
                  ? { paddingTop: navHeight, paddingBottom: 'var(--footer-height)' }
                  : { paddingTop: 0, paddingBottom: 0 }
              }
            >
              {children}
              {!isPilotChallenge && <ChatWidget />}
            </main>
            {!isPilotChallenge && <Footer />}
          </SessionGuard>
        </Providers>
      </body>
    </html>
  );
}
