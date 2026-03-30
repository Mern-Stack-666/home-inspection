import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import Booking from "@/models/Booking";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Fetch metrics
    const [totalServices, totalBookings, pendingBookings, completedBookings, recentBookings] = await Promise.all([
      Service.countDocuments(),
      Booking.countDocuments(),
      Booking.countDocuments({ status: "pending" }),
      Booking.countDocuments({ status: "completed" }),
      Booking.find().sort({ createdAt: -1 }).limit(5)
    ]);

    return NextResponse.json({
      totalServices,
      totalBookings,
      pendingBookings,
      completedBookings,
      recentBookings
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
