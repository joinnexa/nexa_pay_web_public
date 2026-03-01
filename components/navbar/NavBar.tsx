"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { scroller } from "react-scroll";
import { Lightbulb, BookOpen, Shield, Phone, BookSearch } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";

export const NavBar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { scrollY } = useScroll();

  const navItems = [
    { label: "About", icon: Lightbulb, target: "about", offset: -20 },
    { label: "Overview", icon: BookSearch, target: "overview", offset: -50 },
    { label: "How It Works", icon: BookOpen, target: "howItWorks", offset: -50 },
    { label: "Trust", icon: Shield, target: "trust", offset: -50 },
    { label: "Contact", icon: Phone, target: "contact", offset: -20 },
  ];

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
    ["rgba(255,255,255,0.96)", "rgba(255,255,255,0.64)"]
  );
  const borderColor = useTransform(
    glass,
    [0, 1],
    ["rgba(255,255,255,0.28)", "rgba(255,255,255,0.60)"]
  );
  const boxShadow = useTransform(
    glass,
    [0, 1],
    ["0 2px 8px rgba(0,0,0,0.04)", "0 16px 45px rgba(0,0,0,0.12)"]
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
            <div className="flex justify-between items-center h-12 px-4 sm:px-6 md:px-8">
              {/* Left - Logo */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
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
                <h2 className="text-sm font-semibold">Nexa</h2>
              </button>

              {/* Right - Navigation Links */}
              <div className="flex items-center gap-6">
                {navItems.map(({ label, icon: Icon, target, offset }) => (
                  <button
                    key={target}
                    onClick={() => handleScroll(target, offset)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
                  >
                    <span>{label}</span>
                  </button>
                ))}
                <button onClick={handleJoinWaitlist} className="bg-[var(--dark-bg)] opacity-90 hover:opacity-100 text-white font-semibold py-2 px-2 md:px-4 rounded-lg transition-all text-xs">
                  Join the Waitlist
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </nav>

      {/* Mobile Top Navbar */}
      <nav className="md:hidden bg-gray-50 shadow-sm border-b border-gray-200">
        <div className="flex items-center h-14 px-4">
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
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-50 shadow-lg border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16 px-4">
          {/* <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-center justify-center p-2 hover:opacity-80 transition-opacity"
            title="Home"
          >
            <Image
              src="/images/ressources/nexa-pay.png"
              alt="Nexa Logo"
              width={60}
              height={10}
              className="h-6 w-auto"
            />
          </button> */}
          {navItems.map(({ icon: Icon, target, offset }) => (
            <button
              key={target}
              onClick={() => handleScroll(target, offset)}
              className="flex flex-col gap-1 items-center justify-center p-2 text-gray-700 hover:text-gray-900 transition-colors"
              title={target}
            >
              <Icon className="size-4" />
              <p className="text-xs">{target}</p>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};
