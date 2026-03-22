import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const service = await Service.findOne({ slug, active: true });
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(service);
  }

  const services = await Service.find({ active: true }).sort({ createdAt: 1 });
  return NextResponse.json(services);
}
