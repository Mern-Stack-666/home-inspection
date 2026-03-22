"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ChatWindow from "@/components/ChatWindow";
import { useChatContext } from "@/context/ChatContext";
import Link from "next/link";
import { FiBriefcase, FiCalendar, FiVolume2, FiVolumeX } from "react-icons/fi";

export default function ChatPage() {
  const { simulateAIReply, messages, isVoiceEnabled, setIsVoiceEnabled } = useChatContext();
  const initializedRef = useRef(false);

  // Send welcome message once on mount
  useEffect(() => {
    if (initializedRef.current || messages.length > 0) return;
    initializedRef.current = true;

    simulateAIReply(
      "Hi, I'm Alex, lead virtual inspector at **HomeInspect**. Ready to schedule an evaluation or check out our services?",
      600
    ).then(() =>
      simulateAIReply("I've got you covered. What can I help you with today?", 400, {
        quickReplies: [
          { label: "Visit Website", value: "Visit Website" },
          { label: "Schedule an Inspection", value: "Schedule an Inspection" },
        ],
      })
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="chat-bg flex flex-col h-screen overflow-hidden">
      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-shrink-0 flex items-center justify-between px-5 py-3.5"
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {/* Logo + Status */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{ background: "var(--color-accent-2)", boxShadow: "0 4px 12px rgba(30,58,138,0.25)" }}
          >
            <FiBriefcase size={20} color="#fff" />
          </div>
          <div>
            <h1 className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
              HomeInspect AI
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" style={{ boxShadow: "0 0 6px #22c55e" }} />
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Alex (Lead Inspector) · Online</span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            style={{
              background: isVoiceEnabled ? "rgba(14,165,233,0.1)" : "var(--color-surface-2)",
              color: isVoiceEnabled ? "var(--color-accent)" : "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
            }}
            aria-label="Toggle Voice"
          >
            {isVoiceEnabled ? <FiVolume2 size={16} /> : <FiVolumeX size={16} />}
          </button>
          
          <p className="text-xs hidden sm:block ml-2" style={{ color: "var(--color-text-muted)" }}>
            Professional home inspections · Book in minutes
          </p>
          <Link href="/home">
            <button
              className="text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-colors"
              style={{ background: "var(--color-surface-2)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(14,165,233,0.1)"; e.currentTarget.style.color = "var(--color-accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-surface-2)"; e.currentTarget.style.color = "var(--color-text-secondary)"; }}
            >
              Visit Site →
            </button>
          </Link>
        </div>
      </motion.header>

      {/* ── Chat Area ── */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex-1 overflow-hidden"
      >
        <ChatWindow />
      </motion.main>
    </div>
  );
}
