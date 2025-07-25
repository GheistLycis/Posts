import { useContext } from 'react';
import Context, { SessionContext } from './SessionContext';

export const useSessionContext = (): SessionContext => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }

  return context;
};
