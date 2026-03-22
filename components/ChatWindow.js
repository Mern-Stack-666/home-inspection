"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import QuickReplies from "./QuickReplies";
import DatePickerWidget from "./DatePickerWidget";
import TimePickerWidget from "./TimePickerWidget";
import { useChatContext } from "@/context/ChatContext";

/**
 * Main chat window.
 * Renders message list, typing indicator, quick replies, and input bar.
 */
export default function ChatWindow() {
  const { messages, isTyping, processUserInput, addMessage, chatStep, STEPS } = useChatContext();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [quickRepliesUsed, setQuickRepliesUsed] = useState(new Set());

  // Auto-scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input on mount
  useEffect(() => {
    if (!isTyping) inputRef.current?.focus();
  }, [isTyping]);

  // Handle free-text send
  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;
    setInputValue("");
    addMessage("user", text);
    await processUserInput(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePickerSelect = async (value) => {
    if (isTyping) return;
    addMessage("user", value);
    await processUserInput(value);
  };

  // Handle quick reply selection
  const handleQuickReply = async (value, label, msgId) => {
    if (quickRepliesUsed.has(msgId) || isTyping) return;
    setQuickRepliesUsed((prev) => new Set(prev).add(msgId));
    addMessage("user", label);
    await processUserInput(value);
  };

  return (
    <div className="flex flex-col h-full">
      {/* ── Messages Area ── */}
      <motion.div layout className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-2"
            >
              <MessageBubble message={msg} />

              {/* Quick Replies (only show if not yet used) */}
              {msg.quickReplies && !quickRepliesUsed.has(msg.id) && (
                <QuickReplies
                  replies={msg.quickReplies}
                  onSelect={(value, label) => handleQuickReply(value, label, msg.id)}
                />
              )}
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div key="typing">
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </motion.div>

      {/* ── Input Bar ── */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-4 py-3 border-t"
        style={{
          background: "rgba(255,255,255,0.95)",
          borderColor: "var(--color-border)",
        }}
      >
        {chatStep === STEPS.IDLE || chatStep === STEPS.DONE ? (
          <motion.div layout className="py-2 flex justify-center w-full">
            <Link href="/home" className="w-full">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl text-center font-bold text-white transition-shadow cursor-pointer tracking-wide shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                style={{
                  background: "var(--color-accent-2)",
                }}
              >
                Explore the Site →
              </motion.button>
            </Link>
          </motion.div>
        ) : chatStep === STEPS.DATE && !isTyping ? (
            <motion.div layout className="py-2">
              <DatePickerWidget onSelectDate={handlePickerSelect} />
            </motion.div>
          ) : chatStep === STEPS.TIME && !isTyping ? (
            <motion.div layout className="py-2">
              <TimePickerWidget onSelectTime={handlePickerSelect} />
            </motion.div>
          ) : (
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: "var(--color-surface-2)",
                border: `1.5px solid ${isTyping ? "var(--color-border)" : "transparent"}`,
                boxShadow: isTyping ? "none" : "0 0 0 2px rgba(30,58,138,0.1)",
                transition: "box-shadow 0.2s, border-color 0.2s",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                placeholder={isTyping ? "Assistant is typing…" : "Type a message…"}
                className="flex-1 bg-transparent outline-none text-sm"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "inherit",
                }}
              />

              {/* Send Button */}
              <motion.button
                whileHover={!isTyping && inputValue.trim() ? { scale: 1.05 } : {}}
                whileTap={!isTyping && inputValue.trim() ? { scale: 0.95 } : {}}
                onClick={handleSend}
                disabled={isTyping || !inputValue.trim()}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                style={{
                  background:
                    isTyping || !inputValue.trim()
                      ? "rgba(0,0,0,0.05)"
                      : "var(--color-accent-2)",
                  color: isTyping || !inputValue.trim() ? "var(--color-text-muted)" : "#fff",
                }}
                aria-label="Send message"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22 11 13 2 9l20-7z" />
                </svg>
              </motion.button>
            </div>
          )}

          {/* Subtle hint */}
          <motion.p layout className="text-xs text-center mt-2" style={{ color: "var(--color-text-muted)" }}>
            Powered by Home Inspection AI
          </motion.p>
      </motion.div>
    </div>
  );
}
