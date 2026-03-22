"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

// ── Chat Steps ──────────────────────────────────────────────────
const STEPS = {
  IDLE: "IDLE",
  NAME: "NAME",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  TYPE: "TYPE",
  DATE: "DATE",
  TIME: "TIME",
  CONFIRM: "CONFIRM",
  DONE: "DONE",
};

const INSPECTION_TYPES = ["Home", "Commercial", "Plumbing", "Electrical"];

const ChatContext = createContext(null);

// ── Provider ────────────────────────────────────────────────────
export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStep, setChatStep] = useState(STEPS.IDLE);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    date: "",
    time: "",
  });

  const router = useRouter();
  const stepRef = useRef(STEPS.IDLE);
  const bookingRef = useRef(bookingData);
  const voiceEnabledRef = useRef(isVoiceEnabled);

  // Keep refs in sync for use inside callbacks
  stepRef.current = chatStep;
  bookingRef.current = bookingData;
  voiceEnabledRef.current = isVoiceEnabled;

  // ── Speech Synthesis ───────────────────────────────────────────
  const speakText = useCallback(
    (text) => {
      if (!voiceEnabledRef.current || typeof window === "undefined" || !window.speechSynthesis) return;

      // Clean markdown out of the spoken text
      const cleanText = text.replace(/[*#]/g, "").replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");

      // Cancel any ongoing speech so standard lines don't get overly queued
      // Actually, we want to queue. But we should make sure we're speaking the current context.
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Try to find a good English voice
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find((v) => v.name.includes("Google US English") || v.name.includes("Samantha")) || voices[0];
      if (preferred) utterance.voice = preferred;

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  // ── Helpers ──────────────────────────────────────────────────

  /** Append a message to the chat */
  const addMessage = useCallback((role, text, opts = {}) => {
    const msg = {
      id: Date.now() + Math.random(),
      role, // "ai" | "user"
      text,
      quickReplies: opts.quickReplies || null,
    };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }, []);

  /**
   * Simulate AI typing delay then reveal a message.
   * @param {string|string[]} text  - one string OR array = sequential messages
   * @param {number}          delay - base delay before first message (ms)
   * @param {object}          opts  - { quickReplies }
   */
  const simulateAIReply = useCallback(
    async (text, delay = 800, opts = {}) => {
      const lines = Array.isArray(text) ? text : [text];

      for (let i = 0; i < lines.length; i++) {
        // Show typing indicator
        setIsTyping(true);
        await sleep(i === 0 ? delay : 600);
        setIsTyping(false);

        // Last line gets the quickReplies
        const msgOpts = i === lines.length - 1 ? opts : {};
        addMessage("ai", lines[i], msgOpts);
        speakText(lines[i]);

        if (i < lines.length - 1) await sleep(300);
      }
    },
    [addMessage, speakText]
  );

  // ── Booking Step Processor ───────────────────────────────────
  const processUserInput = useCallback(
    async (text) => {
      const step = stepRef.current;
      const data = bookingRef.current;
      const trimmed = text.trim();

      switch (step) {
        // ── "Schedule an Inspection" chosen ──
        case STEPS.IDLE: {
          if (trimmed.toLowerCase().includes("schedule")) {
            setChatStep(STEPS.NAME);
            await simulateAIReply(
              ["Awesome, I can help you schedule that 😊", "First, can I get your **name**?"],
              400
            );
          } else if (trimmed.toLowerCase().includes("visit")) {
            await simulateAIReply(
              "Great! Let me take you to our website where you can explore everything. 🏠",
              600
            );
            setTimeout(() => router.push("/home"), 1800);
          }
          break;
        }

        // ── Name ──
        case STEPS.NAME: {
          if (trimmed.length < 2) {
            await simulateAIReply("Could you share your full name? 😊", 500);
            return;
          }
          const firstName = trimmed.split(" ")[0];
          setBookingData((prev) => ({ ...prev, name: firstName }));
          setChatStep(STEPS.EMAIL);
          await simulateAIReply(
            [`Nice to meet you, **${firstName}**! 👋`, "What's your **email address**?"],
            500
          );
          break;
        }

        // ── Email ──
        case STEPS.EMAIL: {
          if (!isValidEmail(trimmed)) {
            await simulateAIReply(
              "Hmm, that doesn't look like a valid email. Could you double-check? 🤔",
              500
            );
            return;
          }
          setBookingData((prev) => ({ ...prev, email: trimmed }));
          setChatStep(STEPS.PHONE);
          await simulateAIReply(
            ["Got it! 👍", "And your **phone number**?"],
            500
          );
          break;
        }

        // ── Phone ──
        case STEPS.PHONE: {
          const digits = trimmed.replace(/\D/g, "");
          if (digits.length < 7) {
            await simulateAIReply("Please enter a valid phone number. 📞", 500);
            return;
          }
          setBookingData((prev) => ({ ...prev, phone: trimmed }));
          setChatStep(STEPS.TYPE);
          await simulateAIReply(
            "What type of inspection do you need?",
            500,
            {
              quickReplies: INSPECTION_TYPES.map((t) => ({ label: `${typeEmoji(t)} ${t}`, value: t })),
            }
          );
          break;
        }

        // ── Inspection Type ──
        case STEPS.TYPE: {
          const matched = INSPECTION_TYPES.find(
            (t) => t.toLowerCase() === trimmed.toLowerCase().replace(/^.+\s/, "").trim()
          ) || INSPECTION_TYPES.find((t) => trimmed.toLowerCase().includes(t.toLowerCase()));

          if (!matched) {
            await simulateAIReply(
              "Please pick one: Home, Commercial, Plumbing, or Electrical.",
              500,
              { quickReplies: INSPECTION_TYPES.map((t) => ({ label: `${typeEmoji(t)} ${t}`, value: t })) }
            );
            return;
          }
          setBookingData((prev) => ({ ...prev, type: matched }));
          setChatStep(STEPS.DATE);
          await simulateAIReply(
            [`${typeEmoji(matched)} Great choice! When would you like the inspection?`, "Please enter a **date** (e.g., April 5, 2026 or 2026-04-05)."],
            500
          );
          break;
        }

        // ── Date ──
        case STEPS.DATE: {
          const parsed = Date.parse(trimmed);
          if (isNaN(parsed)) {
            await simulateAIReply("I couldn't read that date 😅. Try something like \"April 5, 2026\".", 500);
            return;
          }
          const formatted = new Date(parsed).toLocaleDateString("en-US", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
          });
          setBookingData((prev) => ({ ...prev, date: formatted }));
          setChatStep(STEPS.TIME);
          await simulateAIReply(
            [`📅 Noted — **${formatted}**!`, "And what **time** works best for you? (e.g., 9:00 AM, 2:30 PM)"],
            500
          );
          break;
        }

        // ── Time ──
        case STEPS.TIME: {
          if (trimmed.length < 3) {
            await simulateAIReply("Could you give me a time? Like **9 AM** or **2:30 PM**.", 500);
            return;
          }
          setBookingData((prev) => ({ ...prev, time: trimmed }));
          setChatStep(STEPS.CONFIRM);

          const d = { ...bookingRef.current, time: trimmed };
          await simulateAIReply(
            [
              "Let me confirm everything with you 👇",
              `📋 **Booking Summary**\n\n👤 **Name:** ${d.name}\n📧 **Email:** ${d.email}\n📞 **Phone:** ${d.phone}\n🔍 **Type:** ${d.type} Inspection\n📅 **Date:** ${d.date}\n⏰ **Time:** ${trimmed}`,
            ],
            600,
            {
              quickReplies: [
                { label: "✅ Confirm", value: "confirm" },
                { label: "✏️ Edit", value: "edit" },
              ],
            }
          );
          break;
        }

        // ── Confirm / Edit ──
        case STEPS.CONFIRM: {
          if (trimmed.toLowerCase().includes("confirm")) {
            setChatStep(STEPS.DONE);
            // Submit to API
            try {
              await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingRef.current),
              });
            } catch (_) { /* demo — ignore errors */ }

            await simulateAIReply(
              [
                "🎉 You're all set!",
                `Your **${bookingRef.current.type} Inspection** has been scheduled for **${bookingRef.current.date}** at **${bookingRef.current.time}**. We'll send a confirmation to **${bookingRef.current.email}** shortly!`,
                "Is there anything else I can help you with? 😊",
              ],
              600
            );
          } else if (trimmed.toLowerCase().includes("edit")) {
            setChatStep(STEPS.NAME);
            setBookingData({ name: "", email: "", phone: "", type: "", date: "", time: "" });
            await simulateAIReply(
              "No problem! Let's start over 😊 First, can I get your **name**?",
              500
            );
          }
          break;
        }

        // ── Done — free chat fallback ──
        case STEPS.DONE: {
          await simulateAIReply(
            "I'm glad I could help! 🏠 Feel free to visit our website or start a new booking anytime.",
            600,
            {
              quickReplies: [
                { label: "🏠 Visit Website", value: "Visit Website" },
                { label: "📅 New Booking", value: "Schedule an Inspection" },
              ],
            }
          );
          setChatStep(STEPS.IDLE);
          break;
        }

        default:
          break;
      }
    },
    [simulateAIReply, router]
  );

  // ── Context Value ────────────────────────────────────────────
  const value = {
    messages,
    isTyping,
    chatStep,
    bookingData,
    isVoiceEnabled,
    setIsVoiceEnabled,
    addMessage,
    simulateAIReply,
    processUserInput,
    STEPS,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used inside ChatProvider");
  return ctx;
}

// ── Utilities ────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function typeEmoji(type) {
  const map = { Home: "🏠", Commercial: "🏢", Plumbing: "🔧", Electrical: "⚡" };
  return map[type] || "🔍";
}
