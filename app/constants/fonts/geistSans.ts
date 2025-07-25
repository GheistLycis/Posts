import { Geist } from 'next/font/google';

export const geistSans = Geist({
  variable: '--font-geist-sans', // * globals.css
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
