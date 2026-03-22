import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "bookings.json");

export async function POST(request) {
  try {
    const body = await request.json();

    // Ensure data directory exists
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });

    // Read existing bookings
    let bookings = [];
    try {
      const raw = await fs.readFile(DATA_FILE, "utf-8");
      bookings = JSON.parse(raw);
    } catch {
      // File doesn't exist yet — start fresh
    }

    // Append new booking
    const newBooking = {
      id: `BK-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };
    bookings.push(newBooking);

    await fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2));

    return NextResponse.json({ success: true, id: newBooking.id });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ success: false, error: "Failed to save booking" }, { status: 500 });
  }
}
