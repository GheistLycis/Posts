import SessionProvider from '@contexts/SessionContext/Provider/ContextProvider';
import { FC, ReactNode } from 'react';

const AppLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="relative h-svh pt-16">
    <SessionProvider>{children}</SessionProvider>
  </div>
);

export default AppLayout;
