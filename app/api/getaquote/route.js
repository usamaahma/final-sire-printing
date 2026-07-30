import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GetAQuote from "@/models/getaquote";

// SAARI LEADS FETCH KARNE KE LIYE
export async function GET() {
  await connectDB();
  const quotes = await GetAQuote.find({}).sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: quotes });
}

// NAYI LEAD SUBMIT KARNE KE LIYE
export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const newQuote = await GetAQuote.create(body);
  return NextResponse.json({ success: true, data: newQuote }, { status: 201 });
}