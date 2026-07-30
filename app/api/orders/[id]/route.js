import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/order";

// PUT: Order Status ya details update karne ke liye
export async function PUT(req, { params }) {
  const { id } = await params;
  await connectDB();
  const body = await req.json();
  const updatedOrder = await Order.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json({ success: true, data: updatedOrder });
}

// DELETE: Order cancel karne ke liye
export async function DELETE(req, { params }) {
  const { id } = await params;
  await connectDB();
  await Order.findByIdAndDelete(id);
  return NextResponse.json({ success: true, message: "Order deleted successfully" });
}