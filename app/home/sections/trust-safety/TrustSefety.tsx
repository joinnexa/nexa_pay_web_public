import React from "react";
import { ShieldCheck, Users, FileCheck } from "lucide-react";
import { ScrollFade } from "@/components/animations/ScrollFade";
import { ScrollStagger } from "@/components/animations/ScrollStagger";

const TRUST_CARDS = [
  {
    icon: <ShieldCheck size={26} />,
    title: "Secure by design",
    description: "Strong authentication and protected sessions from day one.",
  },
  {
    icon: <Users size={26} />,
    title: "Transparent costs",
    description: "Users should understand costs before confirming an action — no surprises.",
  },
  {
    icon: <FileCheck size={26} />,
    title: "Built with compliance in mind",
    description: "Designed to support auditability and fintech readiness as the platform grows.",
  },
];

export const TrustSefetySection = () => {
  return (
    <section id="trust" className="bg-white !pb-28 py-12 sm:py-16 md:py-10 px-4 sm:px-6 md:px-20">
      <ScrollFade className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <h2 className="primary-heading mb-4">
          Trust & Transparency
        </h2>
        <p className="secondary-heading">Nexa Pay is being built carefully and locally — with security, transparency, and reliability treated as non-negotiables.</p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
          {TRUST_CARDS.map((card, index) => (
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
        <div className="mt-8 md:mt-10 bg-white border border-gray-200 rounded-lg md:rounded-xl py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-600 shadow-sm">
          Nexa Pay is currently in private beta. Not a bank.
        </div>
      </ScrollFade>
    </section>
  );
};

const TrustCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center max-w-xs mx-auto bg-gray-50 shadow-sm rounded-3xl hover:shadow-md transition-shadow duration-200 border border-gray-200 p-6 py-12">
    {/* Icon container */}
    <div className="w-12 md:w-14 h-12 md:h-14 flex items-center justify-center rounded-lg md:rounded-xl bg-white text-blue-600 shadow-md mb-4 md:mb-6">
      {icon}
    </div>

    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{title}</h3>

    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);
