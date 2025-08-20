import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import columnRoutes from "./routes/columnRoutes.js";
import { initializeColumns } from "./initDB.js";

dotenv.config();
connectDB().then(() => {
  initializeColumns();
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
  res.json("Hello")
})

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/columns", columnRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
