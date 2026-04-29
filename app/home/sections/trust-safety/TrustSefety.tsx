import React from "react";
import { ShieldCheck, Users, FileCheck } from "lucide-react";
import { ScrollFade } from "@/components/animations/ScrollFade";
import { ScrollStagger } from "@/components/animations/ScrollStagger";
import { useLocale } from "@/contexts/LocaleContext";

export const TrustSefetySection = () => {
  const { t } = useLocale();
  const icons = [ShieldCheck, Users, FileCheck];
  const trustCards = t.trust.cards.map((card, index) => {
    const Icon = icons[index] ?? ShieldCheck;
    return {
      icon: <Icon size={26} />,
      title: card.title,
      description: card.description,
    };
  });
  return (
    <section id="trust" className="bg-white dark:bg-[#070f1f] !pb-24 sm:!pb-28 py-8 sm:py-14 md:py-10 px-4 sm:px-6 md:px-20">
      <ScrollFade className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300 mb-3">
          {t.trust.eyebrow}
        </p>
        <h2 className="primary-heading mb-4">
          {t.trust.title}
        </h2>
        <p className="secondary-heading">{t.trust.text}</p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 lg:gap-10">
          {trustCards.map((card, index) => (
            <ScrollStagger key={index} index={index}>
              <TrustCard
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </ScrollStagger>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 md:mt-10 bg-white dark:bg-[#101b31] border border-gray-200 dark:border-white/10 rounded-lg md:rounded-xl py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-600 dark:text-gray-300 shadow-sm">
          {t.trust.betaDisclaimer}
        </div>
      </ScrollFade>
    </section>
  );
};

const TrustCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center max-w-xs mx-auto bg-gray-50 dark:bg-[#101b31] shadow-sm rounded-3xl hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-white/10 px-5 py-9 max-sm:px-4 max-sm:py-8 md:p-6 md:py-12">
    {/* Icon container */}
    <div className="w-12 md:w-14 h-12 md:h-14 flex items-center justify-center rounded-lg md:rounded-xl bg-white dark:bg-[#162742] text-blue-600 dark:text-blue-300 shadow-md mb-4 md:mb-6">
      {icon}
    </div>

    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>

    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
  </div>
);
