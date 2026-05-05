import React from "react";
import Link from "next/link";
import type { NexaAboutLang } from "@/lib/nexapay-about-metadata";

const COPY: Record<
  NexaAboutLang,
  { title: string; lead: string; sections: { h2: string; p: string }[]; home: string }
> = {
  en: {
    title: "What is Nexa Pay?",
    lead: "Nexa Pay is the payments layer of Nexa—a Morocco-focused digital wallet and merchant payment experience.",
    sections: [
      {
        h2: "Payments built for Moroccan daily life",
        p: "Money movement should feel clear and affordable for people and merchants. Nexa Pay is designed around local routines: transfers between people, QR payments at merchants, and a roadmap toward broader everyday financial tools.",
      },
      {
        h2: "Part of the Nexa ecosystem",
        p: "Nexa brings together complementary services—including mobility (Nexa Go) and the broader Nexa umbrella at joinnexa.ma. Nexa Pay is the dedicated wallet and checkout experience carrying the Nexa brand for payments.",
      },
      {
        h2: "Private beta availability",
        p: "Nexa Pay is launching in phases. Availability, pricing, features, and compliance paths may evolve during the private beta. Nothing on marketing pages constitutes financial or legal advice; banking-grade services—when introduced—follow partner licensing.",
      },
    ],
    home: "← Back to Nexa Pay home",
  },
  fr: {
    title: "Qu’est-ce que Nexa Pay ?",
    lead: "Nexa Pay est la couche paiements de Nexa—un portefeuille numérique et une expérience paiement pensée pour le Maroc.",
    sections: [
      {
        h2: "Des paiements alignés avec le quotidien marocain",
        p: "Envoyer ou recevoir de l’argent, payer un commerçant par QR ou suivre une feuille de route fonctionnelle : Nexa Pay vise à réduire la friction pour les usages locaux tout en gardant des flux lisibles.",
      },
      {
        h2: "Une partie de l’écosystème Nexa",
        p: "Nexa rassemble plusieurs services—notamment Nexa Go et la présentation globale Nexa sur joinnexa.ma. Nexa Pay concentre l’identité produit paiements/portefeuille.",
      },
      {
        h2: "Bêta privée",
        p: "L’élargissement géographique, les prix et fonctionnalités évoluent. Les contenus marketing ne constituent pas des conseils juridiques ou financiers ; tout service bancaire détaillé dépendra d’agrégats partenaires et de la réglementation.",
      },
    ],
    home: "← Retour à Nexa Pay",
  },
  ar: {
    title: "ما هو Nexa Pay؟",
    lead: "Nexa Pay هي طبقة المدفوعات في Nexa — محفظة رقمية وتجربة دفع تجارية موجهة للمغرب.",
    sections: [
      {
        h2: "مدفوعات للحياة اليومية في المغرب",
        p: "يُرمى إلى تحويلات الأشخاص، قبول التجّار عبر رمز QR، وميزات موسعة وفق مراحل المنتج، مع التركيز على وضوح التكلفة وتجربة بسيطة.",
      },
      {
        h2: "ضمن منظومة Nexa الأوسع",
        p: "تشمل Nexa خدمات مرتبطة مثل Nexa Go وعرضًا عامًا على joinnexa.ma، بينما تركّز Nexa Pay على تجربة المحفظة والمدفوعات تحت الاسم ذاته.",
      },
      {
        h2: "نسخة تجريبية خاصة",
        p: "قد تختلف المراحل والأسعار والميزات، ولا يُعد المحتوى التسويقي استشارة مالية؛ الخدمات البنكية عند طرحها ستخضع للتراخيص المطلوبة.",
      },
    ],
    home: "← العودة إلى الرئيسية Nexa Pay",
  },
};

export function NexaPayAboutArticle({ lang }: { lang: NexaAboutLang }) {
  const c = COPY[lang];
  const rtl = lang === "ar";

  return (
    <article
      className="mx-auto max-w-2xl px-4 py-12 sm:py-16"
      lang={rtl ? "ar" : lang === "fr" ? "fr" : "en"}
      dir={rtl ? "rtl" : "ltr"}
    >
      <header className="mb-10">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {c.title}
        </h1>
        <p className="mt-4 text-pretty text-lg text-gray-600 dark:text-slate-300">{c.lead}</p>
      </header>

      <div className="space-y-10">
        {c.sections.map((s) => (
          <section key={s.h2}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{s.h2}</h2>
            <p className="mt-3 text-pretty leading-relaxed text-gray-600 dark:text-slate-300">{s.p}</p>
          </section>
        ))}
      </div>

      <nav className="mt-12 border-t border-gray-200 pt-10 dark:border-white/10">
        <p className="text-sm text-gray-600 dark:text-slate-400">
          <Link href="/" className="font-semibold text-blue-700 hover:underline dark:text-blue-300">
            {c.home}
          </Link>
        </p>
        <p className="mt-4 text-xs text-gray-500 dark:text-slate-500">
          Ecosystem:&nbsp;
          <a href="https://joinnexa.ma/" className="hover:underline" rel="noopener noreferrer">
            joinnexa.ma
          </a>
          &nbsp; · &nbsp;
          <a href="https://nexago.ma/" className="hover:underline" rel="noopener noreferrer">
            nexago.ma
          </a>
        </p>
      </nav>
    </article>
  );
}
