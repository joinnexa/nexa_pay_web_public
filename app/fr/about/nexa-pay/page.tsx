import type { Metadata } from "next";
import { NexaPayAboutArticle } from "@/components/seo/NexaPayAboutArticle";
import { canonical } from "@/lib/site";
import { nexaPayAboutAlternates, nexaPayAboutJsonLd } from "@/lib/nexapay-about-metadata";

export const metadata: Metadata = {
  title: "Qu’est-ce que Nexa Pay ?",
  description:
    "Nexa Pay est une offre portefeuille numérique et paiements commerçants par QR centrée sur le Maroc dans l'écosystème Nexa.",
  alternates: nexaPayAboutAlternates("fr"),
  openGraph: {
    type: "article",
    url: canonical("/fr/about/nexa-pay"),
    locale: "fr_FR",
    title: "Qu’est-ce que Nexa Pay ?",
    description:
      "Découvrez Nexa Pay, la couche paiements de Nexa pour le quotidien au Maroc.",
    images: [{ url: "/images/ressources/nexa-pay.png", width: 1200, height: 630, alt: "Nexa Pay" }],
    siteName: "Nexa Pay",
  },
  twitter: { card: "summary_large_image", title: "Qu’est-ce que Nexa Pay ?" },
};

export default function NexaPayAboutFrPage() {
  const ld = nexaPayAboutJsonLd("fr");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <div className="min-h-screen bg-white dark:bg-[#070f1f]">
        <NexaPayAboutArticle lang="fr" />
      </div>
    </>
  );
}
