import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from './Providers';
import SessionGuard from '@/components/SessionGuard';

export const metadata: Metadata = {
  title: 'Scott Will Make You Move',
  description:
    'A movement and vitality tracking web app designed to encourage daily activity, track progress, and engage users through gamification.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased flex min-h-screen flex-col">
        <Providers>
          <SessionGuard>
            <Navbar />
            <main className="flex-1 w-full bg-gray-100 px-4 text-center">{children}</main>
            <Footer />
          </SessionGuard>
        </Providers>
      </body>
    </html>
  );
}
