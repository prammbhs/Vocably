import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'Vocably - Fun & Free Language Learning',
  description: 'Learn languages with playful gamified lessons, streaks, and progress tracking on Vocably.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="antialiased bg-white text-[#3C3C3C]">
        {children}
      </body>
    </html>
  );
}
