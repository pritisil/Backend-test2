import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, required: true, default: "todo" },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
