"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function DatePickerWidget({ onSelectDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleDayClick = (day) => {
    const selected = new Date(year, month, day);
    const formatted = selected.toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    // Return standard ISO date or formatted to parent
    onSelectDate(formatted);
  };

  const today = new Date();
  const isPastDay = (day) => {
    const d = new Date(year, month, day);
    d.setHours(23, 59, 59, 0);
    return d < today;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-white rounded-2xl p-4 shadow-sm w-full max-w-sm mx-auto"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors" disabled={currentDate < new Date(today.getFullYear(), today.getMonth(), 1)}>
          <FiChevronLeft className={currentDate < new Date(today.getFullYear(), today.getMonth(), 1) ? "text-gray-300" : "text-gray-600"} />
        </button>
        <h3 className="font-bold text-gray-800">{monthNames[month]} {year}</h3>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
          <FiChevronRight className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-semibold text-gray-400">
        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="h-10" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const disabled = isPastDay(day);
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

          return (
            <motion.button
              key={day}
              whileHover={disabled ? {} : { scale: 1.1 }}
              whileTap={disabled ? {} : { scale: 0.95 }}
              disabled={disabled}
              onClick={() => handleDayClick(day)}
              className={`h-10 w-full flex items-center justify-center rounded-xl text-sm transition-colors cursor-pointer ${
                disabled 
                  ? "text-gray-300 cursor-not-allowed" 
                  : isToday 
                    ? "bg-sky-100 text-sky-600 font-bold" 
                    : "text-gray-700 hover:bg-gray-100 font-medium"
              }`}
            >
              {day}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
