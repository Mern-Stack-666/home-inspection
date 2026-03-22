"use client";

import { useState, useEffect } from "react";
import FadeIn from "@/components/FadeIn";
import { FiSave, FiSettings, FiMail, FiPhone, FiMapPin, FiClock, FiShare2 } from "react-icons/fi";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    workingHours: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    }
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setSettings(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        alert("Settings updated successfully!");
      }
    } catch (error) {
      alert("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-slate-400 font-bold italic">Loading site configuration...</div>;

  return (
    <div className="space-y-12">
      <FadeIn>
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Site <span className="gradient-text">Configuration</span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Manage global settings, contact info, and branding.</p>
        </div>
      </FadeIn>

      <form onSubmit={handleSubmit} className="space-y-8">
        <FadeIn delay={0.2}>
          <div className="bg-white p-10 rounded-4xl border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-10">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <FiSettings size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">General Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Site Name</label>
                <input
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Working Hours</label>
                <input
                  name="workingHours"
                  value={settings.workingHours}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900 outline-none"
                />
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-white p-10 rounded-4xl border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-10">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <FiMail size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Contact Details</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Contact Email</label>
                <input
                  name="contactEmail"
                  value={settings.contactEmail}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Contact Phone</label>
                <input
                  name="contactPhone"
                  value={settings.contactPhone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900 outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Business Address</label>
              <input
                name="contactAddress"
                value={settings.contactAddress}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900 outline-none"
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="bg-white p-10 rounded-4xl border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-10">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <FiShare2 size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Social Media Links</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(platform => (
                <div key={platform} className="space-y-2">
                  <label className="text-xs font-black text-slate-400 capitalize tracking-widest">{platform} URL</label>
                  <input
                    name={`socialLinks.${platform}`}
                    value={settings.socialLinks[platform]}
                    onChange={handleChange}
                    placeholder={`https://${platform}.com/yourpage`}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 py-5 px-14 text-lg shadow-2xl shadow-blue-200"
          >
            {saving ? "Updating..." : <><FiSave size={22} /> Save Site Settings</>}
          </button>
        </FadeIn>
      </form>
    </div>
  );
}
