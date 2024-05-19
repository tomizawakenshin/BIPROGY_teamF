import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CheckLogin from '@/components/CheckLogin';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'エンジニアの質問箱',
  description: 'エンジニアが気軽に質問できるようにするためのwebアプリ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <main className='flex flex-col items-center justify-center min-h-screen bg-zinc-200'>
          <CheckLogin>{children}</CheckLogin>
        </main>
      </body>
    </html>
  );
}
