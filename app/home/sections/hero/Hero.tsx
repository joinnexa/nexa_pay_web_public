"use client";

import { ChevronDown } from "lucide-react";
import React from "react";
import { scroller } from 'react-scroll';
import { motion } from "framer-motion";
import { SplitText } from "@/components/animations/SplitText";
import { AnimatedBackground } from "@/components/animations/AnimatedBackground";
import { useLocale } from "@/contexts/LocaleContext";
import { useIsPhone } from "@/hooks/useIsPhone";

export const HeroSection = () => {
  const { t } = useLocale();
  const isPhone = useIsPhone();
  const up = isPhone ? 10 : 20;
  const dur = isPhone ? 0.38 : 0.6;
  const stagger = isPhone ? 0.06 : 0.15;
  const handleExploreFlow = () => {
    scroller.scrollTo('howItWorks', {
      duration: 700,
      delay: 0,
      smooth: 'easeInOutQuad',
      offset: -40,
    });
  };
  const handleJoinWaitlist = () => {
    scroller.scrollTo('joinForm', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuad',
      offset: 50,
    });
  };

  return (
    <section className="min-h-[88dvh] sm:min-h-[90vh] md:h-[96vh] flex flex-col relative bg-white dark:bg-[#070f1f]">
      <AnimatedBackground />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] items-center px-4 sm:px-6 md:px-8 pb-7 sm:pb-10 md:pb-5 flex-1 relative z-10 gap-5 sm:gap-8 md:gap-12 pt-3 sm:pt-0">
        {/* Left Content */}
        <div className="flex flex-col items-center md:items-start justify-center">
          <div className="flex items-center justify-start gap-2">
            <motion.div
              className="mb-3 sm:mb-4"
              initial={{ opacity: 0, y: up }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur, delay: stagger }}
            >
              <img
                src="/images/ressources/nexa-pay-no-bg.png"
                alt="Nexa Pay Logo"
                className="w-10 object-contain rounded-full"
              />
            </motion.div>
            <motion.div
              className="mb-3 sm:mb-4 inline-block"
              initial={{ opacity: 0, y: up }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur, delay: 0 }}
            >
              <p className="bg-blue-100 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 text-sm font-bold px-3 py-2 md:px-4 md:py-2 rounded-full border border-blue-200 dark:border-blue-800 tracking-wide">
                {t.hero.beta}
              </p>
            </motion.div>
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-800 dark:text-gray-100 font-extrabold text-center md:text-left mb-3 md:mb-4 leading-[1.05] tracking-tight">
            <SplitText
              text={t.hero.title1}
              variant="word"
              delay={0.2}
            />
            <br />
            <SplitText
              text={t.hero.title2}
              variant="word"
              delay={0.5}
            />
          </div>
          <motion.p
            className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 text-center md:text-left max-w-2xl mb-4 sm:mb-6 md:mb-8 leading-relaxed"
            initial={{ opacity: 0, y: up }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: isPhone ? 0.12 : 0.3 }}
          >
            {t.hero.text}
          </motion.p>
          <motion.p
            className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-400 text-center md:text-left max-w-2xl mb-5 sm:mb-8 md:mb-10 tracking-wide"
            initial={{ opacity: 0, y: up }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: isPhone ? 0.16 : 0.35 }}
          >
            {t.hero.slogan}
          </motion.p>
          <motion.div
            className="flex gap-3 md:gap-4 rounded-lg flex-wrap justify-center md:justify-start"
            initial={{ opacity: 0, y: up }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: isPhone ? 0.2 : 0.4 }}
          >
            <button onClick={handleJoinWaitlist} className="bg-[var(--dark-bg)] opacity-90 hover:opacity-100 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-xl transition-all text-base">
              {t.hero.ctaPrimary}
            </button>
            <button onClick={handleExploreFlow} className="border-2 border-gray-200/60 dark:border-white/15 bg-gray-100/60 dark:bg-white/5 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/10 font-semibold py-2 md:py-3 px-6 md:px-8 rounded-xl transition-all text-base">
              {t.hero.ctaSecondary}
            </button>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          className="flex items-center justify-center hidden md:flex"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            src="/images/ressources/malette-1.png"
            alt="Nexa Pay Wallet"
            className="w-full max-w-xs object-contain rounded-3xl"
          />
        </motion.div>
      </div>
      <motion.div
        className="flex justify-center pb-4 sm:pb-6 md:pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur, delay: isPhone ? 0.25 : 0.5 }}
      >
        <button
          onClick={handleJoinWaitlist}
          className={`cursor-pointer transition-transform ${isPhone ? "hover:scale-105 active:scale-95" : "hover:scale-110"}`}
          aria-label="Scroll to join form"
        >
          <ChevronDown
            className={`text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white w-6 md:w-8 ${isPhone ? "" : "animate-bounce"}`}
          />
        </button>
      </motion.div>
    </section>
  );
};
