"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { FiPlus, FiEdit, FiTrash2, FiEye, FiCheck, FiX, FiLoader, FiAlertCircle } from "react-icons/fi";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (Array.isArray(data)) {
        setServices(data);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const confirmDelete = (service) => {
    setServiceToDelete(service);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;
    const id = serviceToDelete._id;
    setShowDeleteModal(false);
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices(prev => prev.filter(s => s._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete service");
      }
    } catch (error) {
      alert("An error occurred during deletion");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <FiLoader className="animate-spin mb-4" size={32} />
        <p className="font-bold tracking-widest uppercase text-sm">Loading Services...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Manage <span className="gradient-text">Services</span>
            </h1>
            <p className="text-slate-500 mt-2 text-lg">Define and organize the inspection types offered on the site.</p>
          </div>
          <Link href="/admin/services/new">
            <button className="btn-primary shadow-2xl shadow-blue-200 py-4 px-8 text-base">
              <FiPlus size={20} strokeWidth={3} /> Add New Service
            </button>
          </Link>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="bg-white rounded-4xl border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-base border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 font-bold text-xs uppercase tracking-widest border-b border-slate-50">
                  <th className="px-10 py-6">Service Detail</th>
                  <th className="px-10 py-6">Slug/URL</th>
                  <th className="px-10 py-6">Price</th>
                  <th className="px-10 py-6">Status</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {services.length > 0 ? (
                  services.map((svc) => (
                    <tr key={svc._id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-10 py-8">
                        <div className="z-10 flex items-center gap-5">
                          <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                            style={{ background: svc.color || "#1e3a8a" }}>
                            <FiCheck size={24} strokeWidth={3} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-lg">{svc.title}</p>
                            <p className="text-xs text-slate-400 font-medium">{svc.badge || "Standard"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <code className="text-sm bg-slate-100 px-3 py-1.5 rounded-lg text-slate-600 font-bold">/{svc.slug}</code>
                      </td>
                      <td className="px-10 py-8 font-black text-slate-900">{svc.price}</td>
                      <td className="px-10 py-8">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
                          svc.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${svc.active ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                          {svc.active ? "Active" : "Draft"}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end gap-3 transition-all">
                          {deletingId === svc._id ? (
                            <FiLoader className="animate-spin text-slate-400" size={20} />
                          ) : (
                            <>
                              <Link href={`/services/${svc.slug}`} target="_blank">
                                <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                  <FiEye size={20} />
                                </button>
                              </Link>
                              <Link href={`/admin/services/edit/${svc._id}`}>
                                <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                  <FiEdit size={20} />
                                </button>
                              </Link>
                              <button 
                                onClick={() => confirmDelete(svc)}
                                className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                              >
                                <FiTrash2 size={20} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-10 py-32 text-center text-slate-400 font-medium">
                       <div className="flex flex-col items-center gap-4">
                         <FiAlertCircle size={40} className="text-slate-200" />
                         <p>No services found. Create one to get started.</p>
                       </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fadein">
          <div className="bg-white rounded-4xl p-10 max-w-md w-full shadow-2xl border border-slate-100 space-y-8">
            <div className="flex items-center gap-4 text-rose-500">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center">
                <FiAlertCircle size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-slate-900">Confirm Delete</h3>
                <p className="text-slate-500 text-sm font-medium">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed font-medium">
              Are you sure you want to delete <span className="font-bold text-slate-900 underline decoration-rose-200 decoration-4">"{serviceToDelete?.title}"</span>? All associated data will be removed forever.
            </p>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-all border border-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-6 py-4 rounded-2xl font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-xl shadow-rose-200 transition-all"
              >
                Delete Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
