import dbConnect from "./db";
import Service from "../models/Service";
import { services as staticServices } from "./services";

export async function seedServices() {
  await dbConnect();
  
  const count = await Service.countDocuments();
  if (count > 0) {
    console.log("Services already seeded.");
    return;
  }

  console.log("Seeding services from static data...");
  try {
    const formattedServices = staticServices.map(s => ({
      ...s,
      active: true
    }));
    await Service.insertMany(formattedServices);
    console.log("Seeding successful!");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}
