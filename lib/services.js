/**
 * Central services data — used by home page, services list, slug pages, and navbar.
 * Add/edit services here and all pages update automatically.
 */
export const services = [
  {
    slug: "home-inspection",
    icon: "🏠",
    title: "Home Inspection",
    shortDesc: "Head-to-toe evaluation of structure, HVAC, plumbing & electrical.",
    color: "#0ea5e9",
    bg: "#eff6ff",
    border: "rgba(14,165,233,0.15)",
    price: "From $349",
    duration: "2–3 hours",
    description:
      "Our most popular service — a comprehensive evaluation of your entire property. Perfect for buyers, sellers, and homeowners wanting peace of mind. We examine hundreds of components from foundation to rooftop using industry-leading tools and certified inspectors.",
    includes: [
      "Foundation & Structural Components",
      "Roof, Attic & Ventilation",
      "HVAC Systems (Heating & Cooling)",
      "Plumbing Supply & Drainage",
      "Electrical Panels & Wiring",
      "Windows, Doors & Insulation",
      "Garage, Driveway & Exterior",
      "Crawl Space & Basement",
    ],
    badge: "Most Popular",
  },
  {
    slug: "commercial-inspection",
    icon: "🏢",
    title: "Commercial Inspection",
    shortDesc: "Full compliance & structural assessment for offices, retail & warehouses.",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "rgba(139,92,246,0.15)",
    price: "From $699",
    duration: "3–6 hours",
    description:
      "Tailored for offices, retail units, warehouses, multi-unit residential buildings, and mixed-use properties. Our commercial inspection covers every system against current building codes, giving investors and business owners the confidence they need before closing.",
    includes: [
      "Building Code Compliance Review",
      "Structural & Foundation Assessment",
      "Fire Safety & Suppression Systems",
      "HVAC & Mechanical Infrastructure",
      "Electrical & Data Infrastructure",
      "Plumbing & Sewer Systems",
      "ADA Accessibility Review",
      "Roof & Building Envelope",
    ],
    badge: null,
  },
  {
    slug: "plumbing-inspection",
    icon: "🔧",
    title: "Plumbing Inspection",
    shortDesc: "Full review of pipes, drains, fixtures, water heaters & leak points.",
    color: "#14b8a6",
    bg: "#f0fdf4",
    border: "rgba(20,184,166,0.15)",
    price: "From $199",
    duration: "1–2 hours",
    description:
      "A dedicated deep-dive into your entire plumbing system. Our licensed plumbing specialists check every supply line, drain, vent, fixture, and appliance connection — catching issues before they become expensive emergencies.",
    includes: [
      "Water Supply Line Inspection",
      "Drain, Waste & Vent Systems",
      "Water Heater & Boiler Assessment",
      "Fixture & Faucet Testing",
      "Water Pressure & Flow Analysis",
      "Leak Detection (Visible & Hidden)",
      "Sewer Lateral Camera Inspection",
      "Code Violation Check",
    ],
    badge: null,
  },
  {
    slug: "electrical-inspection",
    icon: "⚡",
    title: "Electrical Inspection",
    shortDesc: "Expert audit of panels, wiring, outlets & safety devices.",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "rgba(245,158,11,0.15)",
    price: "From $249",
    duration: "1–2 hours",
    description:
      "Safety starts with a sound electrical system. Our master electricians perform a full audit from the service entrance to each individual circuit — identifying hazards, outdated wiring, overloaded panels, and code violations before they become critical.",
    includes: [
      "Service Entry & Meter Inspection",
      "Main & Sub-Panel Assessment",
      "Branch Circuit Analysis",
      "Outlet, Switch & Fixture Testing",
      "GFCI & AFCI Device Verification",
      "Smoke & CO Detector Check",
      "Grounding & Bonding Systems",
      "NEC Code Compliance Audit",
    ],
    badge: null,
  },
  {
    slug: "new-construction-inspection",
    icon: "🏗️",
    title: "New Construction Inspection",
    shortDesc: "Phase-by-phase inspection to catch issues before walls are closed.",
    color: "#ef4444",
    bg: "#fef2f2",
    border: "rgba(239,68,68,0.15)",
    price: "From $449",
    duration: "2–4 hours",
    description:
      "Building a new home? Don't rely solely on your builder's team. Our independent new construction inspections catch code violations, workmanship deficiencies, and material issues at key build phases — when they're still easy and inexpensive to fix.",
    includes: [
      "Pre-Pour Foundation Inspection",
      "Framing & Rough-In Inspection",
      "Pre-Drywall Systems Review",
      "Final Pre-Closing Walkthrough",
      "Builder's Warranty Inspection",
      "Punch List Documentation",
      "Energy Efficiency Review",
      "11-Month Builder Warranty Check",
    ],
    badge: "New",
  },
];

/** Get a single service by slug */
export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug) || null;
}
