import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  const floatingVariants = {
    animate: (custom: number) => ({
      y: [0, -30, 0],
      x: [0, 20, 0],
      transition: {
        duration: 6 + custom,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    }),
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top-left blob */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        variants={floatingVariants}
        animate="animate"
        custom={0}
      />

      {/* Top-right blob */}
      <motion.div
        className="absolute -top-20 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        variants={floatingVariants}
        animate="animate"
        custom={1}
      />

      {/* Center blob */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
        variants={floatingVariants}
        animate="animate"
        custom={2}
      />

      {/* Bottom-right blob */}
      <motion.div
        className="absolute -bottom-40 right-10 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        variants={floatingVariants}
        animate="animate"
        custom={1.5}
      />

      {/* Floating accent circles */}
      <motion.div
        className="absolute bottom-40 left-20 w-32 h-32 border-2 border-purple-300 rounded-full opacity-10"
        animate={{
          rotate: -360,
          transition: {
            duration: 15,
            repeat: Infinity,
            ease: "linear" as const,
          },
        }}
      />

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white opacity-80" />
    </div>
  );
};
