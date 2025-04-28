'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';

export default function Logout() {
  return (
    <Button
      onClick={() => signOut()}
      size="default"
      className="bg-accent text-background hover:bg-accent/80 rounded-full font-semibold"
    >
      Sign Out
    </Button>
  );
}
