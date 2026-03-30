"use client";

import { useState, useEffect, use } from "react";
import ServiceForm from "@/components/Admin/ServiceForm";
import { notFound } from "next/navigation";
import { FiLoader } from "react-icons/fi";

export default function EditServicePage({ params }) {
  const { id } = use(params);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/admin/services/${id}`);
        if (!res.ok) {
          if (res.status === 404) return notFound();
          throw new Error("Failed to fetch service");
        }
        const data = await res.json();
        setService(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <FiLoader className="animate-spin mb-4" size={32} />
        <p className="font-bold">Loading service data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-rose-500 font-bold">
        Error: {error}
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Edit Service</h1>
        <p className="text-slate-500 mt-1">Update details for "{service.title}".</p>
      </div>
      <ServiceForm initialData={service} />
    </div>
  );
}
