"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { FiGrid, FiCalendar, FiClock, FiCheckCircle, FiArrowRight, FiActivity, FiLoader, FiPlus } from "react-icons/fi";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <FiLoader className="animate-spin mb-4" size={32} />
        <p className="font-bold tracking-widest uppercase text-xs">Generating Overview...</p>
      </div>
    );
  }

  const statCards = [
    { label: "Total Services", value: stats?.totalServices || 0, icon: FiGrid, color: "#1e3a8a", bg: "rgba(30, 58, 138, 0.1)" },
    { label: "AI Bookings", value: stats?.totalBookings || 0, icon: FiCalendar, color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.1)" },
    { label: "Pending", value: stats?.pendingBookings || 0, icon: FiClock, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" },
    { label: "Completed", value: stats?.completedBookings || 0, icon: FiCheckCircle, color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
  ];

  return (
    <div className="space-y-12 pb-20">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Welcome Back, <span className="gradient-text">Admin</span>
            </h1>
            <p className="text-slate-500 mt-2 text-lg">Here's what's happening with your site today.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">System Online</span>
          </div>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1}>
            <div className="card p-8 border-none shadow-lg hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner"
                  style={{ background: stat.bg, color: stat.color }}>
                  <stat.icon size={28} />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        <FadeIn delay={0.4} className="h-full">
          <div className="bg-white h-full rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50">
            <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Recent AI Bookings</h2>
              <Link href="/admin/bookings" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                Full List <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-base">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <th className="px-10 py-5">Customer</th>
                    <th className="px-10 py-5">Service</th>
                    <th className="px-10 py-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {stats?.recentBookings?.length > 0 ? (
                    stats.recentBookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-10 py-6">
                          <p className="font-bold text-slate-900">{booking.customerName}</p>
                          <p className="text-xs text-slate-400">{new Date(booking.createdAt).toLocaleDateString()}</p>
                        </td>
                        <td className="px-10 py-6 text-slate-600 font-medium">{booking.serviceType}</td>
                        <td className="px-10 py-6 text-right">
                          <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                            booking.status === "pending" ? "bg-amber-100 text-amber-700" :
                            booking.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                            "bg-slate-100 text-slate-600"
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-10 py-20 text-center text-slate-400 font-medium italic">No recent bookings to display.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} className="space-y-6">
          <div className="glass p-10 rounded-[2.5rem] border-none shadow-2xl space-y-8">
            <h2 className="text-xl font-bold text-slate-900 underline underline-offset-12 decoration-blue-200 decoration-4">Quick Actions</h2>
            <div className="space-y-4 pt-4">
              <Link href="/admin/services/new" className="block">
                <button className="w-full py-5 px-6 bg-blue-900 text-white rounded-2xl font-bold flex items-center justify-between group hover:shadow-2xl hover:shadow-blue-200 transition-all hover:-translate-y-1">
                  <span>Add New Service</span>
                  <FiPlusIcon className="opacity-50 w-8 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>
              <Link href="/admin/settings" className="block">
                <button className="w-full py-5 px-6 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold flex items-center justify-between hover:bg-slate-50 transition-all">
                  <span>Edit Site Settings</span>
                  <FiActivity size={20} className="text-slate-300" />
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-linear-to-br from-blue-900 to-blue-700 p-10 rounded-[2.5rem] text-white shadow-xl">
            <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Updates to services are applied instantly to the public site. Use the "Active" toggle to hide services during maintenance.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function FiPlusIcon(props) {
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
