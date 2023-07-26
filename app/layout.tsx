import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Navbar from '@components/Navbar';
import "@fortawesome/fontawesome-svg-core/styles.css";
import PreferenceProvider from '@providers/PreferenceProvider';
import MaterialThemeProvider from '@providers/MaterialThemeProvider';
import Footer from '@components/Footer';

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'type.io',
  description: 'Typing Game For Casuals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-500 bg-gray-900 min-w-[350px] min-h-screen`}>
        
        <main className='app'>
          <MaterialThemeProvider>
            <PreferenceProvider>
              <Navbar />
              {children}

            </PreferenceProvider>
          </MaterialThemeProvider>
        </main>

        <Footer />


        {/* <div className="flex flex-wrap items-center justify-center h-16 w-full fixed bottom-0">
        </div> */}

      </body>
    </html>
  );
}
