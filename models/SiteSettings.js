import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema({
  siteName: { type: String, default: "HomeInspect" },
  contactEmail: { type: String, default: "info@homeinspect.com" },
  contactPhone: { type: String, default: "(555) 123-4567" },
  contactAddress: { type: String, default: "123 Inspection Way, City, State" },
  workingHours: { type: String, default: "Mon-Fri: 8am - 6pm" },
  socialLinks: {
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },
  announcement: {
    text: { type: String, default: "" },
    enabled: { type: Boolean, default: false },
  }
}, { timestamps: true });

export default mongoose.models.SiteSettings || mongoose.model("SiteSettings", SiteSettingsSchema);
