import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { FiHome, FiCheckCircle, FiShield, FiMessageSquare, FiBriefcase, FiTool, FiZap, FiHardDrive, FiCalendar } from "react-icons/fi";
import SiteFooter from "@/components/SiteFooter";
import SiteNavbar from "@/components/SiteNavbar";
const serviceIconMap = {
  "home-inspection": FiHome,
  "commercial-inspection": FiBriefcase,
  "plumbing-inspection": FiTool,
  "electrical-inspection": FiZap,
  "new-construction-inspection": FiHardDrive,
};

// Removed inline FadeIn since we import the global one

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const envUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const base = envUrl.includes("localhost") ? envUrl.replace("https://", "http://") : envUrl;
  const services = await fetch(`${base}/api/services`, { cache: "no-store" }).then((r) => r.json());

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
            <FadeIn>
              <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--color-text-muted)" }}>
                <Link href="/home" className="hover:text-blue-600 transition-colors">Home</Link>
                <span>›</span>
                <span style={{ color: "var(--color-text-primary)" }}>Our Services</span>
              </nav>
            </FadeIn>

            <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
              <div>
                <FadeIn delay={0.05}>
                  <span className="badge mb-4 inline-flex">✦ Certified Services</span>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <div className="flex items-center md:gap-5 gap-2 mb-5">
                    <div className="aspect-square px-3 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl glass"
                      style={{ background: "#fff", border: "1px solid var(--color-border)" }}>
                      <FiBriefcase size={28} className="text-blue-900" />
                    </div>
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: "var(--color-text-primary)" }}>
                        Expert Inspections,<br /><span className="gradient-text">Complete Confidence.</span>
                      </h1>
                    </div>
                  </div>
                </FadeIn>
                <FadeIn delay={0.18}>
                  <p className="text-sm sm:text-base leading-relaxed max-w-2xl text-slate-600">
                    Five specialized inspection types delivered by certified professionals using state-of-the-art diagnostic tools. Same-day scheduling and 24-hour report delivery.
                  </p>
                </FadeIn>
              </div>

              {/* CTA card - Premium Glass */}
              <FadeIn delay={0.25}>
                <div className="rounded-3xl p-8 min-w-[280px] relative z-10 glass"
                  style={{ border: "1px solid var(--glass-border)" }}>
                  <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center bg-amber-500 text-white shadow-lg animate-bounce duration-3000">
                    <FiCalendar size={20} />
                  </div>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>Ready to book?</p>
                  <p className="text-xs mb-6 text-slate-500">Alex can have you scheduled in under 2 minutes.</p>
                  <Link href="/">
                    <button className="btn-primary w-full justify-center flex items-center gap-2 py-3.5 shadow-xl hover:-translate-y-1 active:scale-95 transition-all">
                      Inspect My Property
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="w-full text-center text-xs font-bold mt-4 text-slate-400 hover:text-blue-900 transition-colors uppercase tracking-widest">
                      Have Questions?
                    </button>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Banner Image ── */}
        {/* <section className="px-5 pt-8 pb-4">
        <div className="max-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
            className="relative w-full aspect-21/9 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
            <Image src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80" alt="Professional Home Inspection" fill className="object-cover" />
          </motion.div>
        </div>
      </section> */}

        {/* ── All 5 Service Cards ── */}
        <section className="px-5 py-14">
          <div className="max-container space-y-6">
            {services.map((svc, i) => (
              <FadeIn key={svc.slug} delay={i * 0.07}>
                <div className="rounded-3xl overflow-hidden"
                  style={{ border: `1px solid ${svc.border}`, background: "#fff", boxShadow: "var(--shadow-sm)" }}>
                  <div className="grid md:grid-cols-[1fr_300px]">
                    {/* Content column */}
                    <div className="p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shrink-0"
                          style={{ background: svc.bg, border: `1px solid ${svc.border}` }}>
                          {(() => {
                            const Icon = serviceIconMap[svc.slug] || FiHome;
                            return <Icon size={24} color={svc.color} />;
                          })()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-xl font-bold font-display" style={{ color: "var(--color-text-primary)" }}>{svc.title}</h2>
                            {svc.badge && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-md text-white uppercase tracking-tighter"
                                style={{ background: svc.color }}>{svc.badge}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm font-bold" style={{ color: svc.color }}>{svc.price}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: "var(--color-surface-2)", color: "var(--color-text-muted)" }}>⏱ {svc.duration}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed mb-5 max-w-xl" style={{ color: "var(--color-text-secondary)" }}>
                        {svc.description}
                      </p>

                      <div className="flex gap-4 flex-wrap mt-auto">
                        <Link href={`/services/${svc.slug}`}>
                          <button className="text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer transition-all border border-transparent hover:brightness-95 active:scale-95"
                            style={{ background: `${svc.color}18`, color: svc.color }}>
                            Learn More
                          </button>
                        </Link>
                        <Link href="/">
                          <button className="btn-primary text-xs px-8 py-2.5 shadow-lg hover:-translate-y-1 active:scale-95 transition-all">
                            Book Inspection
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* Includes column */}
                    <div className="p-8 border-l" style={{ borderColor: svc.border, background: svc.bg }}>
                      <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: svc.color }}>
                        Key Checks
                      </p>
                      <ul className="space-y-2">
                        {svc.includes.slice(0, 6).map((f) => (
                          <li key={f} className="flex items-center gap-2.5 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                            <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white"
                              style={{ background: svc.color }}>✓</span>
                            {f}
                          </li>
                        ))}
                        {svc.includes.length > 6 && (
                          <li className="text-xs font-semibold mt-1" style={{ color: svc.color }}>
                            +{svc.includes.length - 6} more →
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-14  px-5" style={{ background: "var(--color-surface)" }}>
          <div className="max-container text-center">
            <FadeIn>
              <span className="badge mb-3 inline-flex">Why HomeInspect</span>
              <h2 className="text-3xl font-bold mt-2 mb-12" style={{ color: "var(--color-text-primary)" }}>
                The <span className="gradient-text">Difference</span> You'll Notice
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { Icon: FiCheckCircle, title: "ASHI/InterNACHI Certified", desc: "Top-tier national building standards compliance" },
                { Icon: FiHome, title: "24-Hour Digital Reports", desc: "Interactive PDF reports delivered same-day" },
                { Icon: FiShield, title: "Fully Bonded & Insured", desc: "$1M Professional Liability coverage for peace of mind" },
                { Icon: FiMessageSquare, title: "Instant AI Scheduling", desc: "No phone tags or wait times — just chat and book" },
              ].map((f, i) => (
                <FadeIn key={f.title} delay={i * 0.08}>
                  <div className="card p-8 text-center h-full flex flex-col items-center group/feature">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50/50 flex items-center justify-center mb-5 text-amber-600 transition-transform group-hover/feature:scale-110 duration-300">
                      <f.Icon size={24} />
                    </div>
                    <h3 className="font-bold text-sm mb-2" style={{ color: "var(--color-text-primary)" }}>{f.title}</h3>
                    <p className="text-xs leading-relaxed text-slate-500" style={{ color: "var(--color-text-muted)" }}>{f.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

      </div>
      <SiteFooter />
    </>
  );
}
