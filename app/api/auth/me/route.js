import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../../../../models/user";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectDB();
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No Token Provided" },
        { status: 401 },
      );
    }

    // Yahan JWT_SECRET rakha hai (login wala naam same hona chahiye)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Database se user find karo (password chhor kar)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid Token" },
      { status: 401 },
    );
  }
}
