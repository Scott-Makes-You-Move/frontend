import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

// src/app/layout.tsx
import './globals.css'
import {Providers} from './Providers'
import SessionGuard from '@/components/SessionGuard'

// ...

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className="antialiased">
        <Providers>
            <SessionGuard>
                <Navbar/>
                <main className="flex-1 w-full bg-gray-100 px-4 text-center">
                    {children}
                </main>
                <Footer/>
            </SessionGuard>
        </Providers>
        </body>
        </html>
    )
}
