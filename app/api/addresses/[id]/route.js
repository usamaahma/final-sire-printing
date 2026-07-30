import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Address from "@/models/address";

// PUT: Address Update karna
export async function PUT(req, { params }) {
  const { id } = await params;
  await connectDB();
  const body = await req.json();
  const updatedAddress = await Address.findByIdAndUpdate(id, body, {
    new: true,
  });
  return NextResponse.json({ success: true, data: updatedAddress });
}

// DELETE: Address remove karna
export async function DELETE(req, { params }) {
  const { id } = await params;
  await connectDB();
  await Address.findByIdAndDelete(id);
  return NextResponse.json({
    success: true,
    message: "Address deleted successfully",
  });
}
