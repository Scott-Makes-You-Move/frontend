'use client';

import { signIn, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

const SessionGuard = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated' || session?.error === 'RefreshAccessTokenError') {
      signIn('keycloak', {
        callbackUrl: window.location.href,
      });
    }
  }, [status, session?.error]);

  const token = session?.accessToken ?? null;

  return (
    <AuthContext.Provider value={{ token, session, status }}>
      {children}
    </AuthContext.Provider>
  );
};

export default SessionGuard;
