import mongoose from "mongoose";

const columnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    order: { type: Number, required: true },
    isDefault: { type: Boolean, default: false },
    color: { type: String, default: "#6b7280" }
  },
  { timestamps: true }
);

export default mongoose.model("Column", columnSchema);