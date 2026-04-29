"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import React from "react";
import { useIsPhone } from "@/hooks/useIsPhone";

interface ScrollStaggerProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
}

export const ScrollStagger = ({ children, index = 0, className = "" }: ScrollStaggerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });
  const isPhone = useIsPhone();
  const drift = isPhone ? 12 : 30;
  const duration = isPhone ? 0.32 : 0.5;
  const stagger = isPhone ? 0.04 : 0.1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: drift }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: drift }}
      transition={{
        duration,
        ease: "easeOut",
        delay: index * stagger,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
