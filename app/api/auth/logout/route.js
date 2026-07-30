import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Cookie ko delete karne ke liye uska maxAge 0 kar dete hain
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // Fauran expire ho jaye
  });

  return response;
}
