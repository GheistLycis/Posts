'use client';
import { FC, ReactNode } from 'react';
import SessionContext from '../SessionContext';
import { useSessionProvider } from './useContextProvider';

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const value = useSessionProvider();

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export default SessionProvider;
