import Column from "./models/Column.js";

export const initializeColumns = async () => {
  try {
    const existingColumns = await Column.find();
    if (existingColumns.length === 0) {
      const defaultColumns = [
        { name: "todo", displayName: "Todo", order: 1, isDefault: true, color: "#ef4444" },
        { name: "inprogress", displayName: "In Progress", order: 2, isDefault: true, color: "#f59e0b" },
        { name: "done", displayName: "Done", order: 3, isDefault: true, color: "#10b981" }
      ];
      
      await Column.insertMany(defaultColumns);
      console.log("✅ Default columns initialized");
    }
  } catch (error) {
    console.error("❌ Error initializing columns:", error);
  }
};