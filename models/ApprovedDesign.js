import mongoose from "mongoose";

const ApprovedDesignSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Approved",
    },
  },
  { timestamps: true },
);

export default mongoose.models.ApprovedDesign ||
  mongoose.model("ApprovedDesign", ApprovedDesignSchema);
