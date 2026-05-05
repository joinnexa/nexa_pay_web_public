import type { Metadata } from "next";
import { NexaPayAboutArticle } from "@/components/seo/NexaPayAboutArticle";
import { canonical } from "@/lib/site";
import { nexaPayAboutAlternates, nexaPayAboutJsonLd } from "@/lib/nexapay-about-metadata";

export const metadata: Metadata = {
  title: "What is Nexa Pay?",
  description:
    "Nexa Pay is a Morocco-focused digital wallet and QR merchant payments offering from Nexa—the ecosystem for everyday money movement.",
  alternates: nexaPayAboutAlternates("en"),
  openGraph: {
    type: "article",
    url: canonical("/about/nexa-pay"),
    locale: "en_US",
    title: "What is Nexa Pay?",
    description:
      "Learn how Nexa Pay fits into the Nexa ecosystem for Morocco-focused everyday payments.",
    images: [{ url: "/images/ressources/nexa-pay.png", width: 1200, height: 630, alt: "Nexa Pay" }],
    siteName: "Nexa Pay",
  },
  twitter: { card: "summary_large_image", title: "What is Nexa Pay?" },
};

export default function NexaPayAboutEnPage() {
  const ld = nexaPayAboutJsonLd("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <div className="min-h-screen bg-white dark:bg-[#070f1f]">
        <NexaPayAboutArticle lang="en" />
      </div>
    </>
  );
}
