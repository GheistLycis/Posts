import { Roboto } from 'next/font/google';

export const roboto = Roboto({
  variable: '--font-roboto', // * globals.css
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
