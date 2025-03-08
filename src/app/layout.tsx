import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Scott Will Make You Move',
  description:
    'A movement and vitality tracking web app designed to encourage daily activity, track progress, and engage users through gamification.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body suppressHydrationWarning className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 w-full bg-gray-100 px-4 text-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
