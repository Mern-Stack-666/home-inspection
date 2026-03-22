import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  icon: { type: String, required: true },
  title: { type: String, required: true },
  shortDesc: { type: String, required: true },
  color: { type: String, required: true },
  bg: { type: String, required: true },
  border: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  includes: [{ type: String }],
  badge: { type: String, default: null },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
