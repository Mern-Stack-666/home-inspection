import mongoose from "mongoose";
import dotenv from "dotenv";
import { services as staticServices } from "./lib/services.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI in .env");
  process.exit(1);
}

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

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  text: { type: String, required: true },
  initials: { type: String, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

const staticTestimonials = [
  {
    name: "Sarah M.", role: "First-time homebuyer",
    text: "Alex walked me through booking in 2 minutes. The inspection was incredibly thorough!", initials: "SM"
  },
  {
    name: "David R.", role: "Property Investor",
    text: "Used HomeInspect for 6 commercial properties. Consistently detailed reports, always on time.", initials: "DR"
  },
  {
    name: "Emily K.", role: "Realtor",
    text: "I refer all my clients here. Fast scheduling, certified inspectors, clean digital reports.", initials: "EK"
  },
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  
  // -- Services --
  console.log("Checking if services already exist...");
  const sCount = await Service.countDocuments();
  if (sCount > 0) {
    console.log("Services already seeded.");
  } else {
    console.log("Seeding services...");
    const formattedServices = staticServices.map(s => ({ ...s, active: true }));
    await Service.insertMany(formattedServices);
    console.log("Services seeding successful!");
  }

  // -- Testimonials --
  console.log("Checking if testimonials already exist...");
  const tCount = await Testimonial.countDocuments();
  if (tCount > 0) {
    console.log("Testimonials already seeded.");
  } else {
    console.log("Seeding testimonials...");
    await Testimonial.insertMany(staticTestimonials.map(t => ({ ...t, active: true })));
    console.log("Testimonials seeding successful!");
  }

  process.exit(0);
}

seed().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
