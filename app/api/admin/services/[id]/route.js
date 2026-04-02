import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import { getSession } from "@/lib/session";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { id } = await params;
    const service = await Service.findById(id);
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  try {
    const { id } = await params;
    const body = await req.json();
    const service = await Service.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  try {
    const { id } = await params;
    await Service.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
