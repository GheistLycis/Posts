import SessionProvider from '@contexts/SessionContext/Provider/ContextProvider';
import { FC, ReactNode } from 'react';

const AppLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex min-h-svh justify-center">
    <SessionProvider>{children}</SessionProvider>
  </div>
);

export default AppLayout;
