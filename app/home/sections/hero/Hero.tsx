import { ChevronDown } from "lucide-react";
import React from "react";
import { scroller } from 'react-scroll';
import { motion } from "framer-motion";
import { SplitText } from "@/components/animations/SplitText";
import { AnimatedBackground } from "@/components/animations/AnimatedBackground";

export const HeroSection = () => {
  const handleJoinWaitlist = () => {
    scroller.scrollTo('joinForm', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuad',
      offset: 50,
    });
  };

  return (
    <section className="min-h-screen sm:min-h-[90vh] md:h-[96vh] flex flex-col relative bg-white">
      <AnimatedBackground />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] items-center px-4 sm:px-6 md:px-8 pb-12 md:pb-5 flex-1 relative z-10 gap-8 md:gap-12">
        {/* Left Content */}
        <div className="flex flex-col items-center md:items-start justify-center">
          <div className="flex items-center justify-start gap-2">
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <img
                src="/images/ressources/nexa-pay-no-bg.png"
                alt="Nexa Pay Logo"
                className="w-10 object-contain rounded-full"
              />
            </motion.div>
            <motion.div
              className="mb-4 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <p className="bg-blue-100 text-blue-900 text-xs font-semibold px-3 py-2 md:px-4 md:py-2 rounded-full border border-blue-200">
                Private Beta — Invite Only
              </p>
            </motion.div>
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 font-bold text-center md:text-left mb-3 md:mb-4 leading-tight">
            <SplitText
              text="Morocco’s new wallet — built here,"
              variant="word"
              delay={0.2}
            />
            <br />
            <SplitText
              text="for life here"
              variant="word"
              delay={0.5}
            />
          </div>
          <motion.p
            className="text-sm sm:text-base text-gray-600 text-center md:text-left max-w-2xl mb-6 md:mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Nexa Pay is a national product built by Moroccans, for Morocco — with one goal: reduce the daily friction we all deal with. Simpler payments, faster transfers, and significantly lower money-transfer fees, all through one easy wallet.
          </motion.p>
          <motion.p
            className="text-xs sm:text-sm text-gray-500 text-center md:text-left max-w-2xl mb-8 md:mb-10 font-medium tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            One identity. One wallet. One ecosystem.
          </motion.p>
          <motion.div
            className="flex gap-3 md:gap-4 rounded-lg flex-wrap justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button onClick={handleJoinWaitlist} className="bg-[var(--dark-bg)] opacity-90 hover:opacity-100 text-white font-semibold py-2 md:py-3 px-6 md:px-8 rounded-xl transition-all text-sm">
              Join the Waitlist
            </button>
            <button className="border-2 border-gray-200/60 bg-gray-100/60 text-gray-800 hover:bg-gray-50 font-semibold py-2 md:py-3 px-6 md:px-8 rounded-xl transition-all text-sm">
              How It Works
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
        className="flex justify-center pb-6 md:pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <button
          onClick={handleJoinWaitlist}
          className="cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll to join form"
        >
          <ChevronDown className="text-gray-600 animate-bounce w-6 md:w-8 hover:text-gray-800" />
        </button>
      </motion.div>
    </section>
  );
};
