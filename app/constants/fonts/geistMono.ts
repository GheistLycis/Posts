import { Geist_Mono } from 'next/font/google';

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono', // * globals.css
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
