import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressType: {
      type: String,
      enum: ["shipping", "billing"],
      required: true,
      default: "shipping",
    }, // Yeh batayega ke shipping hai ya billing
    name: { type: String, required: true },
    companyName: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Address ||
  mongoose.model("Address", AddressSchema);
