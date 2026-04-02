"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiBriefcase, FiMail, FiPhone, FiMapPin, FiTwitter, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { services } from "@/lib/services";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden"
      style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-border)" }}>

      {/* Background radial glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[100px] pointer-events-none"
        style={{ background: "var(--color-accent-2)" }} />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.02] blur-[80px] pointer-events-none"
        style={{ background: "var(--color-accent)" }} />

      <div className="max-container px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href="/home" className="flex items-center gap-2.5 group">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-base transition-transform duration-200 group-hover:scale-110"
                style={{ background: "var(--color-accent-2)", boxShadow: "0 4px 12px rgba(30,58,138,0.2)" }}
              >
                <FiBriefcase size={18} color="#fff" />
              </div>
              <span className="font-bold text-xl tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                HomeInspect<span className="text-amber-500">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
              Professional, certified property inspections delivered with precision and care. Empowering homeowners since 2012.
            </p>
            <div className="flex gap-4">
              {[FiTwitter, FiFacebook, FiInstagram, FiLinkedin].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ y: -3, color: "var(--color-accent-2)" }}
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6" style={{ color: "var(--color-text-primary)" }}>Services</h4>
            <ul className="space-y-4">
              {services.map((svc) => (
                <li key={svc.slug}>
                  <Link href={`/services/${svc.slug}`} className="text-sm text-slate-500 hover:text-blue-900 transition-colors">
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6" style={{ color: "var(--color-text-primary)" }}>Company</h4>
            <ul className="space-y-4">
              {["Home", "Services", "About Us", "Contact Us", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link href={item.toLowerCase().includes("privacy") || item.toLowerCase().includes("terms") ? "#" : `/${item.toLowerCase().replace(" ", "-").replace("us", "")}`}
                    className="text-sm text-slate-500 hover:text-blue-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6" style={{ color: "var(--color-text-primary)" }}>Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-slate-500">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-800 shrink-0">
                  <FiPhone size={14} />
                </div>
                (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-800 shrink-0">
                  <FiMail size={14} />
                </div>
                hello@homeinspect.ai
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-800 shrink-0 mt-0.5">
                  <FiMapPin size={14} />
                </div>
                123 Inspector Ave, Suite 100<br />Modern City, MC 90210
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--color-border)" }}>
          <p className="text-xs text-slate-400">
            © {currentYear} HomeInspect AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[10px] font-bold text-blue-900/40 uppercase tracking-widest flex items-center gap-2">
              <FiBriefcase size={10} /> Certified ASHI & InterNACHI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
