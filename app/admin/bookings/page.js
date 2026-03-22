import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import FadeIn from "@/components/FadeIn";
import { FiClock, FiCheckCircle, FiXCircle, FiInfo, FiCalendar, FiUser } from "react-icons/fi";

export default async function AdminBookings() {
  await dbConnect();
  const bookings = await Booking.find().sort({ createdAt: -1 });

  const statusColors = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-blue-100 text-blue-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-rose-100 text-rose-700",
  };

  return (
    <div className="space-y-12">
      <FadeIn>
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Bookings & <span className="gradient-text">Inquiries</span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Review and manage leads captured by the AI Assistant.</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="bg-white rounded-4xl border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-base">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-50 text-slate-400 font-bold text-xs uppercase tracking-widest">
                  <th className="px-10 py-6">Customer Detil</th>
                  <th className="px-10 py-6">Service & Address</th>
                  <th className="px-10 py-6">Scheduled</th>
                  <th className="px-10 py-6">Status</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                            <FiUser size={20} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-lg leading-tight">{booking.customerName}</div>
                            <div className="text-xs text-slate-500 mt-1">{booking.customerEmail} • {booking.customerPhone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="font-black text-slate-700">{booking.serviceType}</div>
                        <div className="text-xs text-slate-400 italic mt-1 max-w-xs truncate">{booking.propertyAddress}</div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="text-slate-800 font-bold">{new Date(booking.scheduledDate).toLocaleDateString()}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </td>
                      <td className="px-10 py-8">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${statusColors[booking.status] || "bg-slate-100"}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 transition-opacity group-hover:opacity-100">
                          <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                            <FiInfo size={20} />
                          </button>
                          <button className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                            <FiCheckCircle size={20} />
                          </button>
                          <button className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                            <FiXCircle size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-10 py-32 text-center text-slate-400 border-none">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center">
                          <FiCalendar size={32} className="opacity-20" />
                        </div>
                        <p className="font-bold text-lg">No inquiries captured yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
