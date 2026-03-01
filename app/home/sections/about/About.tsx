import React from "react";
import { Zap, TrendingDown, QrCode, Smartphone } from "lucide-react";
import { ScrollFade } from "@/components/animations/ScrollFade";
import { ScrollStagger } from "@/components/animations/ScrollStagger";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant transfers",
    description: "Send money in seconds with clear confirmations and reliable records.",
  },
  {
    icon: TrendingDown,
    title: "Lower-cost money transfers",
    description:
      "Designed to significantly reduce transfer fees, especially for frequent everyday transfers.",
  },
  {
    icon: QrCode,
    title: "Pay merchants by QR",
    description:
      "Scan and pay in-store — quick, simple, and repeatable for daily purchases.",
  },
  {
    icon: Smartphone,
    title: "One wallet for what's next",
    description:
      "Payments are step one. Nexa is building toward a broader ecosystem of real-life services in Morocco.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 80"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path className="fill-gray-50" d="M0,80V100H1000V30L0,80z"></path>
        </svg>
      </div>
      <div className="bg-gray-50 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <ScrollFade className="max-w-5xl mx-auto px-4 pb-20 sm:px-6 md:px-20 pt-20 sm:pt-20 md:pt-20">
          <h2 className="primary-heading">
            Nexa Pay: Morocco's Digital Wallet
          </h2>
          <p className="secondary-heading">
            Nexa Pay is the financial foundation of Nexa — a Morocco-first ecosystem built around one wallet. It starts with essential payments and transfers, then expands into daily services through one connected experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {FEATURES.map((feature, index) => (
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
          <path className="fill-gray-50" d="M1000,0V-20H0V50L1000,0z"></path>
        </svg>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-start p-4 sm:p-6 md:p-8 bg-white shadow-sm rounded-3xl hover:shadow-md transition-shadow duration-200 border border-gray-200">
    <div className="flex flex-col h-40 gap-3 sm:gap-4 items-start">
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-[18px] flex items-center justify-center">
        <Icon className="size-4 sm:size-5 text-blue-600" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-gray-800">
        {title}
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-auto">
        {description}
      </p>
    </div>
  </div>
);
