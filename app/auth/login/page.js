"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { FiMail, FiLock, FiArrowRight, FiAlertCircle, FiLoader } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(errorParam ? "Invalid credentials. Please try again." : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5 blur-[120px] pointer-events-none"
        style={{ background: "var(--color-accent-2)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5 blur-[100px] pointer-events-none"
        style={{ background: "var(--color-accent)" }} />

      <FadeIn className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/home" className="inline-block mb-6">
            <span className="text-2xl font-black tracking-tighter" style={{ color: "var(--color-text-primary)" }}>
              HOME<span className="gradient-text">INSPECT</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>Welcome Back</h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Sign in to manage your inspection dashboard</p>
        </div>

        <div className="glass rounded-[2rem] p-8 sm:p-10 shadow-2xl" style={{ border: "1px solid var(--glass-border)" }}>
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 animate-fadein">
              <FiAlertCircle className="text-red-500 mt-0.5 shrink-0" size={18} />
              <p className="text-xs font-medium text-red-600 leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 ml-1" style={{ color: "var(--color-text-muted)" }}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <FiMail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@homeinspect.ai"
                  className="w-full bg-[var(--color-surface-2)] rounded-xl pl-11 h-13 focus:outline-none focus:ring-1 border border-slate-200 focus:border-[var(--color-accent)] form-shadow"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 ml-1" style={{ color: "var(--color-text-muted)" }}>
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <FiLock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[var(--color-surface-2)] rounded-xl pl-11 h-13 focus:outline-none focus:ring-1 border border-slate-200 focus:border-[var(--color-accent)] form-shadow"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-13 justify-center gap-3 text-base shadow-xl disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <FiLoader className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link href="/home" className="text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
              ← Back to main site
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-xs" style={{ color: "var(--color-text-light)" }}>
          &copy; {new Date().getFullYear()} HomeInspect AI. All rights reserved.
        </p>
      </FadeIn>
    </div>
  );
}
