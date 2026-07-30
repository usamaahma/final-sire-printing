import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Address from "@/models/address";

// GET: Addresses fetch karna (User ID aur optional addressType ke mutabiq)
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const addressType = searchParams.get("type"); // "shipping" ya "billing"

  let query = { userId };
  if (addressType) {
    query.addressType = addressType;
  }

  const addresses = await Address.find(query);
  return NextResponse.json({ success: true, data: addresses });
}

// POST: Naya address save karna (Shipping ya Billing)
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  // Body mein addressType lazmi aana chahiye ("shipping" ya "billing")
  const newAddress = await Address.create(body);
  return NextResponse.json(
    { success: true, data: newAddress },
    { status: 201 },
  );
}
