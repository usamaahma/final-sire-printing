import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../../../../models/user";
// Note: Install bcryptjs (npm install bcryptjs) to hash your passwords!
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { name, email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return NextResponse.json(
    { success: true, message: "User registered" },
    { status: 201 },
  );
}
