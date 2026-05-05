"use client";

import Image from "next/image";
import Link from "next/link";
import { scroller } from "react-scroll";
import { Globe, Instagram } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const QUICK_LINKS: {
  navKey: "why" | "services" | "pillars" | "howItWorks" | "segments" | "roadmap" | "trust" | "join";
  target: string;
  offset: number;
}[] = [
  { navKey: "why", target: "overview", offset: -50 },
  { navKey: "services", target: "about", offset: -20 },
  { navKey: "pillars", target: "pillars", offset: -50 },
  { navKey: "howItWorks", target: "howItWorks", offset: -50 },
  { navKey: "segments", target: "segments", offset: -50 },
  { navKey: "roadmap", target: "roadmap", offset: -50 },
  { navKey: "trust", target: "trust", offset: -50 },
  { navKey: "join", target: "joinForm", offset: 50 },
];

const CONTACT_EMAILS = [
  "contact@joinnexa.ma",
  "support@joinnexa.ma",
  "partnerships@joinnexa.ma",
] as const;

const SOCIAL_LINKS = [
  { labelKey: "instagramJoin" as const, href: "https://www.instagram.com/joinnexa/", icon: "instagram" as const },
  { labelKey: "instagramPay" as const, href: "https://nexapay.ma", icon: "globe" as const },
];

export default function Footer() {
  const { t, isRtl } = useLocale();
  const year = new Date().getFullYear();

  const scrollTo = (target: string, offset: number) => {
    scroller.scrollTo(target, { smooth: true, duration: 500, offset });
  };

  return (
    <footer id="contact" className="relative border-t border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/ressources/nexa-pay.png"
              alt="Nexa Pay"
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 object-contain"
            />
            <div>
              <div className="text-lg font-semibold text-white">Nexa Pay</div>
              <div className="text-sm text-white/70">{t.footer.subtitle}</div>
            </div>
          </div>
        </div>

        <p
          className={`mt-8 max-w-3xl text-xs leading-relaxed text-white/55 ${isRtl ? "text-right" : "text-left"}`}
        >
          {t.footer.disclaimer}
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
              {t.footer.quickLinks}
            </h3>
            <ul className={`mt-3 space-y-2 ${isRtl ? "text-right" : "text-left"}`}>
              <li>
                <Link
                  href="/about/nexa-pay"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {t.footer.aboutNexaPay}
                </Link>
              </li>
              {QUICK_LINKS.map(({ navKey, target, offset }) => (
                <li key={target}>
                  <button
                    type="button"
                    onClick={() => scrollTo(target, offset)}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {t.nav[navKey]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
              {t.footer.contactLabel}
            </h3>
            <div className={`mt-3 space-y-2 text-sm ${isRtl ? "text-right" : "text-left"}`}>
              {CONTACT_EMAILS.map((email) => (
                <a
                  key={email}
                  className="block text-white/70 transition hover:text-white"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
              {t.footer.social}
            </h3>
            <ul className={`mt-3 flex flex-wrap gap-4 ${isRtl ? "justify-end" : "justify-start"}`}>
              {SOCIAL_LINKS.map(({ labelKey, href, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                  >
                    {icon === "instagram" ? (
                      <Instagram className="h-4 w-4 shrink-0" aria-hidden />
                    ) : (
                      <Globe className="h-4 w-4 shrink-0" aria-hidden />
                    )}
                    <span>{t.footer[labelKey]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between ${isRtl ? "sm:flex-row-reverse" : ""}`}
        >
          <p>{t.footer.secured}</p>
          <p className={isRtl ? "text-right sm:text-left" : "text-left sm:text-right"}>
            © {year} Nexa — Morocco · {t.footer.rightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
