import { NextResponse } from "next/server";
import { seedServices } from "@/lib/seed";

export async function GET() {
  try {
    await seedServices();
    return NextResponse.json({ message: "Seeding complete!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
