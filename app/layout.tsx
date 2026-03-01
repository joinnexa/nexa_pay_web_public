import React from 'react';
import type { Metadata } from "next";
import { ReactNode } from 'react';
import './globals.css';
import { Nunito } from 'next/font/google';

export const metadata: Metadata = {
  title: "Nexa Pay | Your Payment Solution",
  description: "Welcome to Nexa Pay - Your Payment Solution",
  icons: {
    icon: [
      { url: "/images/ressources/nexa-pay-no-bg.png", sizes: "32x32", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Nexa Pay",
    description: "Welcome to Nexa Pay - Your Payment Solution",
    images: [
      {
        url: "/images/ressources/nexa-pay.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
