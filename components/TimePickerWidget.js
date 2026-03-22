"use client";

import { motion } from "framer-motion";
import { FiClock } from "react-icons/fi";

export default function TimePickerWidget({ onSelectTime }) {
  const times = [
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", 
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-white rounded-2xl p-4 shadow-sm w-full max-w-sm mx-auto"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center gap-2 mb-4 text-sky-500 font-bold justify-center">
        <FiClock size={18} />
        <span>Available Times</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {times.map((time, i) => (
          <motion.button
            key={time}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectTime(time)}
            className="py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
            style={{ 
              background: "var(--color-surface-2)", 
              border: "1px solid rgba(14,165,233,0.2)",
              color: "var(--color-text-primary)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-primary)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-surface-2)";
              e.currentTarget.style.color = "var(--color-text-primary)";
            }}
          >
            {time}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
