import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { getSession } from "@/lib/session";

export async function GET() {
  await dbConnect();
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return NextResponse.json(settings);
}

export async function PATCH(req) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const data = await req.json();
  const settings = await SiteSettings.findOneAndUpdate({}, data, { new: true, upsert: true });
  return NextResponse.json(settings);
}
