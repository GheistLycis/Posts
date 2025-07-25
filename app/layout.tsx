import Providers from '@components/Providers/Providers';
import { roboto } from '@constants/fonts/roboto';
import { Metadata } from 'next';
import { FC, ReactNode, Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = { title: 'Posts' };

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="pt-BR">
    <body className={`${roboto.className} antialiased`}>
      <Providers>
        <Suspense>{children}</Suspense>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
