import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import NavbarCategory from "@/models/NavbarCategory";

// ==========================================
// 1. READ (PUBLIC): Get All Navbar Categories
// ==========================================
export async function GET() {
  try {
    await connectDB();
    const navbarItems = await NavbarCategory.find()
      .populate("category", "title slug image")
      .sort({ order: 1 });

    return NextResponse.json(
      {
        success: true,
        count: navbarItems.length,
        data: navbarItems,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// ==========================================
// 2. CREATE / SYNC (ADMIN): Bulk Save Navbar Categories
// ==========================================
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { items } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { success: false, message: "Items must be an array" },
        { status: 400 },
      );
    }

    // Purani list clear kar ke nayi save karega (Sync approach)
    await NavbarCategory.deleteMany({});

    if (items.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Navbar cleared successfully",
          data: [],
        },
        { status: 200 },
      );
    }

    const formattedItems = items.map((item, index) => ({
      category: item.categoryId,
      customLabel: item.customLabel || "",
      order: item.order !== undefined ? item.order : index,
    }));

    const savedItems = await NavbarCategory.insertMany(formattedItems);

    // Save hone ke foran baad populated data fetch kar ke return karein
    const populatedItems = await NavbarCategory.find({
      _id: { $in: savedItems.map((item) => item._id) },
    })
      .populate("category", "name slug image")
      .sort({ order: 1 });

    return NextResponse.json(
      {
        success: true,
        message: "Navbar categories updated successfully in bulk",
        count: populatedItems.length,
        data: populatedItems,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
