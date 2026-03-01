import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import React from "react";

interface ScrollStaggerProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
}

export const ScrollStagger = ({ children, index = 0, className = "" }: ScrollStaggerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
