import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { FiPlus, FiEdit, FiTrash2, FiEye, FiCheck, FiX } from "react-icons/fi";

export default async function AdminServices() {
  await dbConnect();
  const services = await Service.find().sort({ createdAt: -1 });

  return (
    <div className="space-y-12">
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
            <table className="w-full text-left text-base">
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
                {services.map((svc) => (
                  <tr key={svc._id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
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
                      <div className="flex items-center justify-end gap-3 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all">
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
                        <button className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
