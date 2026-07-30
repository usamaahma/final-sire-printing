import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import NavbarCategory from "@/models/NavbarCategory";

// ==========================================
// 3. UPDATE (ADMIN): Update Single Navbar Item
// ==========================================
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();
    const { customLabel, order } = body;

    const updatedItem = await NavbarCategory.findByIdAndUpdate(
      id,
      {
        ...(customLabel !== undefined && { customLabel }),
        ...(order !== undefined && { order }),
      },
      { new: true },
    ).populate("category", "name slug image");

    if (!updatedItem) {
      return NextResponse.json(
        { success: false, message: "Navbar item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Navbar item updated successfully",
        data: updatedItem,
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
// 4. DELETE (ADMIN): Remove Single Item from Navbar
// ==========================================
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const deletedItem = await NavbarCategory.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        { success: false, message: "Navbar item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Category removed from navbar successfully",
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
