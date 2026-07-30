import mongoose from "mongoose";

const navbarCategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      unique: true,
    },
    customLabel: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const NavbarCategory =
  mongoose.models.NavbarCategory ||
  mongoose.model("NavbarCategory", navbarCategorySchema);

export default NavbarCategory;
