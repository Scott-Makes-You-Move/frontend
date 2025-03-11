"use client"
import {signOut} from "next-auth/react";

export default function Logout() {
  return <button className="px-4 py-2 bg-accent text-background rounded-full font-semibold hover:bg-accent/80 transition-colors"
                 onClick={() => signOut()}>
    Sign Out
  </button>
}