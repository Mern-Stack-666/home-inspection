"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiHome, FiSearch, FiShield, FiClock, FiMessageSquare, FiMessageCircle, FiBriefcase, FiCalendar } from "react-icons/fi";
import SiteFooter from "@/components/SiteFooter";
import SiteNavbar from "@/components/SiteNavbar";

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

const team = [
  { name: "Marcus Reid", role: "Lead Inspector / Founder", initials: "MR", color: "#0ea5e9", years: "15 yrs", certs: "ASHI, InterNACHI" },
  { name: "Priya Kapoor", role: "Senior Commercial Inspector", initials: "PK", color: "#14b8a6", years: "10 yrs", certs: "InterNACHI, ICC" },
  { name: "James Liu", role: "Electrical Specialist", initials: "JL", color: "#8b5cf6", years: "12 yrs", certs: "NFPA, Licensed Master Electrician" },
  { name: "Sofia Torres", role: "Plumbing Specialist", initials: "ST", color: "#f59e0b", years: "9 yrs", certs: "Licensed Master Plumber" },
];

const milestones = [
  { year: "2012", event: "Founded by Marcus Reid with a single-truck operation serving 3 counties." },
  { year: "2015", event: "Expanded team to 8 inspectors. Launched digital report delivery." },
  { year: "2018", event: "Added drone inspections and thermal imaging to our process." },
  { year: "2022", event: "Crossed 4,000 inspections. Opened 2nd regional office." },
  { year: "2026", event: "Launched AI-powered booking assistant for instant, conversational scheduling." },
];

const values = [
  { Icon: FiSearch, title: "Thoroughness", desc: "We leave no corner unchecked. Every report covers hundreds of checkpoints." },
  { Icon: FiShield, title: "Integrity", desc: "Honest findings, every time. We work for you — not the seller or agent." },
  { Icon: FiClock, title: "Speed", desc: "Reports delivered within 24 hours without ever sacrificing quality." },
  { Icon: FiMessageSquare, title: "Transparency", desc: "We explain every finding in plain language — before, during, and after." },
];

export default function AboutPage() {
  return (
    <>
      <SiteNavbar />
      <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>

        {/* ── Breadcrumb + Hero ── */}
        <section className="relative pt-24 sm:pt-32 pb-14 px-5 overflow-hidden"
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
              <span style={{ color: "var(--color-text-primary)" }}>About Us</span>
            </motion.nav>

            <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
              <div>
                <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05, duration: 0.35 }}>
                  <span className="badge mb-4 inline-flex">✦ Our Story & Mission</span>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex items-center md:gap-5 gap-2 mb-5">
                  <div className="aspect-square px-3 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl glass"
                    style={{ background: "#fff", border: "1px solid var(--color-border)" }}>
                    <FiBriefcase size={28} className="text-blue-900" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight" style={{ color: "var(--color-text-primary)" }}>
                      Inspecting with <span className="gradient-text">Heart & Precision.</span>
                    </h1>
                  </div>
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.45 }}
                  className="text-sm sm:text-base leading-relaxed max-w-2xl text-slate-600 mb-8 md:mb-0">
                  Since 2012, HomeInspect has been the region's most trusted name in property evaluation. We combine decades of building experience with modern AI tools to empower every client.
                </motion.p>
              </div>

              {/* CTA card - Premium Glass */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.5 }}
                className="rounded-3xl p-6 sm:p-8 w-full md:min-w-[300px] relative z-10 glass"
                style={{ border: "1px solid var(--glass-border)" }}>
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center bg-amber-500 text-white shadow-lg animate-bounce duration-3000">
                  <FiClock size={20} />
                </div>
                <p className="text-sm font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>Work with us</p>
                <p className="text-xs mb-6 text-slate-500">Schedule an inspection today.</p>
                <Link href="/">
                  <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="btn-primary w-full justify-center flex items-center gap-2 py-3.5 shadow-xl">
                    Book an Inspection
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Stats Banner ── */}
        <section className="px-5 pt-12 pb-14">
          <div className="max-container">
            <FadeIn>
              <div className="rounded-3xl px-6 sm:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
                {[
                  { value: "5,000+", label: "Inspections Completed" },
                  { value: "12+", label: "Years in Business" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "4", label: "Specialist Inspectors" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold gradient-text">{s.value}</div>
                    <div className="text-xs mt-1 font-medium" style={{ color: "var(--color-text-muted)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Story ── */}
        <section className="section-padding" style={{ background: "var(--color-surface)" }}>
          <div className="max-container grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="badge mb-4 inline-flex">Our Story</span>
              <h2 className="text-3xl font-bold mb-5" style={{ color: "var(--color-text-primary)" }}>
                From a Single Truck to <span className="gradient-text">5,000 Inspections</span>
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>
                HomeInspect was founded in 2012 by Marcus Reid after a decade working as a licensed
                contractor. Frustrated by vague, rushed inspection reports, he set out to build an
                inspection company that put clarity and client empowerment first.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                Today, our team of four certified specialists uses cutting-edge technology —
                thermal imaging, drone surveys, and AI-assisted scheduling — to deliver the
                most thorough property evaluations in the region.
              </p>
            </FadeIn>

            {/* Timeline */}
            <FadeIn delay={0.12}>
              <div className="relative pl-8">
                <div className="absolute left-3 top-0 bottom-0 w-px" style={{ background: "var(--color-accent-2)" }} />
                <div className="space-y-6">
                  {milestones.map((m, i) => (
                    <motion.div key={m.year} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="relative">
                      <div className="absolute -left-[33px] w-3 h-3 rounded-full border-2 border-white"
                        style={{ background: "var(--color-accent)", boxShadow: "0 0 0 3px rgba(14,165,233,0.2)" }} />
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }}>{m.year}</span>
                        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{m.event}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="section-padding">
          <div className="max-container">
            <FadeIn className="text-center mb-12">
              <span className="badge mb-3 inline-flex">Our Values</span>
              <h2 className="text-3xl font-bold mt-2" style={{ color: "var(--color-text-primary)" }}>
                The Principles We <span className="gradient-text">Inspect By</span>
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v, i) => (
                <FadeIn key={v.title} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -4 }} className="card p-6 text-center h-full">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center shrink-0 text-sky-500">
                      <v.Icon size={24} />
                    </div>
                    <h3 className="font-bold text-sm mb-2" style={{ color: "var(--color-text-primary)" }}>{v.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{v.desc}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="section-padding" style={{ background: "var(--color-surface)" }}>
          <div className="max-container">
            <FadeIn className="text-center mb-12">
              <span className="badge mb-3 inline-flex">Our Team</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-8" style={{ color: "var(--color-text-primary)" }}>
                Meet the <span className="gradient-text">Experts</span>
              </h2>
              <div className="relative w-full aspect-video md:aspect-21/9 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 mb-10">
                <Image src="/about-team.png" alt="The HomeInspect Team" fill className="object-cover" />
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <FadeIn key={member.name} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -4 }} className="card p-6 text-center h-full">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white mx-auto mb-4"
                      style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}99)` }}>
                      {member.initials}
                    </div>
                    <h3 className="font-bold text-sm" style={{ color: "var(--color-text-primary)" }}>{member.name}</h3>
                    <p className="text-xs mt-1 mb-3" style={{ color: "var(--color-text-muted)" }}>{member.role}</p>
                    <div className="space-y-1.5">
                      <div className="text-xs px-3 py-1 rounded-full inline-block" style={{ background: `${member.color}15`, color: member.color }}>
                        {member.years} experience
                      </div>
                      <p className="text-xs" style={{ color: "var(--color-text-light)" }}>{member.certs}</p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-padding px-5">
          <div className="max-container">
            <FadeIn>
              <div className="rounded-3xl px-8 py-14 text-center"
                style={{ background: "var(--color-accent-2)", boxShadow: "0 20px 60px rgba(30,58,138,0.3)" }}>
                <h2 className="text-3xl font-bold text-white mb-3">Work With Us</h2>
                <p className="text-white/80 text-sm mb-8 max-w-md mx-auto">
                  Ready to book an inspection or have questions? Our AI assistant is available
                  24/7 to help you get started instantly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/"><button className="bg-white text-blue-900 font-bold text-sm px-8 py-3 w-full rounded-full cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-center gap-2"><FiMessageCircle size={16} /> Book via AI Chat</button></Link>
                  <Link href="/contact"><button className="border-2 border-white/50 text-white font-semibold w-full text-sm px-8 py-3 rounded-full cursor-pointer hover:bg-white/10 transition-colors">Contact Us →</button></Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
      <SiteFooter />
    </>
  );
}
