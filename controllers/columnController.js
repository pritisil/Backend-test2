import Column from "../models/Column.js";

// GET all columns
export const getColumns = async (req, res) => {
  try {
    const columns = await Column.find().sort({ order: 1 });
    res.json(columns);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE a column
export const createColumn = async (req, res) => {
  try {
    const { displayName, color } = req.body;
    
    if (!displayName) {
      return res.status(400).json({ message: "Display name is required" });
    }
    
    // Generate name from displayName
    const name = displayName.toLowerCase().replace(/\s+/g, '_');
    
    // Find Done column and get its order
    const doneColumn = await Column.findOne({ name: "done" });
    const insertOrder = doneColumn ? doneColumn.order : 999;
    
    // Update Done column order to be last
    if (doneColumn) {
      await Column.findByIdAndUpdate(doneColumn._id, { order: insertOrder + 1 });
    }
    
    const column = new Column({ 
      name, 
      displayName, 
      order: insertOrder,
      color: color || "#6b7280"
    });
    
    await column.save();
    res.status(201).json(column);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Column name already exists" });
    } else {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
};

// UPDATE column order
export const updateColumnOrder = async (req, res) => {
  try {
    const { columns } = req.body;
    
    const updatePromises = columns.map((col, index) =>
      Column.findByIdAndUpdate(col._id, { order: index + 1 })
    );
    
    await Promise.all(updatePromises);
    const updatedColumns = await Column.find().sort({ order: 1 });
    
    res.json(updatedColumns);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE a column
export const deleteColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const column = await Column.findById(id);
    
    if (!column) return res.status(404).json({ message: "Column not found" });
    
    if (column.isDefault) {
      return res.status(400).json({ message: "Cannot delete default columns" });
    }
    
    await Column.findByIdAndDelete(id);
    res.json({ message: "Column deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};