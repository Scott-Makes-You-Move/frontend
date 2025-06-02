'use client';

import { signIn, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

const SessionGuard = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn('keycloak', {
        callbackUrl: window.location.href,
      });
    }
  }, [session]);

  const token = session?.accessToken ?? null;

  return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
};

export default SessionGuard;
