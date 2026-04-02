"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { FiHome, FiBriefcase, FiTool, FiZap, FiHardDrive } from "react-icons/fi";

// Internal mapping for default icons
const serviceIconMap = {
  "home-inspection": <FiHome size={18} />,
  "commercial-inspection": <FiBriefcase size={18} />,
  "plumbing-inspection": <FiTool size={18} />,
  "electrical-inspection": <FiZap size={18} />,
  "new-construction-inspection": <FiHardDrive size={18} />,
};

const navLinks = [
  { label: "Home", href: "/home" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function SiteNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [dynamicServices, setDynamicServices] = useState([]);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          const mapped = data.map(s => ({
            _id: s._id,
            icon: serviceIconMap[s.slug] || <FiHome size={18} />,
            label: s.title,
            href: `/services/${s.slug}`,
            desc: s.shortDesc,
            color: s.color,
            bg: s.bg
          }));
          setDynamicServices(mapped);
        }
      } catch (err) {
        console.error("SiteNavbar services fetch failed:", err);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href) =>
    href === "/home" ? pathname === "/home" : pathname.startsWith(href);

  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const cols = Math.ceil(dynamicServices.length / 5) || 1;
  const panelWidth = Math.max(340, cols * 300);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.8)"
          : "rgba(255,255,255,0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.5)" : "1px solid transparent",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      }}
    >
      <div className="max-container px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base transition-transform duration-200 group-hover:scale-105"
            style={{ background: "var(--color-accent-2)", boxShadow: "0 4px 12px rgba(30,58,138,0.25)" }}
          >
            <FiBriefcase size={18} color="#fff" />
          </div>
          <span className="font-bold text-base" style={{ color: "var(--color-text-primary)" }}>
            HomeInspect
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer"
                  style={{
                    color: isActive(link.href) ? "var(--color-accent-2)" : "var(--color-text-secondary)",
                    background: isActive(link.href) ? "rgba(30,58,138,0.06)" : "transparent",
                  }}
                >
                  {link.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{
                      transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown Panel */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full left-1/2 pt-2"
                      style={{ transform: "translateX(-50%)", width: `${panelWidth}px` }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div
                        className="rounded-2xl p-2"
                        style={{
                          background: "var(--color-bg)",
                          // backdropFilter: "blur(16px)",
                          // WebkitBackdropFilter: "blur(16px)",
                          border: "1px solid var(--glass-border)",
                          boxShadow: "var(--shadow-lg)",
                        }}
                      >
                        <div
                          className="rounded-xl p-3 mb-2 flex items-center justify-between"
                          style={{ background: "rgba(30,58,138,0.05)", border: "1px solid rgba(30,58,138,0.1)" }}
                        >
                          <div>
                            <p className="text-xs font-bold" style={{ color: "var(--color-text-primary)" }}>All Inspection Services</p>
                            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>Professional &amp; certified</p>
                          </div>
                          <Link
                            href="/services"
                            onClick={() => setDropdownOpen(false)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-full"
                            style={{ background: "var(--color-accent)", color: "#fff" }}
                          >
                            View All →
                          </Link>
                        </div>

                        {/* Service links grid */}
                        <div 
                          className="grid gap-1"
                          style={{ 
                            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` 
                          }}
                        >
                          {dynamicServices.map((svc) => (
                            <Link
                              key={svc._id}
                            href={svc.href}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl group/item transition-all duration-200 hover:bg-(--color-accent-2)"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            <span
                              className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 transition-colors group-hover/item:bg-white/20"
                              style={{ background: svc.bg || "var(--color-surface-2)" }}
                            >
                              <div style={{ color: svc.color || "inherit" }}>
                                {svc.icon}
                              </div>
                            </span>
                            <div className="group-hover/item:text-white transition-colors">
                              <p className="text-sm font-semibold leading-tight">{svc.label}</p>
                              <p className="text-xs mt-0.5 opacity-80" style={{ color: "inherit" }}>{svc.desc}</p>
                            </div>
                          </Link>
                        ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: isActive(link.href) ? "var(--color-accent-2)" : "var(--color-text-secondary)",
                  background: isActive(link.href) ? "rgba(30,58,138,0.06)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) e.currentTarget.style.background = "var(--color-surface-2)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-sm"
            >
              <span className="flex items-center gap-2"><FiBriefcase size={14} /> Book Inspection</span>
            </motion.button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex flex-col items-center justify-center w-9 h-9 gap-1.5 rounded-xl cursor-pointer transition-colors"
          style={{ background: mobileOpen ? "var(--color-surface-2)" : "transparent" }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-0.5 rounded-full transition-all duration-200"
              style={{
                width: i === 1 ? (mobileOpen ? "12px" : "18px") : "18px",
                background: "var(--color-text-secondary)",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden md:hidden"
            style={{ background: "#fff", borderTop: "1px solid var(--color-border)" }}
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {link.label}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-3 space-y-1 mt-1"
                        >
                          {dynamicServices.map((svc) => (
                            <Link
                              key={svc._id}
                              href={svc.href}
                              onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              <span style={{ color: svc.color || "inherit" }}>{svc.icon}</span> {svc.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-sm font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-2">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <button className="btn-primary w-full justify-center flex items-center gap-2"><FiHome size={14} /> Book Inspection</button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
