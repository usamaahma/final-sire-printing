import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  // 1. User check karo
  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 },
    );

  // 2. Password match karo
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 },
    );

  // 3. JWT Token banao
  const token = jwt.sign(
    { id: user._id }, // 'id' rakha hai
    process.env.JWT_SECRET, // .env wala naam same hona chahiye
    { expiresIn: "1d" },
  );
  // 4. Response mein cookie set karo
  const response = NextResponse.json({
    success: true,
    message: "Login successful",
    userId: user._id,
  });
  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/", // Yeh add karna lazmi hai
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });
  return response;
}
