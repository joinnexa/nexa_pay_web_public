"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "fr" | "ar";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (value: Locale) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  t: typeof translations.en;
  isRtl: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const translations = {
  en: {
    nav: {
      why: "Why",
      services: "Services",
      pillars: "Pillars",
      howItWorks: "How It Works",
      segments: "Who It's For",
      roadmap: "Roadmap",
      trust: "Trust",
      contact: "Contact",
      join: "Join the Waitlist",
      language: "Language",
      switchToLight: "Switch to light mode",
      switchToDark: "Switch to dark mode",
    },
    hero: {
      beta: "Private Beta — Limited Seats",
      title1: "The Moroccan wallet for modern daily payments,",
      title2: "transfers, and merchant checkout",
      text:
        "Nexa Pay is built locally to simplify how people and businesses move money: clear fees, faster transfers, QR merchant payments, and one secure wallet for daily life in Morocco.",
      slogan: "One identity. One wallet. One Moroccan ecosystem.",
      ctaPrimary: "Join the Waitlist",
      ctaSecondary: "How It Works",
    },
    why: {
      title: "Built locally to solve real payment friction",
      text:
        "Money movement should be fast, understandable, and affordable. Nexa Pay is designed for Moroccan usage patterns, with less complexity and stronger transaction clarity.",
      fixingTitle: "What we're fixing:",
      fixingList: [
        "High money-transfer fees that quietly add up",
        "Transfers that feel slow, unclear, or complicated",
        "Merchant payments that still depend too much on cash",
        "Too many apps for daily needs (payments, services, and more)",
      ],
      buildingTitle: "What we're building instead:",
      buildingText:
        "A reliable Morocco-first wallet experience with transparent pricing, smooth payment flows, and lower transfer friction for everyday users and merchants.",
    },
    about: {
      title: "A complete payments layer for daily financial activity",
      text:
        "Nexa Pay combines person-to-person transfers, merchant checkout, and operational payment tools into one connected product designed for Morocco.",
      cards: [
        {
          title: "Instant transfers",
          description:
            "Send money in seconds with clear confirmations and reliable records.",
        },
        {
          title: "Lower-cost money transfers",
          description:
            "Designed to significantly reduce transfer fees, especially for frequent everyday transfers.",
        },
        {
          title: "Pay merchants by QR",
          description:
            "Scan and pay in-store — quick, simple, and repeatable for daily purchases.",
        },
        {
          title: "Unified wallet identity",
          description:
            "One wallet profile across payments, history, and future connected services.",
        },
        {
          title: "Operational controls",
          description:
            "Built-in transaction history and reference details for easier tracking and support.",
        },
        {
          title: "Expansion-ready platform",
          description:
            "Engineered to support broader city coverage and new financial use cases over time.",
        },
      ],
    },
    advantages: {
      title1: "A simpler way to move money — without",
      title2: "paying extra to do something basic",
      text:
        "In Morocco, sending money can be more expensive than it should be. Nexa Pay is designed to remove unnecessary costs and complexity by making transfers and payments clear, fast, and affordable.",
      listTitle: "What makes Nexa Pay different:",
      list: [
        "Morocco-first design: built around local habits and real usage",
        "Clear actions: fewer steps, less confusion, better flow",
        "Affordable by intention: focused on cutting the typical pain of transfer fees",
        "Built to scale: one wallet that can support more services over time",
      ],
    },
    segments: {
      eyebrow: "Built for every key actor",
      title: "Who Nexa Pay serves from day one",
      text:
        "The platform is shaped for people sending money daily, merchants accepting digital payments, and partners enabling reliable local operations.",
      cards: [
        {
          title: "Merchants",
          text: "QR-based acceptance and clearer transaction traceability for in-store and neighborhood commerce.",
        },
        {
          title: "Individuals",
          text: "Fast transfers, transparent costs, and a cleaner wallet experience for daily financial routines.",
        },
        {
          title: "Partners",
          text: "A scalable base for integrations, operational workflows, and broader ecosystem services.",
        },
      ],
    },
    pillars: {
      eyebrow: "Core product capabilities",
      title: "The pillars behind a dependable payment experience",
      text:
        "Nexa Pay is structured around four operating pillars that improve user confidence and day-to-day payment execution.",
      cards: [
        {
          title: "Speed and reliability",
          text: "Fast transaction handling and stable flows for routine transfers and checkout moments.",
        },
        {
          title: "Transparent pricing",
          text: "Clear fee visibility before confirmation to reduce uncertainty and improve trust.",
        },
        {
          title: "Merchant-ready checkout",
          text: "QR-based in-store payment support with practical adoption for neighborhood commerce.",
        },
        {
          title: "Operational traceability",
          text: "Reference-ready transaction history for support, reconciliation, and oversight.",
        },
      ],
    },
    access: {
      title: "How Early Access Works",
      steps: [
        {
          title: "Join the waitlist",
          description:
            "Share your details so we can prioritize Morocco's most common use cases.",
        },
        {
          title: "Get selected for private beta",
          description:
            "We onboard in small groups to keep performance smooth and support responsive.",
        },
        {
          title: "Start using Nexa Pay",
          description:
            "Try Nexa Pay features during beta while we expand services and coverage.",
        },
      ],
      noteLabel: "Beta Note:",
      noteText: "Access is limited. Features and limits apply during testing.",
    },
    roadmap: {
      eyebrow: "Launch execution",
      title: "City-by-city rollout with operational focus",
      text:
        "Nexa Pay is launching in deliberate phases to keep reliability high while expanding coverage.",
      items: [
        { city: "Casablanca", status: "Primary launch and pilot operations" },
        { city: "Rabat", status: "Planned expansion after launch stabilization" },
        { city: "Marrakech", status: "Next growth market under evaluation" },
      ],
    },
    trust: {
      eyebrow: "Risk, security, and compliance posture",
      title: "Trust & Transparency",
      text:
        "Nexa Pay is being built carefully and locally — with security, transparency, and reliability treated as non-negotiables.",
      cards: [
        {
          title: "Secure by design",
          description: "Strong authentication and protected sessions from day one.",
        },
        {
          title: "Transparent costs",
          description:
            "Users should understand costs before confirming an action — no surprises.",
        },
        {
          title: "Built with compliance in mind",
          description:
            "Designed to support auditability and fintech readiness as the platform grows.",
        },
      ],
      betaDisclaimer: "Nexa Pay is currently in private beta. Not a bank.",
    },
    form: {
      title: "Request Early Access",
      subtitle:
        "Join the waitlist to be considered for Nexa Pay's private beta in Morocco.",
      success: "Thank you! Your request has been submitted successfully.",
      genericError: "Something went wrong. Please try again.",
      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      phone: "Phone Number",
      phonePlaceholder: "06XXXXXXXX",
      email: "Email",
      emailPlaceholder: "your@email.com",
      city: "City",
      cityValue: "Casablanca",
      usage: "How will you use Nexa Pay? (Optional)",
      usagePlaceholder: "Tell us how you plan to use Nexa Pay...",
      submitting: "Submitting...",
      submit: "Request Early Access",
      privacy:
        "We only use your information to contact you about beta access and product updates.",
    },
    footer: {
      subtitle: "Private Beta — Morocco-first payments and services ecosystem.",
      contactLabel: "Contact",
      secured: "Secured by Nexa. Operated by Nexa.",
      disclaimer:
        "Nexa Pay is in private beta. Features, availability, and fees may change. Nothing on this page is financial, legal, tax, or investment advice. Banking services, when offered, will be provided by licensed partners where required.",
      quickLinks: "Quick links",
      social: "Social",
      instagramJoin: "@joinnexa",
      instagramPay: "nexapay.ma",
      rightsReserved: "All rights reserved.",
    },
    emails: ["contact@joinnexa.ma", "support@joinnexa.ma", "partnerships@joinnexa.ma"],
  },
  fr: {
    nav: {
      why: "Pourquoi",
      services: "Services",
      pillars: "Piliers",
      howItWorks: "Fonctionnement",
      segments: "Pour qui",
      roadmap: "Feuille de route",
      trust: "Confiance",
      contact: "Contact",
      join: "Rejoindre l'attente",
      language: "Langue",
      switchToLight: "Passer au mode clair",
      switchToDark: "Passer au mode sombre",
    },
    hero: {
      beta: "Bêta privée — places limitées",
      title1: "Le wallet marocain pour les paiements quotidiens,",
      title2: "les transferts et l'encaissement commerçant",
      text:
        "Nexa Pay est construit localement pour simplifier les flux d'argent des particuliers et des commerces: coûts clairs, transferts rapides, paiements QR et une expérience wallet sécurisée.",
      slogan: "Une identité. Un wallet. Un écosystème marocain.",
      ctaPrimary: "Rejoindre l'attente",
      ctaSecondary: "Comment ça marche",
    },
    why: {
      title: "Conçu localement pour résoudre les frictions réelles",
      text:
        "Le mouvement d'argent doit être rapide, compréhensible et abordable. Nexa Pay est pensé pour les usages marocains avec moins de complexité et plus de clarté.",
      fixingTitle: "Ce que nous corrigeons:",
      fixingList: [
        "Des frais de transfert trop élevés qui s'accumulent",
        "Des transferts lents, flous ou compliqués",
        "Des paiements commerçants encore trop dépendants du cash",
        "Trop d'applications pour les besoins du quotidien",
      ],
      buildingTitle: "Ce que nous construisons:",
      buildingText:
        "Une expérience wallet Morocco-first fiable avec tarification transparente et parcours de paiement fluides.",
    },
    about: {
      title: "Une couche de paiement complète pour l'usage quotidien",
      text:
        "Nexa Pay combine transferts entre personnes, encaissement commerçant et outils opérationnels dans un produit unique conçu pour le Maroc.",
      cards: [
        {
          title: "Transferts instantanés",
          description:
            "Envoyez de l'argent en quelques secondes avec confirmations claires.",
        },
        {
          title: "Transferts à coût réduit",
          description:
            "Conçu pour réduire fortement les frais, surtout pour les usages fréquents.",
        },
        {
          title: "Paiement commerçant par QR",
          description: "Scannez et payez en magasin rapidement et simplement.",
        },
        {
          title: "Identité wallet unifiée",
          description:
            "Un profil unique pour paiements, historique et futurs services connectés.",
        },
        {
          title: "Contrôles opérationnels",
          description:
            "Historique de transactions et détails de référence pour un meilleur suivi.",
        },
        {
          title: "Plateforme prête à s'étendre",
          description:
            "Conçue pour couvrir davantage de villes et de cas d'usage financiers.",
        },
      ],
    },
    advantages: {
      title1: "Une façon plus simple de transférer — sans",
      title2: "payer plus pour une action basique",
      text:
        "Au Maroc, envoyer de l'argent peut coûter trop cher. Nexa Pay réduit la complexité et les coûts inutiles.",
      listTitle: "Ce qui différencie Nexa Pay:",
      list: [
        "Design Morocco-first: aligné aux habitudes locales",
        "Actions claires: moins d'étapes, moins de confusion",
        "Abordable par intention: réduction de la douleur des frais",
        "Pensé pour évoluer: un wallet qui supporte plus de services",
      ],
    },
    segments: {
      eyebrow: "Pensé pour chaque acteur clé",
      title: "Pour qui Nexa Pay est conçu dès le lancement",
      text:
        "La plateforme répond aux besoins des particuliers, des commerçants et des partenaires qui construisent des opérations locales fiables.",
      cards: [
        {
          title: "Commerçants",
          text: "Encaissement QR et meilleure traçabilité des transactions pour les ventes locales.",
        },
        {
          title: "Particuliers",
          text: "Transferts rapides, coûts transparents et expérience wallet plus fluide au quotidien.",
        },
        {
          title: "Partenaires",
          text: "Base scalable pour intégrations, workflows opérationnels et nouveaux services.",
        },
      ],
    },
    pillars: {
      eyebrow: "Capacités coeur produit",
      title: "Les piliers d'une expérience paiement fiable",
      text:
        "Nexa Pay est structuré autour de quatre piliers opérationnels qui renforcent confiance et fluidité au quotidien.",
      cards: [
        {
          title: "Vitesse et fiabilité",
          text: "Traitement rapide des transactions et flux stables pour transferts et encaissement.",
        },
        {
          title: "Tarification transparente",
          text: "Visibilité claire des frais avant validation pour réduire l'incertitude.",
        },
        {
          title: "Encaissement prêt pour commerçants",
          text: "Paiement QR en magasin avec adoption pratique pour le commerce local.",
        },
        {
          title: "Traçabilité opérationnelle",
          text: "Historique de transactions exploitable pour support, rapprochement et supervision.",
        },
      ],
    },
    access: {
      title: "Comment fonctionne l'accès anticipé",
      steps: [
        {
          title: "Rejoindre la liste d'attente",
          description:
            "Partagez vos informations pour prioriser les cas d'usage locaux.",
        },
        {
          title: "Sélection en bêta privée",
          description:
            "On intègre par petits groupes pour garder qualité et support.",
        },
        {
          title: "Commencer avec Nexa Pay",
          description:
            "Testez les fonctionnalités pendant que nous élargissons la couverture.",
        },
      ],
      noteLabel: "Note bêta:",
      noteText:
        "L'accès est limité. Des limites de fonctionnalités s'appliquent pendant les tests.",
    },
    roadmap: {
      eyebrow: "Exécution du lancement",
      title: "Déploiement ville par ville avec discipline opérationnelle",
      text:
        "Nexa Pay avance par phases pour maintenir une forte fiabilité tout en élargissant la couverture.",
      items: [
        { city: "Casablanca", status: "Ville principale pour lancement et pilote" },
        { city: "Rabat", status: "Extension prévue après stabilisation initiale" },
        { city: "Marrakech", status: "Prochain marché en cours d'évaluation" },
      ],
    },
    trust: {
      eyebrow: "Posture risque, sécurité et conformité",
      title: "Confiance & Transparence",
      text:
        "Nexa Pay est construit avec exigence locale — sécurité, transparence et fiabilité sont non négociables.",
      cards: [
        {
          title: "Sécurisé dès la conception",
          description: "Authentification forte et sessions protégées dès le départ.",
        },
        {
          title: "Coûts transparents",
          description: "Les utilisateurs comprennent les coûts avant confirmation.",
        },
        {
          title: "Conçu pour la conformité",
          description:
            "Pensé pour l'auditabilité et la préparation fintech à mesure que la plateforme grandit.",
        },
      ],
      betaDisclaimer: "Nexa Pay est actuellement en bêta privée. Ce n'est pas une banque.",
    },
    form: {
      title: "Demander un accès anticipé",
      subtitle:
        "Rejoignez la liste d'attente pour être considéré pour la bêta privée de Nexa Pay au Maroc.",
      success: "Merci! Votre demande a été envoyée avec succès.",
      genericError: "Un problème est survenu. Réessayez.",
      fullName: "Nom complet",
      fullNamePlaceholder: "Entrez votre nom complet",
      phone: "Numéro de téléphone",
      phonePlaceholder: "06XXXXXXXX",
      email: "Email",
      emailPlaceholder: "votre@email.com",
      city: "Ville",
      cityValue: "Casablanca",
      usage: "Comment utiliserez-vous Nexa Pay? (Optionnel)",
      usagePlaceholder: "Dites-nous comment vous comptez utiliser Nexa Pay...",
      submitting: "Envoi...",
      submit: "Demander un accès anticipé",
      privacy:
        "Nous utilisons vos informations uniquement pour vous contacter sur la bêta et les mises à jour produit.",
    },
    footer: {
      subtitle: "Bêta privée — écosystème de paiements et services pensé pour le Maroc.",
      contactLabel: "Contact",
      secured: "Sécurisé par Nexa. Opéré par Nexa.",
      disclaimer:
        "Nexa Pay est en bêta privée. Fonctionnalités, disponibilité et frais peuvent évoluer. Rien sur cette page ne constitue un conseil financier, juridique, fiscal ou en investissement. Les services bancaires, le cas échéant, seront fournis par des partenaires agréés lorsque la réglementation l'exige.",
      quickLinks: "Liens rapides",
      social: "Réseaux sociaux",
      instagramJoin: "@joinnexa",
      instagramPay: "nexapay.ma",
      rightsReserved: "Tous droits réservés.",
    },
    emails: ["contact@joinnexa.ma", "support@joinnexa.ma", "partnerships@joinnexa.ma"],
  },
  ar: {
    nav: {
      why: "لماذا",
      services: "الخدمات",
      pillars: "المرتكزات",
      howItWorks: "طريقة العمل",
      segments: "لمن المنصة",
      roadmap: "خارطة الإطلاق",
      trust: "الثقة",
      contact: "التواصل",
      join: "انضم إلى القائمة",
      language: "اللغة",
      switchToLight: "التبديل إلى الوضع الفاتح",
      switchToDark: "التبديل إلى الوضع الداكن",
    },
    hero: {
      beta: "نسخة تجريبية خاصة — مقاعد محدودة",
      title1: "المحفظة المغربية للمدفوعات اليومية،",
      title2: "التحويلات، والدفع لدى التجار",
      text:
        "Nexa Pay مبني محليا لتبسيط حركة الأموال للأفراد والتجار: رسوم واضحة، تحويلات أسرع، دفع QR، وتجربة محفظة آمنة للاستخدام اليومي في المغرب.",
      slogan: "هوية واحدة. محفظة واحدة. منظومة مغربية واحدة.",
      ctaPrimary: "انضم إلى القائمة",
      ctaSecondary: "كيف يعمل",
    },
    why: {
      title: "مصمم محليا لحل احتكاك المدفوعات الواقعي",
      text:
        "حركة الأموال يجب أن تكون سريعة وواضحة وميسورة. Nexa Pay مصمم حسب أنماط الاستخدام المغربية مع خطوات أقل ووضوح أكبر.",
      fixingTitle: "ما الذي نصلحه:",
      fixingList: [
        "رسوم تحويل مرتفعة تتراكم بهدوء",
        "تحويلات بطيئة أو غير واضحة أو معقدة",
        "دفع التجار ما زال يعتمد كثيرا على النقد",
        "تعدد التطبيقات للاحتياجات اليومية",
      ],
      buildingTitle: "ما الذي نبنيه:",
      buildingText:
        "تجربة محفظة موثوقة Morocco-first مع تسعير شفاف وتدفقات دفع سلسة.",
    },
    about: {
      title: "طبقة مدفوعات متكاملة للاستخدام المالي اليومي",
      text:
        "Nexa Pay يجمع تحويلات الأشخاص، ودفع التجار، وأدوات التشغيل في منتج واحد مصمم للمغرب.",
      cards: [
        {
          title: "تحويلات فورية",
          description: "أرسل الأموال خلال ثوان مع تأكيدات واضحة.",
        },
        {
          title: "تحويلات بتكلفة أقل",
          description: "مصمم لتقليل الرسوم خصوصا للتحويلات المتكررة.",
        },
        {
          title: "دفع التجار عبر QR",
          description: "امسح وادفع داخل المتجر بسرعة وببساطة.",
        },
        {
          title: "هوية محفظة موحدة",
          description: "ملف محفظة واحد للمدفوعات والسجل والخدمات القادمة.",
        },
        {
          title: "ضوابط تشغيلية",
          description: "سجل عمليات وتفاصيل مرجعية لدعم تتبع أسهل.",
        },
        {
          title: "منصة جاهزة للتوسع",
          description: "مصممة لدعم مدن إضافية وحالات استخدام مالية جديدة.",
        },
      ],
    },
    advantages: {
      title1: "طريقة أبسط لتحريك الأموال — بدون",
      title2: "دفع إضافي لشيء أساسي",
      text:
        "في المغرب، إرسال الأموال قد يكون أغلى مما يجب. Nexa Pay يقلل التعقيد والتكلفة.",
      listTitle: "ما الذي يميز Nexa Pay:",
      list: [
        "تصميم Morocco-first مبني على الاستخدام المحلي",
        "خطوات واضحة: أقل تعقيد وأفضل تدفق",
        "نهج ميسور: تقليل ألم رسوم التحويل",
        "جاهز للتوسع: محفظة تدعم خدمات أكثر",
      ],
    },
    segments: {
      eyebrow: "مصمم لكل الأطراف الأساسية",
      title: "لمن صُمم Nexa Pay منذ اليوم الأول",
      text:
        "المنصة مبنية للأفراد الذين يحولون يوميا، والتجار الذين يستقبلون المدفوعات الرقمية، والشركاء الذين يدعمون التشغيل المحلي.",
      cards: [
        {
          title: "التجار",
          text: "قبول مدفوعات عبر QR مع تتبع أوضح للمعاملات في المتاجر المحلية.",
        },
        {
          title: "الأفراد",
          text: "تحويلات أسرع، رسوم واضحة، وتجربة محفظة أبسط للاستخدام اليومي.",
        },
        {
          title: "الشركاء",
          text: "أساس قابل للتوسع للتكاملات وتدفقات التشغيل وخدمات المنظومة.",
        },
      ],
    },
    pillars: {
      eyebrow: "قدرات المنتج الأساسية",
      title: "المرتكزات التي تبني تجربة دفع موثوقة",
      text:
        "Nexa Pay مبني على أربعة مرتكزات تشغيلية تعزز الثقة وتُحسن تنفيذ المدفوعات اليومية.",
      cards: [
        {
          title: "السرعة والاعتمادية",
          text: "تنفيذ سريع للمعاملات وتدفقات مستقرة للتحويلات والدفع اليومي.",
        },
        {
          title: "تسعير شفاف",
          text: "وضوح الرسوم قبل التأكيد لتقليل الغموض وزيادة الثقة.",
        },
        {
          title: "دفع جاهز للتجار",
          text: "دعم دفع QR داخل المتاجر بطريقة عملية للتجارة المحلية.",
        },
        {
          title: "قابلية تتبع تشغيلية",
          text: "سجل معاملات واضح للدعم والمطابقة والمتابعة التشغيلية.",
        },
      ],
    },
    access: {
      title: "كيف يعمل الوصول المبكر",
      steps: [
        {
          title: "الانضمام إلى قائمة الانتظار",
          description: "شارك بياناتك لنمنح الأولوية للاستخدامات الأكثر شيوعا.",
        },
        {
          title: "الاختيار للنسخة التجريبية",
          description: "نضم المستخدمين على دفعات صغيرة للحفاظ على الجودة.",
        },
        {
          title: "ابدأ استخدام Nexa Pay",
          description: "جرّب الميزات خلال فترة الاختبار مع توسع التغطية.",
        },
      ],
      noteLabel: "ملاحظة تجريبية:",
      noteText: "الوصول محدود. توجد حدود للميزات أثناء الاختبار.",
    },
    roadmap: {
      eyebrow: "تنفيذ الإطلاق",
      title: "إطلاق تدريجي مدينة بعد مدينة بانضباط تشغيلي",
      text:
        "يتوسع Nexa Pay على مراحل مدروسة للحفاظ على الاعتمادية العالية مع زيادة التغطية.",
      items: [
        { city: "الدار البيضاء", status: "مدينة الإطلاق الأساسي والتشغيل التجريبي" },
        { city: "الرباط", status: "توسع مخطط بعد استقرار المرحلة الأولى" },
        { city: "مراكش", status: "سوق التوسع التالي قيد التقييم" },
      ],
    },
    trust: {
      eyebrow: "منظور المخاطر والأمان والامتثال",
      title: "الثقة والشفافية",
      text:
        "Nexa Pay يُبنى بعناية محلية — الأمان والشفافية والاعتمادية عناصر أساسية.",
      cards: [
        {
          title: "آمن من البداية",
          description: "توثيق قوي وجلسات محمية منذ اليوم الأول.",
        },
        {
          title: "تكلفة شفافة",
          description: "يفهم المستخدم التكلفة قبل تأكيد أي عملية.",
        },
        {
          title: "جاهز للامتثال",
          description: "مصمم لدعم التتبع والتوافق التنظيمي مع نمو المنصة.",
        },
      ],
      betaDisclaimer: "Nexa Pay حاليا في نسخة تجريبية خاصة. ليس بنكا.",
    },
    form: {
      title: "طلب وصول مبكر",
      subtitle:
        "انضم إلى قائمة الانتظار ليتم النظر في انضمامك للنسخة التجريبية الخاصة في المغرب.",
      success: "شكرا! تم إرسال طلبك بنجاح.",
      genericError: "حدث خطأ ما. حاول مرة أخرى.",
      fullName: "الاسم الكامل",
      fullNamePlaceholder: "أدخل اسمك الكامل",
      phone: "رقم الهاتف",
      phonePlaceholder: "06XXXXXXXX",
      email: "البريد الإلكتروني",
      emailPlaceholder: "your@email.com",
      city: "المدينة",
      cityValue: "الدار البيضاء",
      usage: "كيف ستستخدم Nexa Pay؟ (اختياري)",
      usagePlaceholder: "أخبرنا كيف تخطط لاستخدام Nexa Pay...",
      submitting: "جار الإرسال...",
      submit: "طلب وصول مبكر",
      privacy:
        "نستخدم معلوماتك فقط للتواصل معك بخصوص الوصول التجريبي وتحديثات المنتج.",
    },
    footer: {
      subtitle: "نسخة تجريبية خاصة — منظومة مدفوعات وخدمات موجهة للمغرب.",
      contactLabel: "التواصل",
      secured: "مؤمن بواسطة Nexa. يُدار بواسطة Nexa.",
      disclaimer:
        "Nexa Pay في مرحلة تجريبية خاصة. قد تتغير الميزات والتوفر والرسوم. لا يُعد أي محتوى على هذه الصفحة استشارة مالية أو قانونية أو ضريبية أو استثمارية. الخدمات المصرفية، عند توفرها، ستقدم عبر شركاء مرخصين عند الاقتضاء.",
      quickLinks: "روابط سريعة",
      social: "وسائل التواصل",
      instagramJoin: "@joinnexa",
      instagramPay: "nexapay.ma",
      rightsReserved: "جميع الحقوق محفوظة.",
    },
    emails: ["contact@joinnexa.ma", "support@joinnexa.ma", "partnerships@joinnexa.ma"],
  },
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("nexa-pay-locale");
    if (saved === "en" || saved === "fr" || saved === "ar") {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("nexa-pay-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      return;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("nexa-pay-locale", locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("nexa-pay-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      theme,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
      t: translations[locale],
      isRtl: locale === "ar",
    }),
    [locale, theme],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
