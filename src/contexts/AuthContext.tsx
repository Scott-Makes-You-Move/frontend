'use client';

import { Session } from 'next-auth';
import { createContext, useContext } from 'react';

interface AuthContextType {
  token: string | null;
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  session: null,
  status: 'loading',
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContext.Provider');
  }
  return context;
};
