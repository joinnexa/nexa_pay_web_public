"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { scroller } from "react-scroll";
import { Lightbulb, BookOpen, Shield, Phone, BookSearch, Sun, Moon, Users } from "lucide-react";
import { useLocale, type Locale } from "@/contexts/LocaleContext";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";

export const NavBar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLocaleOpen, setIsLocaleOpen] = useState(false);
  const [isMobileLocaleOpen, setIsMobileLocaleOpen] = useState(false);
  const { scrollY } = useScroll();
  const { locale, setLocale, t, theme, toggleTheme } = useLocale();

  const navItems = [
    { label: t.nav.why, icon: BookSearch, target: "overview", offset: -50 },
    { label: t.nav.services, icon: Lightbulb, target: "about", offset: -20 },
    { label: t.nav.pillars, icon: Shield, target: "pillars", offset: -50 },
    { label: t.nav.howItWorks, icon: BookOpen, target: "howItWorks", offset: -50 },
    { label: t.nav.segments, icon: Users, target: "segments", offset: -50 },
    { label: t.nav.roadmap, icon: Phone, target: "roadmap", offset: -50 },
    { label: t.nav.trust, icon: Shield, target: "trust", offset: -50 },
    { label: t.nav.contact, icon: Phone, target: "contact", offset: -20 },
  ];
  const desktopNavItems = navItems.filter((item) => item.target !== "contact");

  const handleScroll = (target: string, offset: number = -80) => {
    scroller.scrollTo(target, {
      smooth: true,
      duration: 500,
      offset: offset,
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

  // Detect small screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Scroll-driven motion values
  const progress = useTransform(scrollY, [0, 260], [0, 1], { clamp: true });

  const glassDelayed = useTransform(progress, (v) => Math.max(v - 0.1, 0) / 0.9);
  const glassEased = useTransform(glassDelayed, (v) => 1 - Math.pow(1 - v, 2));
  const glass = useSpring(glassEased, {
    stiffness: 120,
    damping: 24,
    mass: 0.9,
  });

  const shrinkDelayed = useTransform(
    progress,
    (v) => Math.max(v - 0.35, 0) / 0.65
  );
  const shrinkEased = useTransform(shrinkDelayed, (v) => 1 - Math.pow(1 - v, 2));
  const shrink = useSpring(shrinkEased, {
    stiffness: 120,
    damping: 24,
    mass: 0.9,
  });

  const maxWidth = useMotionValue("100%");

  useEffect(() => {
    const updateMaxWidth = () => {
      const shrinkValue = shrink.get();
      const endValue = isSmallScreen ? 85 : 75;
      const currentPercent = 100 + (endValue - 100) * shrinkValue;
      maxWidth.set(`${currentPercent}%`);
    };

    const unsubscribe = shrink.on("change", updateMaxWidth);
    updateMaxWidth();

    return () => unsubscribe();
  }, [shrink, isSmallScreen, maxWidth]);

  const paddingX = useTransform(glass, [0, 1], ["0rem", "1rem"]);
  const bgColor = useTransform(
    glass,
    [0, 1],
    theme === "dark"
      ? ["rgba(8,17,34,0.90)", "rgba(8,17,34,0.64)"]
      : ["rgba(255,255,255,0.96)", "rgba(255,255,255,0.64)"]
  );
  const borderColor = useTransform(
    glass,
    [0, 1],
    theme === "dark"
      ? ["rgba(255,255,255,0.18)", "rgba(255,255,255,0.30)"]
      : ["rgba(255,255,255,0.28)", "rgba(255,255,255,0.60)"]
  );
  const boxShadow = useTransform(
    glass,
    [0, 1],
    theme === "dark"
      ? ["0 2px 8px rgba(0,0,0,0.20)", "0 16px 45px rgba(0,0,0,0.35)"]
      : ["0 2px 8px rgba(0,0,0,0.04)", "0 16px 45px rgba(0,0,0,0.12)"]
  );
  const blur = useTransform(glass, [0, 1], ["blur(3px)", "blur(15px)"]);
  const radius = useTransform(glass, [0, 1], ["2px", "16px"]);
  const translateY = useTransform(glass, [0, 1], ["0px", "6px"]);
  const scale = useTransform(glass, [0, 1], ["1", "0.98"]);
  const transform = useTransform(
    glass,
    () => `translateY(${translateY.get()}) scale(${scale.get()})`
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block sticky top-0 z-50">
        <motion.div
          className="w-full"
          style={{
            maxWidth,
            paddingInline: paddingX,
            margin: "0 auto",
          }}
        >
          <motion.div
            className="border"
            style={{
              backgroundColor: bgColor,
              borderColor,
              boxShadow,
              backdropFilter: blur,
              borderRadius: radius,
              transform,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 24,
              mass: 0.9,
            }}
          >
            <div className="flex justify-between items-center h-14 px-4 sm:px-5 md:px-6">
              {/* Left - Logo */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 hover:opacity-85 transition-opacity min-w-fit"
              >
                <div className="flex-shrink-0">
                  <Image
                    src="/images/ressources/nexa-pay-no-bg.png"
                    alt="Nexa Logo"
                    width={60}
                    height={10}
                    className="h-6 w-auto"
                  />
                </div>
              </button>

              {/* Right - Navigation Links */}
              <div className="flex items-center gap-3 md:gap-4">
                {desktopNavItems.map(({ label, target, offset }) => (
                  <button
                    key={target}
                    onClick={() => handleScroll(target, offset)}
                    className={`flex items-center text-sm font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                      theme === "dark" ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    <span>{label}</span>
                  </button>
                ))}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsLocaleOpen((prev) => !prev)}
                    className={`inline-flex items-center justify-center min-w-14 h-9 px-3 rounded-full border text-sm font-bold tracking-wider ${
                      theme === "dark"
                        ? "border-white/20 bg-[#0b1a35] text-white"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    aria-label={t.nav.language}
                  >
                    {locale.toUpperCase()}
                  </button>
                  {isLocaleOpen && (
                    <div className={`absolute right-0 top-full mt-2 rounded-xl border shadow-lg p-1.5 z-50 min-w-20 ${
                      theme === "dark" ? "border-white/15 bg-[#0b1a35]" : "border-gray-200 bg-white"
                    }`}>
                      {(["en", "fr", "ar"] as Locale[]).map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setLocale(item);
                            setIsLocaleOpen(false);
                          }}
                          className={`w-full h-8 rounded-lg text-sm font-semibold ${
                            item === locale
                              ? "bg-blue-600 text-white"
                              : theme === "dark"
                                ? "text-gray-100 hover:bg-white/10"
                                : "text-gray-800 hover:bg-gray-100"
                          }`}
                        >
                          {item.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={toggleTheme}
                  aria-label={theme === "dark" ? t.nav.switchToLight : t.nav.switchToDark}
                  className={`inline-flex items-center justify-center h-9 w-9 rounded-full border ${
                    theme === "dark"
                      ? "border-white/20 text-white hover:bg-white/10"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </button>
                <button onClick={() => handleScroll("contact", -20)} className={`text-sm font-semibold transition-colors whitespace-nowrap ${
                  theme === "dark" ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-gray-900"
                }`}>
                  {t.nav.contact}
                </button>
                <button onClick={handleJoinWaitlist} className="bg-[var(--dark-bg)] opacity-90 hover:opacity-100 text-white font-bold py-2 px-3 md:px-4 rounded-lg transition-all text-sm whitespace-nowrap">
                  {t.nav.join}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </nav>

      {/* Mobile Top Navbar */}
      <div className="md:hidden h-[104px]" />
      <nav className={`md:hidden fixed top-0 left-0 right-0 z-50 shadow-sm border-b ${
        theme === "dark" ? "bg-[#081122]/90 border-white/10 text-white backdrop-blur-md" : "bg-gray-50/90 border-gray-200 backdrop-blur-md"
      }`}>
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0">
              <Image
                src="/images/ressources/nexa-pay.png"
                alt="Nexa Logo"
                width={60}
                height={10}
                className="h-5 w-auto"
              />
            </div>
            <h2 className="text-sm font-semibold">Nexa</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMobileLocaleOpen((prev) => !prev)}
                className={`inline-flex items-center justify-center min-w-12 h-8 px-2.5 rounded-full border text-sm font-bold tracking-wider ${
                  theme === "dark"
                    ? "border-white/20 bg-[#0b1a35] text-white"
                    : "border-gray-300 bg-white text-gray-900"
                }`}
                aria-label={t.nav.language}
              >
                {locale.toUpperCase()}
              </button>
              {isMobileLocaleOpen && (
                <div className={`absolute right-0 top-full mt-2 rounded-xl border shadow-lg p-1.5 z-50 min-w-20 ${
                  theme === "dark" ? "border-white/15 bg-[#0b1a35]" : "border-gray-200 bg-white"
                }`}>
                  {(["en", "fr", "ar"] as Locale[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setLocale(item);
                        setIsMobileLocaleOpen(false);
                      }}
                      className={`w-full h-8 rounded-lg text-sm font-semibold ${
                        item === locale
                          ? "bg-blue-600 text-white"
                          : theme === "dark"
                            ? "text-gray-100 hover:bg-white/10"
                            : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {item.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t.nav.switchToLight : t.nav.switchToDark}
              className={`inline-flex items-center justify-center h-8 w-8 rounded-full border ${
                theme === "dark"
                  ? "border-white/20 text-white hover:bg-white/10"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </div>
        <div className={`h-[50px] px-2 border-t flex items-center gap-2 overflow-x-auto ${
          theme === "dark" ? "border-white/10" : "border-gray-200"
        }`}>
          {navItems.map(({ label, target, offset }) => (
            <button
              key={`mobile-${target}`}
              onClick={() => handleScroll(target, offset)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                theme === "dark"
                  ? "text-gray-100 border-white/15 hover:text-white"
                  : "text-gray-700 border-gray-200 hover:text-gray-900"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={handleJoinWaitlist}
            className="shrink-0 bg-[var(--dark-bg)] opacity-90 hover:opacity-100 text-white font-bold py-1.5 px-3 rounded-full transition-all text-sm"
          >
            {t.nav.join}
          </button>
        </div>
      </nav>
    </>
  );
};
