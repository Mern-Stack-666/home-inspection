"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import { services, getServiceBySlug } from "@/lib/services";
import { FiHome, FiCheckCircle, FiBriefcase, FiTool, FiZap, FiHardDrive, FiCalendar } from "react-icons/fi";

const serviceIconMap = {
  "home-inspection": FiHome,
  "commercial-inspection": FiBriefcase,
  "plumbing-inspection": FiTool,
  "electrical-inspection": FiZap,
  "new-construction-inspection": FiHardDrive,
};

export default function ServiceSlugPage({ params }) {
  // In Next.js 16 App Router params is a Promise
  const { slug } = use(params);
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>

      {/* ── Breadcrumb + Hero ── */}
      <section className="relative pt-28 pb-10 px-5 overflow-hidden"
        style={{ background: service.bg, borderBottom: `1px solid ${service.border}` }}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="max-container relative">
          {/* Breadcrumb */}
          <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }} className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--color-text-muted)" }}>
            <Link href="/home" className="hover:text-sky-500 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/services" className="hover:text-sky-500 transition-colors">Services</Link>
            <span>›</span>
            <span style={{ color: service.color }}>{service.title}</span>
          </motion.nav>

          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              {service.badge && (
                <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05, duration: 0.35 }}>
                  <span className="inline-flex items-center text-xs font-bold px-3 py-1 rounded-full mb-4"
                    style={{ background: service.color, color: "#fff" }}>
                    ✦ {service.badge}
                  </span>
                </motion.div>
              )}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
                className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-3xl"
                  style={{ background: "#fff", border: `1px solid ${service.border}`, boxShadow: "var(--shadow-sm)" }}>
                  {(() => {
                    const Icon = serviceIconMap[service.slug] || FiHome;
                    return <Icon size={28} color={service.color} />;
                  })()}
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--color-text-primary)" }}>{service.title}</h1>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-base font-bold" style={{ color: service.color }}>{service.price}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                      style={{ background: "rgba(0,0,0,0.06)", color: "var(--color-text-muted)" }}>⏱ {service.duration}</span>
                  </div>
                </div>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.45 }}
                className="text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
                {service.description}
              </motion.p>
            </div>

            {/* CTA card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.45 }}
              className="rounded-2xl p-6 min-w-[220px]"
              style={{ background: "#fff", border: `1px solid ${service.border}`, boxShadow: "var(--shadow-md)" }}>
              <p className="text-sm font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>Ready to book?</p>
              <p className="text-xs mb-4" style={{ color: "var(--color-text-muted)" }}>Our AI assistant schedules it in 2 minutes.</p>
              <Link href="/">
                <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }} className="btn-primary w-full justify-center flex items-center gap-2 text-sm">
                  <FiCalendar size={14} /> Book Now
                </motion.button>
              </Link>
              <Link href="/contact">
                <button className="btn-outline w-full justify-center text-sm mt-2">Ask a Question</button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-14 px-5">
        <div className="max-container">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-12">
            {/* Included list */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-primary)" }}>
                What's <span className="gradient-text">Included</span>
              </h2>
              <div className="grid gap-3">
                {service.includes.map((item, i) => (
                  <motion.div key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.35 }}
                    className="flex items-center gap-3 p-4 rounded-2xl card"
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                      style={{ background: service.color }}>✓</div>
                    <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Process + FAQ */}
            <div className="space-y-6">
              {/* Our process */}
              <div className="card p-6">
                <h3 className="font-bold text-base mb-4" style={{ color: "var(--color-text-primary)" }}>How It Works</h3>
                <div className="space-y-4">
                  {[
                    { step: "01", title: "Book via AI Chat", desc: "Schedule in 2 minutes with Alex, our AI assistant. No forms." },
                    { step: "02", title: "We Show Up On Time", desc: "Our certified inspector arrives at your property ready to work." },
                    { step: "03", title: "Thorough Inspection", desc: "Every system and component checked against our 300+ point checklist." },
                    { step: "04", title: "Report in 24 Hours", desc: "Receive a detailed photo-rich PDF report via email." },
                  ].map((p) => (
                    <div key={p.step} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: service.color }}>
                        {p.step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{p.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee */}
              <div className="rounded-2xl p-5"
                style={{ background: `${service.color}10`, border: `1px solid ${service.border}` }}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1 text-sky-500"><FiCheckCircle size={24} /></span>
                  <div>
                    <p className="text-sm font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>Our Guarantee</p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                      If you're not 100% satisfied with your report, we'll revisit the property at no charge.
                      Every inspection is also backed by our $1M professional liability insurance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Services ── */}
      <section className="py-14 px-5" style={{ background: "var(--color-surface)" }}>
        <div className="max-container">
          <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--color-text-primary)" }}>
            Other <span className="gradient-text">Services</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {others.map((svc) => (
              <Link key={svc.slug} href={`/services/${svc.slug}`}>
                <motion.div whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }} className="card p-5 cursor-pointer h-full">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 text-xl"
                    style={{ background: svc.bg }}>
                    {(() => {
                      const Icon = serviceIconMap[svc.slug] || FiHome;
                      return <Icon size={20} color={svc.color} />;
                    })()}
                  </div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: "var(--color-text-primary)" }}>{svc.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{svc.shortDesc}</p>
                  <div className="mt-3 text-xs font-bold" style={{ color: svc.color }}>Learn more →</div>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/services"><button className="btn-outline text-sm">View All Services</button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
