import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const services = await Service.find().sort({ createdAt: -1 });
  return NextResponse.json(services);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const body = await req.json();
    const service = await Service.create(body);
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
