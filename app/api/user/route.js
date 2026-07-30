import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// GET: User ki details fetch karna
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const user = await User.findById(userId).select("-password"); // Password return nahi karna!
  return NextResponse.json({ success: true, data: user });
}

// PUT: User profile update karna
export async function PUT(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const body = await req.json();

  const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true });
  return NextResponse.json({ success: true, data: updatedUser });
}
export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  await User.findByIdAndDelete(userId);
  return NextResponse.json({
    success: true,
    message: "User profile deleted successfully",
  });
}
