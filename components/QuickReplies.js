"use client";

import { motion } from "framer-motion";

/**
 * Quick reply pill buttons.
 *
 * Props:
 *  - replies: Array<{ label: string, value: string }>
 *  - onSelect: (value: string, label: string) => void
 */
export default function QuickReplies({ replies, onSelect }) {
  if (!replies || replies.length === 0) return null;

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 8, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex flex-wrap gap-2 pl-11 mt-2"
    >
      {replies.map((reply) => (
        <motion.button
          key={reply.value}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(reply.value, reply.label)}
          className="px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all"
          style={{
            background: "rgba(20, 184, 166, 0.1)",
            border: "1px solid rgba(20, 184, 166, 0.4)",
            color: "var(--color-accent)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(20, 184, 166, 0.2)";
            e.currentTarget.style.borderColor = "rgba(20, 184, 166, 0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(20, 184, 166, 0.1)";
            e.currentTarget.style.borderColor = "rgba(20, 184, 166, 0.4)";
          }}
        >
          {reply.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
