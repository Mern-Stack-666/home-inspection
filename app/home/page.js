"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import {
  FiHome, FiTool, FiZap, FiHardDrive,
  FiCheckCircle, FiBriefcase, FiShield, FiPhone,
  FiStar, FiArrowRight, FiLoader,
} from "react-icons/fi";
import SiteFooter from "@/components/SiteFooter";
import SiteNavbar from "@/components/SiteNavbar";

// Map slug to react-icon component
const serviceIconMap = {
  "home-inspection": FiHome,
  "commercial-inspection": FiBriefcase,
  "plumbing-inspection": FiTool,
  "electrical-inspection": FiZap,
  "new-construction-inspection": FiHardDrive,
};

const stats = [
  { value: "5,000+", label: "Inspections Done" },
  { value: "12+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24h", label: "Report Delivery" },
];

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, testimonialsRes] = await Promise.all([
          fetch(`/api/services`),
          fetch(`/api/testimonials`),
        ]);

        if (!servicesRes.ok || !testimonialsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [servicesData, testimonialsData] = await Promise.all([
          servicesRes.json(),
          testimonialsRes.json(),
        ]);

        setServices(servicesData);
        setTestimonials(testimonialsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-(--color-bg)">
        <FiLoader className="animate-spin text-(--color-accent) mb-4" size={40} />
        <p className="text-(--color-text-muted) font-medium">Loading premium experience...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--color-bg) text-rose-500 font-bold">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <SiteNavbar />
      <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>

        {/* ══════════════════════ HERO ══════════════════════ */}
        <section className="relative pt-32 pb-20 px-5 overflow-hidden">
          {/* Background glow — Premium Layering */}
          <div className="absolute top-0 right-0 w-[800px] h-[700px] rounded-full opacity-10 blur-[120px] pointer-events-none"
            style={{ background: "var(--color-accent-2)" }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] pointer-events-none"
            style={{ background: "var(--color-accent)" }} />

          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="max-container grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <FadeIn>
                <span className="badge mb-5 inline-flex">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Trusted by 5,000+ Homeowners
                </span>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
                  style={{ color: "var(--color-text-primary)" }}>
                  Your Home Deserves{" "}
                  <span className="gradient-text">Expert Eyes</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-base sm:text-lg max-w-lg mb-10 leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}>
                  Professional home inspections built around you. Chat with our AI assistant
                  to book in minutes — no forms, no hassle.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link href="/"><button className="btn-primary text-sm">Book an Inspection</button></Link>
                  <Link href="/services"><button className="btn-outline text-sm flex items-center gap-2">Explore Services <FiArrowRight size={14} /></button></Link>
                </div>
              </FadeIn>

              {/* Stats row */}
              <FadeIn delay={0.45}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-2xl sm:text-3xl font-bold gradient-text">{s.value}</div>
                      <div className="text-xs mt-1 font-medium" style={{ color: "var(--color-text-muted)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right — hero image */}
            <FadeIn delay={0.25} className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden aspect-4/3"
                style={{ boxShadow: "0 32px 80px rgba(14,165,233,0.18), 0 8px 24px rgba(0,0,0,0.1)" }}>
                <Image src="/hero-inspection.png" alt="Home inspector examining property" fill className="object-cover" priority />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 card px-5 py-3 flex items-center gap-3 animate-bounce-slow"
                style={{ boxShadow: "var(--shadow-lg)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(34,197,94,0.1)" }}>
                  <FiCheckCircle size={20} color="#22c55e" />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "var(--color-text-primary)" }}>Report Ready</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Within 24 hours</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════ SERVICES ══════════════════════ */}
        <section className="py-14 px-5" style={{ background: "var(--color-surface)" }}>
          <div className="max-container">
            <FadeIn className="text-center mb-14">
              <span className="badge mb-3 inline-flex">Our Services</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2" style={{ color: "var(--color-text-primary)" }}>
                What We <span className="gradient-text">Inspect</span>
              </h2>
              <p className="text-sm mt-3 max-w-md mx-auto" style={{ color: "var(--color-text-muted)" }}>
                5 specialized inspection types — certified pros, modern tools, fast turnaround.
              </p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((svc, i) => {
                const Icon = serviceIconMap[svc.slug] || FiHome;
                return (
                  <FadeIn key={svc.slug} delay={i * 0.07}>
                    <Link href={`/services/${svc.slug}`}>
                      <div className="card p-7 h-full cursor-pointer relative overflow-hidden group/card">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-(--color-accent-2)/20 rounded-bl-full transform translate-x-8 -translate-y-8 transition-transform group-hover/card:translate-x-4 group-hover/card:-translate-y-4" />

                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 glass relative z-10"
                          style={{ border: "1px solid var(--color-border)" }}>
                          <Icon size={24} color={svc.color} />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-base" style={{ color: "var(--color-text-primary)" }}>{svc.title}</h3>
                          {svc.badge && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                              style={{ background: svc.color }}>{svc.badge}</span>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>{svc.shortDesc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold" style={{ color: svc.color }}>{svc.price}</span>
                          <span className="text-xs font-semibold flex items-center gap-1" style={{ color: svc.color }}>
                            Details <FiArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>

            <FadeIn delay={0.3} className="text-center mt-10">
              <Link href="/services">
                <button className="btn-outline text-sm flex items-center gap-2 mx-auto">
                  View All Services <FiArrowRight size={14} />
                </button>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════ ABOUT SPLIT ══════════════════════ */}
        <section className="py-14 px-5">
          <div className="max-container grid md:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <FadeIn>
              <div className="relative rounded-3xl overflow-hidden aspect-4/3"
                style={{ boxShadow: "var(--shadow-lg)" }}>
                <Image src="/inspection-report.png" alt="Inspector reviewing report with client" fill className="object-cover" />
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <span className="badge mb-4 inline-flex">About HomeInspect</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: "var(--color-text-primary)" }}>
                Built on <span className="gradient-text">Trust & Expertise</span>
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>
                With over 12 years in the field and 5,000+ inspections, our ASHI/InterNACHI-certified
                inspectors deliver precision and professionalism every time.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--color-text-muted)" }}>
                We use thermal imaging, drone technology, and AI-assisted scheduling to give you
                a clear picture — in writing — within 24 hours of every inspection.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { Icon: FiBriefcase, title: "Certified Inspectors", desc: "ASHI & InterNACHI" },
                  { Icon: FiCheckCircle, title: "Detailed Reports", desc: "PDF in 24 hours" },
                  { Icon: FiShield, title: "Fully Insured", desc: "Bonded & covered" },
                  { Icon: FiPhone, title: "Post-Inspection Support", desc: "Free 30-min call" },
                ].map(({ Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(14,165,233,0.1)" }}>
                      <Icon size={15} color="#0ea5e9" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>{title}</p>
                      <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/about"><button className="btn-primary text-sm">Learn About Us</button></Link>
                <Link href="/contact"><button className="btn-outline text-sm">Contact Us</button></Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════ INSPECTION GALLERY ══════════════════════ */}
        <section className="py-14 px-5" style={{ background: "var(--color-surface)" }}>
          <div className="max-container">
            <FadeIn className="text-center mb-12">
              <span className="badge mb-3 inline-flex">Our Work</span>
              <h2 className="text-3xl font-bold mt-2" style={{ color: "var(--color-text-primary)" }}>
                Inspections Done <span className="gradient-text">Right</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="grid sm:grid-cols-3 gap-5">
                <div className="relative rounded-2xl overflow-hidden aspect-4/3" style={{ boxShadow: "var(--shadow-sm)" }}>
                  <Image src="/hero-inspection.png" alt="Residential home inspection" fill className="object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end p-4">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <FiHome size={13} color="#fff" />
                        <span className="text-white text-xs font-bold">Home Inspection</span>
                      </div>
                      <p className="text-white/70 text-xs">Residential property — 3 bed, 2 bath</p>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-4/3" style={{ boxShadow: "var(--shadow-sm)" }}>
                  <Image src="/electrical-inspection.png" alt="Electrical system inspection" fill className="object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end p-4">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <FiZap size={13} color="#fff" />
                        <span className="text-white text-xs font-bold">Electrical Check</span>
                      </div>
                      <p className="text-white/70 text-xs">Panel & circuit inspection</p>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-4/3" style={{ boxShadow: "var(--shadow-sm)" }}>
                  <Image src="/commercial-inspection.png" alt="Commercial property inspection" fill className="object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end p-4">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <FiBriefcase size={13} color="#fff" />
                        <span className="text-white text-xs font-bold">Commercial</span>
                      </div>
                      <p className="text-white/70 text-xs">Office complex — full compliance audit</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════ TESTIMONIALS ══════════════════════ */}
        <section className="pt-14 pb-6 px-5">
          <div className="max-container">
            <FadeIn className="text-center mb-12">
              <span className="badge mb-3 inline-flex">Testimonials</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2" style={{ color: "var(--color-text-primary)" }}>
                What Clients <span className="gradient-text">Say</span>
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <FadeIn key={t.name} delay={i * 0.1}>
                  <div className="card p-6 h-full flex flex-col">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, si) => (
                        <FiStar key={si} size={14} fill="#facc15" color="#facc15" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-text-secondary)" }}>"{t.text}"</p>
                    <div className="flex items-center gap-3 mt-5 pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: "var(--color-accent-2)" }}>
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{t.name}</p>
                        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ CTA BANNER ══════════════════════ */}
        <section className="py-14 px-5">
          <div className="max-container">
            <FadeIn>
              <div className="rounded-[2.5rem] px-8 py-16 text-center relative overflow-hidden glass"
                style={{ border: "1px solid var(--glass-border)", boxShadow: "var(--shadow-lg)" }}>
                {/* Animated background particles */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle, var(--color-accent-2) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>
                    Ready to Get <span className="gradient-text">Started?</span>
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base mb-10 max-w-lg mx-auto leading-relaxed">
                    Experience the future of property inspections. Chat with Alex to schedule your visit in under two minutes — no forms, no friction.
                  </p>
                  <Link href="/">
                    <button className="btn-primary px-10 py-4 text-base shadow-2xl hover:-translate-y-1 active:scale-95 transition-all">
                      Chat with Alex Now
                    </button>
                  </Link>
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
