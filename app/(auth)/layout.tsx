import { Metadata } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = { title: 'Posts | Login' };

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="mobile-login-bg flex h-svh items-center justify-center bg-cover px-8 sm:justify-start sm:bg-center sm:px-[104px]">
    {children}
  </div>
);

export default AuthLayout;
