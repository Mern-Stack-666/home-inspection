import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    // The AI chat sends names, emails, etc.
    // We map them to our Booking model
    const booking = await Booking.create({
      customerName: data.name || "Unknown",
      customerEmail: data.email || "Unknown",
      customerPhone: data.phone || "N/A",
      serviceType: data.serviceType || "General Inquiry",
      propertyAddress: data.address || "N/A",
      scheduledDate: (data.date && data.time) ? new Date(`${data.date} ${data.time}`) : (data.date ? new Date(data.date) : new Date()),
      notes: data.notes || "",
      aiChatHistory: data.chatHistory || [],
    });

    return NextResponse.json({ 
      success: true, 
      bookingId: booking._id,
      message: "Booking saved to database" 
    }, { status: 201 });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
