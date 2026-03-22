import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const sessionCookie = req.cookies.get("session")?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const secretKey = process.env.NEXTAUTH_SECRET || "default_secret_for_local_dev";
    const key = new TextEncoder().encode(secretKey);
    await jwtVerify(sessionCookie, key, { algorithms: ["HS256"] });
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
