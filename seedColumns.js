import mongoose from "mongoose";
import dotenv from "dotenv";
import Column from "./models/Column.js";

dotenv.config();

const seedColumns = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if columns already exist
    const existingColumns = await Column.find();
    if (existingColumns.length > 0) {
      console.log("Columns already exist, skipping seed");
      process.exit(0);
    }

    const defaultColumns = [
      { name: "todo", displayName: "Todo", order: 1, isDefault: true, color: "#ef4444" },
      { name: "inprogress", displayName: "In Progress", order: 2, isDefault: true, color: "#f59e0b" },
      { name: "done", displayName: "Done", order: 3, isDefault: true, color: "#10b981" }
    ];

    await Column.insertMany(defaultColumns);
    console.log("Default columns seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding columns:", error);
    process.exit(1);
  }
};

seedColumns();