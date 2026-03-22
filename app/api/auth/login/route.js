import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { setSession } from "@/lib/session";

export async function POST(req) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = { id: admin._id, email: admin.email, name: "Admin" };
    await setSession(user);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
