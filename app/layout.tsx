import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Navbar from '@components/Navbar';
import "@fortawesome/fontawesome-svg-core/styles.css";
import PreferenceProvider from '@providers/PreferenceProvider';

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'type.io',
  description: 'Typing Game For Developers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-500 bg-gray-900`}>
        <main className='app'>
          <PreferenceProvider>
            <Navbar />
            {children}
          </PreferenceProvider>

        </main>
      </body>
    </html>
  );
}
