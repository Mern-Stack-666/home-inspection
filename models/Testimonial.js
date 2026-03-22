import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  text: { type: String, required: true },
  initials: { type: String, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
