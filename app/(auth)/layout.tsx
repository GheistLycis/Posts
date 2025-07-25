import { Metadata } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = { title: 'Posts | Login' };

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex h-svh items-center justify-center">{children}</div>
);

export default AuthLayout;
