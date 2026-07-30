import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/order";

// GET: Saare Orders (Admin) ya specific user ke orders fetch karne ke liye
export async function GET(req) {
  await connectDB();
  // Agar tum middleware use kr rhe ho toh header se id lo, 
  // warna query param se fetch krlo: const { searchParams } = new URL(req.url); const userId = searchParams.get('userId');
  const orders = await Order.find({}).sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: orders });
}

// POST: Naya Order place karna
export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const newOrder = await Order.create(body);
  return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
}