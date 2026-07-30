import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: String, required: true },
    material: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    size: {
      length: { type: Number, required: true, min: 0 },
      width: { type: Number, required: true, min: 0 },
      height: { type: Number, required: true, min: 0 },
      unit: { type: String, default: 'in', enum: ['in', 'cm', 'mm'] },
    },
    file: { type: String, required: false },
    price: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['Under Production', 'Forwarded to Production', 'Shipped', 'Delivered'],
      default: 'Under Production',
      required: true,
    },
    shippedvia: { type: String },
    trackingid: { type: String },
    invoice: { type: String },
    approvedStatus: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);