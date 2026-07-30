import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import NavbarCategory from "@/models/NavbarCategory"; // Ya jo bhi model aap use kar rahe hain

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { items } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { success: false, message: "Invalid items format" },
        { status: 400 },
      );
    }

    // Purane sare navbar items clear kar ke naye save kar dein (Bulk Upsert/Replace)
    await NavbarCategory.deleteMany({});

    const formattedItems = items.map((item) => ({
      category: item.categoryId,
      customLabel: item.customLabel || "",
      order: Number(item.order) || 0,
    }));

    if (formattedItems.length > 0) {
      await NavbarCategory.insertMany(formattedItems);
    }

    return NextResponse.json(
      { success: true, message: "Navbar categories updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Bulk save error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
