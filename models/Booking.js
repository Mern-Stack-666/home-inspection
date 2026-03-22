import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  serviceType: { type: String, required: true }, // slug or title
  propertyAddress: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "completed", "cancelled"], 
    default: "pending" 
  },
  notes: { type: String },
  aiChatHistory: { type: Array, default: [] }, // Store the log of the chat that led to this
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
