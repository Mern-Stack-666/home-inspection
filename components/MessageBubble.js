"use client";

import { motion } from "framer-motion";

/**
 * Renders a single chat message bubble.
 * AI bubbles on the left, User bubbles on the right.
 *
 * Props:
 *  - message: { id, role, text }
 */
export default function MessageBubble({ message }) {
  const isAI = message.role === "ai";

  // Parse **bold** markdown manually for richer text display
  const renderText = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, li) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={li}>
          {parts.map((part, pi) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pi} style={{ fontWeight: 700, color: isAI ? "var(--color-accent)" : "rgba(255,255,255,0.95)" }}>
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pi}>{part}</span>;
          })}
          {li < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  const bubbleVariants = {
    initial: { opacity: 0, y: 12, scale: 0.97 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="initial"
      animate="animate"
      className={`flex items-end gap-3 ${isAI ? "justify-start" : "justify-end"}`}
    >
      {/* AI Avatar */}
      {isAI && (
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold"
          style={{ background: "linear-gradient(135deg, #14b8a6, #0ea5e9)" }}
        >
          🏠
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[75%] sm:max-w-[65%] px-4 py-3 text-sm leading-relaxed ${
          isAI
            ? "rounded-2xl rounded-bl-sm"
            : "rounded-2xl rounded-br-sm"
        }`}
        style={
          isAI
            ? {
                background: "var(--color-surface-2)",
                color: "var(--color-text-primary)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }
            : {
                background: "var(--color-user-bubble)",
                color: "#fff",
                boxShadow: "0 2px 12px rgba(14, 165, 233, 0.25)",
              }
        }
      >
        {renderText(message.text)}
      </div>

      {/* User Avatar */}
      {!isAI && (
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          You
        </div>
      )}
    </motion.div>
  );
}
