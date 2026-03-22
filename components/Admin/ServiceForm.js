"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { FiSave, FiX, FiPlus, FiTrash2, FiInfo, FiTag, FiDollarSign, FiClock, FiLayout } from "react-icons/fi";

export default function ServiceForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    title: "",
    slug: "",
    icon: "🏠",
    shortDesc: "",
    description: "",
    price: "From $",
    duration: "2-3 hours",
    color: "#0ea5e9",
    bg: "#eff6ff",
    border: "rgba(14,165,233,0.15)",
    badge: "",
    includes: [""],
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleIncludeChange = (index, value) => {
    const newIncludes = [...formData.includes];
    newIncludes[index] = value;
    setFormData(prev => ({ ...prev, includes: newIncludes }));
  };

  const addInclude = () => {
    setFormData(prev => ({ ...prev, includes: [...prev.includes, ""] }));
  };

  const removeInclude = (index) => {
    setFormData(prev => ({
      ...prev,
      includes: prev.includes.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = initialData 
      ? `/api/admin/services/${initialData._id}` 
      : "/api/admin/services";
    const method = initialData ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/services");
        router.refresh();
      } else {
        const err = await res.json();
        alert(`Error: ${err.error}`);
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-5xl">
      <FadeIn>
        <div className="bg-white p-10 rounded-4xl border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-10">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FiInfo size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Basic Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Service Title</label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Home Inspection"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">URL Slug</label>
              <input
                required
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. home-inspection"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900 outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FiLayout size={12} /> Icon (Emoji)
              </label>
              <input
                required
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all text-2xl outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FiDollarSign size={12} /> Base Price
              </label>
              <input
                required
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-black text-slate-900 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FiClock size={12} /> Duration
              </label>
              <input
                required
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Short Summary</label>
            <input
              required
              name="shortDesc"
              value={formData.shortDesc}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Description</label>
            <textarea
              required
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900 outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="bg-white p-10 rounded-4xl border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <FiTag size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Scope of Work</h2>
            </div>
            <button 
              type="button" 
              onClick={addInclude}
              className="btn-outline py-2 px-5 text-xs rounded-xl flex items-center gap-2 bg-blue-50 border-none text-blue-600 hover:bg-blue-600 hover:text-white transition-all font-black"
            >
              <FiPlus strokeWidth={3} /> ADD ITEM
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {formData.includes.map((item, index) => (
              <div key={index} className="flex gap-3 group">
                <input
                  required
                  value={item}
                  onChange={(e) => handleIncludeChange(index, e.target.value)}
                  className="flex-1 px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-800 outline-none"
                  placeholder="e.g. Detailed Foundation Check"
                />
                <button 
                  type="button" 
                  onClick={() => removeInclude(index)}
                  className="p-4 text-slate-300 hover:text-rose-500 transition-all opacity-100 group-hover:scale-110"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 py-5 px-14 text-lg shadow-2xl shadow-blue-200"
          >
            {loading ? "Syncing..." : <><FiSave size={22} /> Save Service Changes</>}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-slate-400 hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-2"
          >
            <FiX size={22} /> Discard Changes
          </button>
        </div>
      </FadeIn>
    </form>
  );
}
