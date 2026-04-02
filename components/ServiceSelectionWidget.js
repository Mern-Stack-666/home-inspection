"use client";

import { motion } from "framer-motion";
import { useChatContext } from "@/context/ChatContext";

/**
 * Renders an interactive service selection list with rich cards.
 *
 * Props:
 *  - onSelect: (value: string, label: string) => void
 */
export default function ServiceSelectionWidget({ onSelect }) {
  const { services } = useChatContext();

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 15, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Fallback if services haven't loaded yet
  if (!services || services.length === 0) {
    return (
      <div className="flex flex-col gap-2 p-4 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-20 bg-slate-100 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 gap-3 p-2 max-w-sm mx-auto"
    >
      {services.map((service) => (
        <motion.button
          key={service._id}
          variants={cardVariants}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 58, 138, 0.03)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(service.title, service.title)}
          className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all border border-slate-100 shadow-sm bg-white cursor-pointer group"
        >
          {/* Icon Badge */}
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110"
            style={{ 
              backgroundColor: service.bg || "var(--color-surface-2)",
              color: service.color || "var(--color-accent)",
              border: `1px solid ${service.border || "var(--color-border)"}`
            }}
          >
            {service.icon || "🔍"}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h4 className="font-bold text-slate-800 text-sm">{service.title}</h4>
            <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
              {service.shortDesc || "Professional inspection services."}
            </p>
          </div>

          {/* Arrow */}
          <div className="text-slate-300 group-hover:text-indigo-500 transition-colors pr-2">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
             </svg>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
