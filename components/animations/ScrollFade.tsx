"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsPhone } from "@/hooks/useIsPhone";

interface ScrollFadeProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollFade = ({ children, className = "" }: ScrollFadeProps) => {
  const { ref, isInView } = useScrollAnimation();
  const isPhone = useIsPhone();
  const drift = isPhone ? 10 : 20;
  const duration = isPhone ? 0.32 : 0.6;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: drift }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: drift }}
      transition={{ duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
