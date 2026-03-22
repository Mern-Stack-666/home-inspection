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

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  
  console.log("Checking if services already exist...");
  const count = await Service.countDocuments();
  if (count > 0) {
    console.log("Services already seeded. Skipping.");
  } else {
    console.log("Seeding services...");
    const formattedServices = staticServices.map(s => ({
      ...s,
      active: true
    }));
    await Service.insertMany(formattedServices);
    console.log("Seeding successful!");
  }

  process.exit(0);
}

seed().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
