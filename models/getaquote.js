import mongoose from "mongoose";

const GetAQuoteSchema = new mongoose.Schema(
  {
    // User Info
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },

    // Product Info
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    unit: { type: String, required: true },
    quantity: { type: Number, required: true },
    materialType: { type: String, required: true },
    printedOptions: { type: String },
    printedSides: { type: String },
    description: { type: String },
    attachment: { type: String },

    // Admin Status
    status: { 
      type: String, 
      enum: ["pending", "in-progress", "completed", "cancelled"], 
      default: "pending" 
    },
  },
  { timestamps: true }
);

export default mongoose.models.GetAQuote || mongoose.model("GetAQuote", GetAQuoteSchema);