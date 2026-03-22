"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  FiHome, FiGrid, FiCalendar, FiMessageSquare,
  FiSettings, FiLogOut, FiMenu, FiX
} from "react-icons/fi";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: FiGrid },
    { label: "Services", href: "/admin/services", icon: FiHome },
    { label: "Bookings", href: "/admin/bookings", icon: FiCalendar },
    { label: "Settings", href: "/admin/settings", icon: FiSettings },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--color-bg)" }}>
      {/* Background Glows for Premium Feel */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"
        style={{ background: "var(--color-accent-2)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[100px] pointer-events-none"
        style={{ background: "var(--color-accent)" }} />

      <div className="flex h-screen relative z-10">
        {/* Sidebar - Glassmorphism */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 transition-transform lg:translate-x-0 lg:static ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="h-full flex flex-col p-8 glass m-4 mr-0 rounded-4xl border-r-0 shadow-2xl">
            <div className="flex items-center gap-3 mb-12 px-2">
              <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <FiHome size={22} />
              </div>
              <span className="font-bold text-xl tracking-tight gradient-text">HomeInspect</span>
            </div>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 ${isActive
                      ? "bg-blue-900 text-white shadow-xl shadow-blue-100 scale-[1.02]"
                      : "text-slate-400 hover:bg-white/50 hover:text-blue-900 translate-x-0 hover:translate-x-1"
                      }`}
                  >
                    <item.icon size={22} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="flex items-center gap-4 px-5 py-4 mt-auto rounded-2xl font-bold text-rose-500 hover:bg-rose-50 transition-all active:scale-95"
            >
              <FiLogOut size={22} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <header className="h-24 flex items-center justify-between px-10 sticky top-0 z-40">
            <button className="lg:hidden p-3 text-slate-500 glass rounded-xl" onClick={() => setSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <div className="flex items-center gap-6 ml-auto rounded-2xl py-4 px-6 mt-4 bg-blue-900">
              <div className="text-right hidden sm:block ">
                <p className="text-sm font-bold text-white mb-2">{session?.user?.email}</p>
                <span className="bg-white p-1 rounded-lg text-blue-900">Administrator</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-900 font-bold glass shadow-lg border-2 border-white">
                HI
              </div>
            </div>
          </header>

          <main className="p-10 mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
