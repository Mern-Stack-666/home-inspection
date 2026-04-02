"use client";

import { motion } from "framer-motion";

/**
 * Animated 3-dot typing indicator (AI side).
 * Uses a staggered bounce animation.
 */
export default function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0, opacity: 0.4 },
    animate: { y: -6, opacity: 1 },
  };

  const containerVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-end gap-3 px-2 py-1"
    >
      {/* Avatar with Pulse Animation */}
      <div className="relative shrink-0">
        <motion.div
           animate={{ scale: [1, 1.25, 1], opacity: [0, 0.4, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           className="absolute inset-0 rounded-full bg-teal-400"
        />
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm relative z-10"
          style={{ background: "linear-gradient(135deg, #14b8a6, #0ea5e9)" }}>
          🏠
        </div>
      </div>

      {/* Bubble */}
      <div
        className="flex items-center gap-[5px] px-4 py-3 rounded-2xl rounded-bl-sm"
        style={{ background: "var(--color-ai-bubble)", border: "1px solid var(--color-border)" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="block w-2 h-2 rounded-full"
            style={{ background: "var(--color-accent)" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
