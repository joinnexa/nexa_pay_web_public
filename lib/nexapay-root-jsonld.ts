import { getSiteOrigin } from "@/lib/site";

export function nexaPayOrganizationAndWebsiteJsonLd() {
  const url = getSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}#organization`,
        name: "Nexa Pay",
        legalName: "Nexa Pay",
        url,
        logo: {
          "@type": "ImageObject",
          url: `${url}/images/ressources/nexa-pay.png`,
        },
        sameAs: [
          "https://www.instagram.com/joinnexa/",
          "https://joinnexa.ma",
          "https://nexago.ma",
        ],
        parentOrganization: { "@type": "Organization", name: "Nexa", url: "https://joinnexa.ma/" },
      },
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: "Nexa Pay",
        description:
          "Nexa Pay is Morocco’s digital wallet initiative from Nexa for transfers and merchant QR payments.",
        publisher: { "@id": `${url}#organization` },
        inLanguage: ["en", "fr", "ar"],
      },
    ],
  };
}
