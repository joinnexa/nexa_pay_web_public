import React from 'react';
import type { Metadata } from "next";
import './globals.css';
import { Nunito } from 'next/font/google';
import { canonical, getSiteOrigin } from "@/lib/site";
import { nexaPayOrganizationAndWebsiteJsonLd } from "@/lib/nexapay-root-jsonld";

const siteUrl = getSiteOrigin();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nexa Pay — Digital wallet & payments for Morocco",
    template: "%s | Nexa Pay",
  },
  description:
    "Nexa Pay is a Morocco-focused digital wallet and QR merchant checkout experience built by Nexa. Join the waitlist for the private beta.",
  applicationName: "Nexa Pay",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: canonical("/"),
  },
  icons: {
    icon: [
      { url: "/images/ressources/nexa-pay-no-bg.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/images/ressources/nexa-pay-no-bg.png",
  },
  openGraph: {
    type: "website",
    url: canonical("/"),
    siteName: "Nexa Pay",
    locale: "en_US",
    title: "Nexa Pay — Digital wallet & payments for Morocco",
    description:
      "Send money, pay merchants by QR, and keep everyday payments clear—all from one Morocco-first wallet roadmap.",
    images: [
      {
        url: "/images/ressources/nexa-pay.png",
        width: 1200,
        height: 630,
        alt: "Nexa Pay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexa Pay — Digital wallet & payments for Morocco",
    description:
      "Join the Nexa Pay waitlist: Morocco-first payments and merchant checkout from the Nexa ecosystem.",
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
  const rootJsonLd = nexaPayOrganizationAndWebsiteJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable}`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
