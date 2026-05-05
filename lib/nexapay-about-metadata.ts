import type { Metadata } from "next";
import { canonical, getSiteOrigin } from "@/lib/site";

export const nexaPayAboutPaths = {
  en: "/about/nexa-pay",
  fr: "/fr/about/nexa-pay",
  ar: "/ar/about/nexa-pay",
} as const;

export type NexaAboutLang = keyof typeof nexaPayAboutPaths;

export function nexaPayAboutAlternates(forLang: NexaAboutLang): NonNullable<Metadata["alternates"]> {
  return {
    canonical: canonical(nexaPayAboutPaths[forLang]),
    languages: {
      en: canonical(nexaPayAboutPaths.en),
      fr: canonical(nexaPayAboutPaths.fr),
      ar: canonical(nexaPayAboutPaths.ar),
      "x-default": canonical(nexaPayAboutPaths.en),
    },
  };
}

/** JSON-LD for explainer URLs (localized WebPage). */
export function nexaPayAboutJsonLd(forLang: NexaAboutLang) {
  const origin = getSiteOrigin();
  const path = nexaPayAboutPaths[forLang];
  const inLanguage = forLang === "en" ? "en" : forLang === "fr" ? "fr" : "ar";
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${origin}${path}#page`,
    url: `${origin}${path}`,
    name: forLang === "en" ? "What is Nexa Pay?" : forLang === "fr" ? "Qu’est-ce que Nexa Pay ?" : "ما هو Nexa Pay؟",
    inLanguage,
    description:
      forLang === "en"
        ? "Nexa Pay is a Morocco-focused digital wallet and payments offering from the Nexa ecosystem."
        : forLang === "fr"
          ? "Nexa Pay est une offre portefeuille numérique et paiements centrée sur le Maroc dans l'écosystème Nexa."
          : "Nexa Pay هو عرض محفظة إلكترونية ومدفوعات مركّز على المغرب ضمن منظومة Nexa.",
    publisher: {
      "@type": "Organization",
      name: "Nexa Pay",
      url: origin,
      logo: { "@type": "ImageObject", url: `${origin}/images/ressources/nexa-pay.png` },
    },
    partOf: { "@type": "WebSite", name: "Nexa Pay", url: origin },
  };
}
