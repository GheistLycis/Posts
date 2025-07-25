import Providers from '@components/Providers/Providers';
import { Metadata } from 'next';
import { FC, ReactNode, Suspense } from 'react';
import { geistMono } from './constants/fonts/geistMono';
import { geistSans } from './constants/fonts/geistSans';
import './globals.css';

export const metadata: Metadata = { title: 'Posts' };

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="pt-BR">
    <body
      className={`${geistSans.className} ${geistMono.className} antialiased`}
    >
      <Providers>
        <Suspense>{children}</Suspense>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
