import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  await dbConnect();
  const testimonials = await Testimonial.find({ active: true }).limit(3);
  return NextResponse.json(testimonials);
}
