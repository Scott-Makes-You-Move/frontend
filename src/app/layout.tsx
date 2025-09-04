'use client';

import './globals.css';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar, { NavbarHandle } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from './Providers';
import SessionGuard from '@/components/SessionGuard';
import ChatWidget from '@/components/ChatWidget';

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

  return (
    <html lang="en">
      <body className="antialiased flex min-h-screen flex-col">
        <Providers>
          <SessionGuard>
            {pathname !== '/pilot-challenge' && <Navbar ref={navbarRef} />}
            <main
              className="flex-1 w-full bg-gray-100 text-center"
              style={
                pathname !== '/pilot-challenge'
                  ? { paddingTop: navHeight, paddingBottom: 'var(--footer-height)' }
                  : { paddingTop: 0, paddingBottom: 0 }
              }
            >
              {children}
              <ChatWidget />
            </main>
            {pathname !== '/pilot-challenge' && <Footer />}
          </SessionGuard>
        </Providers>
      </body>
    </html>
  );
}
