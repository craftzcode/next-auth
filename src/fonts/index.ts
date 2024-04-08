import { Inter as FontSans } from 'next/font/google'

export const fontSans = FontSans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
})
