import { motion, Variants } from "framer-motion";
import React from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  variant?: "character" | "word";
}

export const SplitText = ({ 
  text, 
  className = "", 
  delay = 0,
  variant = "character" 
}: SplitTextProps) => {
  const words = text.split(" ");
  const chars = text.split("");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (variant === "word") {
    return (
      <motion.span
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span
            key={`word-${index}`}
            variants={itemVariants}
            className="inline-block"
          >
            {word}
            {index < words.length - 1 && "\u00A0"}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {chars.map((char, index) => (
        <motion.span
          key={`char-${index}`}
          variants={itemVariants}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};
