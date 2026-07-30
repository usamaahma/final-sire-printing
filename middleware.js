import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check karo ke kya user /my-account ya /orders wale path pe ja raha hai
  const isProtectedPath =
    pathname.startsWith("/my-account") || pathname.startsWith("/orders");

  // Yahan apna auth token check karo (jo tumne login ke waqt cookie mein save kiya hoga)
  const token = req.cookies.get("token")?.value;

  if (isProtectedPath && !token) {
    // Agar token nahi hai, toh login page pe bhej do
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Config: batata hai ke middleware kin paths pe chalna hai
export const config = {
  matcher: ["/my-account/:path*", "/orders/:path*"],
};
