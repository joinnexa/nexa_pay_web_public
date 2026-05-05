import type { Metadata } from "next";
import { NexaPayAboutArticle } from "@/components/seo/NexaPayAboutArticle";
import { canonical } from "@/lib/site";
import { nexaPayAboutAlternates, nexaPayAboutJsonLd } from "@/lib/nexapay-about-metadata";

export const metadata: Metadata = {
  title: "ما هو Nexa Pay؟",
  description:
    "Nexa Pay محفظة رقمية ومدفوعات تجّار بواسطة رمز QR، ضمن منظومة Nexa الموجهة للمغرب.",
  alternates: nexaPayAboutAlternates("ar"),
  openGraph: {
    type: "article",
    url: canonical("/ar/about/nexa-pay"),
    locale: "ar_MA",
    title: "ما هو Nexa Pay؟",
    description: "تعرّف على Nexa Pay ودورها في منظومة Nexa للمدفوعات اليومية.",
    images: [{ url: "/images/ressources/nexa-pay.png", width: 1200, height: 630, alt: "Nexa Pay" }],
    siteName: "Nexa Pay",
  },
  twitter: { card: "summary_large_image", title: "ما هو Nexa Pay؟" },
};

export default function NexaPayAboutArPage() {
  const ld = nexaPayAboutJsonLd("ar");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <div className="min-h-screen bg-white dark:bg-[#070f1f]">
        <NexaPayAboutArticle lang="ar" />
      </div>
    </>
  );
}
