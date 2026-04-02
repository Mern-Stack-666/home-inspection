"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiHome, FiMail, FiPhone, FiMapPin, FiClock, FiMessageCircle, FiBriefcase, FiCalendar } from "react-icons/fi";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const contactInfo = [
  { Icon: FiMail, label: "Email", value: "hello@homeinspect.ai", href: "mailto:hello@homeinspect.ai" },
  { Icon: FiPhone, label: "Phone", value: "+1 (800) HOME-INS", href: "tel:+18004663467" },
  { Icon: FiMapPin, label: "Office", value: "123 Main St, Suite 400\nNew York, NY 10001", href: null },
  { Icon: FiClock, label: "Hours", value: "Mon – Sat: 8 AM – 6 PM\nSunday: Closed", href: null },
];

const faqs = [
  { q: "How long does a home inspection take?", a: "A standard home inspection takes 2–3 hours for an average-sized home. Larger properties or commercial buildings may take longer." },
  { q: "When will I receive my report?", a: "Your detailed, photo-rich inspection report is delivered within 24 hours of the inspection." },
  { q: "Do I need to be present?", a: "We recommend being present so our inspector can walk you through findings in person, but it's not required." },
  { q: "Are your inspectors certified?", a: "Yes — all our inspectors hold ASHI or InterNACHI certifications and undergo ongoing training." },
  { q: "Can I book through the AI chat?", a: "Absolutely! Our AI assistant (Alex) can walk you through scheduling in under 2 minutes — no forms required." },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <>
      <SiteNavbar />
      <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
        {/* ── Breadcrumb + Hero ── */}
        <section className="relative pt-28 pb-10 px-5 overflow-hidden"
          style={{ background: "var(--color-bg)", borderBottom: "1px solid var(--color-border)" }}>

          {/* Abstract Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[100px] pointer-events-none"
            style={{ background: "var(--color-accent-2)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[80px] pointer-events-none"
            style={{ background: "var(--color-accent)" }} />

          <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

          <div className="max-container relative">
            {/* Breadcrumb */}
            <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }} className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--color-text-muted)" }}>
              <Link href="/home" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>›</span>
              <span style={{ color: "var(--color-text-primary)" }}>Contact Us</span>
            </motion.nav>

            <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
              <div>
                <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05, duration: 0.35 }}>
                  <span className="badge mb-4 inline-flex">✦ Support & Inquiries</span>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex items-center md:gap-5 gap-2 mb-5">
                  <div className="aspect-square px-3 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl glass"
                    style={{ background: "#fff", border: "1px solid var(--color-border)" }}>
                    <div className="h-full bg-slate-50 flex shrink-0 items-center justify-center p-3">
                      <FiMapPin size={18} className="text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: "var(--color-text-primary)" }}>
                      We're Here to <span className="gradient-text">Help You.</span>
                    </h1>
                  </div>
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.45 }}
                  className="text-sm sm:text-base leading-relaxed max-w-2xl text-slate-600">
                  Have a question or need to schedule an urgent inspection? Reach out via the form below or talk to Alex for instant scheduling and support.
                </motion.p>
              </div>

              {/* CTA card - Premium Glass */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.5 }}
                className="rounded-3xl p-8 min-w-[280px] relative z-10 glass"
                style={{ border: "1px solid var(--glass-border)" }}>
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center bg-amber-500 text-white shadow-lg animate-bounce duration-3000">
                  <FiMessageCircle size={20} />
                </div>
                <p className="text-sm font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>Need answers fast?</p>
                <p className="text-xs mb-6 text-slate-500">Skip the wait and chat with Alex now.</p>
                <Link href="/">
                  <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="btn-primary w-full justify-center flex items-center gap-2 py-3.5 shadow-xl">
                    Talk to Alex
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Contact Info Cards ── */}
        <section className="px-5 py-12">
          <div className="max-container grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((c, i) => (
              <FadeIn key={c.label} delay={i * 0.07}>
                {c.href ? (
                  <a href={c.href} className="card p-5 flex items-start gap-4 h-full hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sky-500 shrink-0"
                      style={{ background: "rgba(14,165,233,0.1)" }}>
                      <c.Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--color-accent)" }}>{c.label}</p>
                      <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{c.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="card p-5 flex items-start gap-4 h-full">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sky-500 shrink-0"
                      style={{ background: "rgba(14,165,233,0.1)" }}>
                      <c.Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--color-accent)" }}>{c.label}</p>
                      <p className="text-sm font-semibold whitespace-pre-line" style={{ color: "var(--color-text-primary)" }}>{c.value}</p>
                    </div>
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Form + FAQ ── */}
        <section className="section-padding px-5" style={{ background: "var(--color-surface)" }}>
          <div className="max-container grid md:grid-cols-[1.2fr_1fr] gap-12">
            {/* Contact Form */}
            <FadeIn>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-primary)" }}>Send Us a Message</h2>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl p-12 text-center h-80 flex flex-col items-center justify-center"
                  style={{ background: "var(--color-bg)", border: "2px solid rgba(14,165,233,0.2)" }}>
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-4">
                    <FiClock size={28} />
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: "var(--color-text-primary)" }}>Message Sent!</h3>
                  <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" }); }}
                    className="mt-6 btn-outline text-sm">Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-muted)" }}>Full Name *</label>
                      <input name="name" type="text" value={formData.name} onChange={handleChange} required
                        placeholder="John Smith" className="form-input" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-muted)" }}>Email Address *</label>
                      <input name="email" type="email" value={formData.email} onChange={handleChange} required
                        placeholder="john@example.com" className="form-input" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-muted)" }}>Phone Number</label>
                      <input name="phone" type="tel" value={formData.phone} onChange={handleChange}
                        placeholder="+1 (555) 000-0000" className="form-input" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-muted)" }}>Subject</label>
                      <select name="subject" value={formData.subject} onChange={handleChange} className="form-input cursor-pointer">
                        <option>General Inquiry</option>
                        <option>Schedule Inspection</option>
                        <option>Report Question</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-muted)" }}>Message *</label>
                    <textarea name="message" rows={5} value={formData.message} onChange={handleChange} required
                      placeholder="How can we help you today?" className="form-input resize-none" />
                  </div>
                  <motion.button type="submit" whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                    className="btn-primary w-full justify-center text-sm">
                    Send Message →
                  </motion.button>
                </form>
              )}
            </FadeIn>

            {/* FAQ */}
            <FadeIn delay={0.12}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-primary)" }}>Frequently Asked</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="card overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
                    >
                      <span className="text-sm font-semibold pr-4" style={{ color: "var(--color-text-primary)" }}>{faq.q}</span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0"
                        style={{ color: "var(--color-accent)" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                      </motion.span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{faq.a}</p>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* AI Fallback */}
              <div className="mt-6 rounded-2xl p-5" style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)" }}>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>💬 Can't find your answer?</p>
                <p className="text-xs mb-3" style={{ color: "var(--color-text-muted)" }}>Our AI assistant can answer questions and book your inspection instantly.</p>
                <Link href="/"><button className="btn-primary text-xs px-4 py-2">Chat with Alex →</button></Link>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
      <SiteFooter />
    </>
  );
}
