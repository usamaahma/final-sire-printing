import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ApprovedDesign from "@/models/ApprovedDesign";

// GET: Fetch designs by userId
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 },
      );
    }

    const designs = await ApprovedDesign.find({ userId });
    return NextResponse.json({ success: true, data: designs });
  } catch (error) {
    console.error("Error fetching designs:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// POST: Add new approved design linked with userId
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, product, material, qty, price, status } = body;

    if (!userId || !product || !material || !qty || !price) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 },
      );
    }

    const newDesign = await ApprovedDesign.create({
      userId,
      product,
      material,
      qty,
      price,
      status: status || "Approved",
    });

    return NextResponse.json(
      { success: true, data: newDesign },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error saving design:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
