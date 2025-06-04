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

  // Add session and status to match AuthContextType
  const status = session ? 'authenticated' : 'unauthenticated';

  return (
    <AuthContext.Provider value={{ token, session, status }}>
      {children}
    </AuthContext.Provider>
  );
};

export default SessionGuard;
