"use client";

import { useState, useEffect } from "react";
import FadeIn from "@/components/FadeIn";
import { FiClock, FiCheckCircle, FiXCircle, FiInfo, FiCalendar, FiUser, FiLoader, FiX } from "react-icons/fi";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (Array.isArray(data)) {
        setBookings(data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update status");
      }
    } catch (error) {
      alert("An error occurred while updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColors = {
    pending: "bg-amber-100 text-amber-700 border border-amber-200",
    confirmed: "bg-blue-100 text-blue-700 border border-blue-200",
    completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    cancelled: "bg-rose-100 text-rose-700 border border-rose-200",
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <FiLoader className="animate-spin mb-4" size={32} />
        <p className="font-bold">Fetching latest bookings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
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
            <table className="w-full text-left text-base border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-50 text-slate-400 font-bold text-xs uppercase tracking-widest">
                  <th className="px-10 py-6">Customer Detail</th>
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
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5" title="Scheduled Time">
                          {new Date(booking.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${statusColors[booking.status] || "bg-slate-100"}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end gap-2 transition-opacity group-hover:opacity-100">
                          {updatingId === booking._id ? (
                            <FiLoader className="animate-spin text-slate-400 mr-4" size={20} />
                          ) : (
                            <>
                              <button 
                                onClick={() => setSelectedBooking(booking)}
                                title="View Details"
                                className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                              >
                                <FiInfo size={20} />
                              </button>
                              <button 
                                onClick={() => updateStatus(booking._id, "confirmed")}
                                title="Confirm Booking"
                                className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                              >
                                <FiCheckCircle size={20} />
                              </button>
                              <button 
                                onClick={() => updateStatus(booking._id, "cancelled")}
                                title="Cancel Booking"
                                className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                              >
                                <FiXCircle size={20} />
                              </button>
                              <button 
                                onClick={() => updateStatus(booking._id, "completed")}
                                title="Mark Completed"
                                className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                              >
                                <FiClock size={20} />
                              </button>
                            </>
                          )}
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

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200 border border-slate-100">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
              <h3 className="text-xl font-bold text-slate-900">Booking Details</h3>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                title="Close Details"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-8 overflow-y-auto">
              {/* Customer Info */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FiUser className="text-slate-300" /> Customer Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-sm border-b border-slate-200/60 pb-3 mb-3">
                       <span className="text-slate-500 mr-2">Name:</span> <span className="font-bold text-slate-900">{selectedBooking.customerName}</span>
                    </div>
                    <div className="text-sm border-b border-slate-200/60 pb-3 mb-3 whitespace-nowrap overflow-hidden text-ellipsis" title={selectedBooking.customerEmail}>
                       <span className="text-slate-500 mr-2">Email:</span> <span className="font-bold text-slate-900">{selectedBooking.customerEmail}</span>
                    </div>
                    <div className="text-sm">
                       <span className="text-slate-500 mr-2">Phone:</span> <span className="font-bold text-slate-900">{selectedBooking.customerPhone}</span>
                    </div>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center items-start">
                    <div className="text-sm text-slate-500 mb-2">Current Status</div>
                    <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm ${statusColors[selectedBooking.status] || "bg-slate-100"}`}>
                      {selectedBooking.status}
                    </span>
                    <div className="mt-4 text-[10px] text-slate-400 tracking-wider">
                      Created: {new Date(selectedBooking.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FiClock className="text-slate-300" /> Service Details
                </h4>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 shadow-inner shadow-slate-100/50">
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">Service Requested</span> 
                    <span className="font-black text-slate-800 text-lg">{selectedBooking.serviceType}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">Property Address</span> 
                    <span className="font-semibold text-slate-900">{selectedBooking.propertyAddress}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs text-slate-500 block mb-2">Scheduled For</span> 
                    <span className="font-bold text-indigo-700 bg-indigo-50 px-4 py-2 rounded-xl inline-block shadow-sm border border-indigo-100">
                      {new Date(selectedBooking.scheduledDate).toLocaleDateString()} at {new Date(selectedBooking.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedBooking.notes && (
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Additional Notes</h4>
                  <div className="p-5 bg-amber-50/50 border border-amber-100 rounded-2xl text-sm text-slate-700 whitespace-pre-wrap leading-relaxed shadow-inner shadow-amber-100/30">
                    {selectedBooking.notes}
                  </div>
                </div>
              )}

              {/* AI Chat History */}
              {selectedBooking.aiChatHistory && selectedBooking.aiChatHistory.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">AI Conversation History</h4>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    {selectedBooking.aiChatHistory.map((msg, idx) => (
                      <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-1">
                          {msg.role === 'user' ? 'Customer' : 'AI Assistant'}
                        </div>
                        <div className={`p-4 rounded-2xl text-sm max-w-[85%] leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm shadow-md shadow-indigo-200' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'}`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button 
                onClick={() => setSelectedBooking(null)}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all text-sm shadow-md"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
