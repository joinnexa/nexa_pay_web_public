import React from "react";
import { Zap, TrendingDown, QrCode, Smartphone } from "lucide-react";
import { ScrollFade } from "@/components/animations/ScrollFade";
import { ScrollStagger } from "@/components/animations/ScrollStagger";
import { useLocale } from "@/contexts/LocaleContext";

export const AboutSection = () => {
  const { t } = useLocale();
  const icons = [Zap, TrendingDown, QrCode, Smartphone, Zap, QrCode];
  const features = t.about.cards.map((card, index) => ({
    icon: icons[index] ?? Zap,
    title: card.title,
    description: card.description,
  }));
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 80"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path className="fill-gray-50 dark:fill-[#070f1f]" d="M0,80V100H1000V30L0,80z"></path>
        </svg>
      </div>
      <div className="bg-gray-50 dark:bg-[#070f1f] w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <ScrollFade className="max-w-5xl mx-auto px-4 pb-12 sm:pb-16 md:pb-20 sm:px-6 md:px-20 pt-12 sm:pt-16 md:pt-20">
          <h2 className="primary-heading">
            {t.about.title}
          </h2>
          <p className="secondary-heading">
            {t.about.text}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <ScrollStagger key={index} index={index}>
                <FeatureCard {...feature} />
              </ScrollStagger>
            ))}
          </div>
        </ScrollFade>
      </div>
      <div className="" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -20 1000 100"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path className="fill-gray-50 dark:fill-[#070f1f]" d="M1000,0V-20H0V50L1000,0z"></path>
        </svg>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-start p-3.5 max-sm:p-3.5 sm:p-6 md:p-8 bg-white dark:bg-[#101b31] shadow-sm rounded-3xl hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-white/10">
    <div className="flex flex-col h-[8.75rem] max-sm:h-[7.65rem] sm:h-40 gap-2.5 max-sm:gap-2 sm:gap-4 items-start">
      <div className="flex-shrink-0 w-9 h-9 max-sm:w-9 max-sm:h-9 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-950/50 rounded-[16px] sm:rounded-[18px] flex items-center justify-center">
        <Icon className="size-4 sm:size-5 text-blue-600 dark:text-blue-300" />
      </div>
      <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-relaxed mt-auto">
        {description}
      </p>
    </div>
  </div>
);
