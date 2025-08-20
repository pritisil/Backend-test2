import express from "express";
import { getColumns, createColumn, updateColumnOrder, deleteColumn } from "../controllers/columnController.js";

const router = express.Router();

router.get("/", getColumns);
router.post("/", createColumn);
router.put("/order", updateColumnOrder);
router.delete("/:id", deleteColumn);

export default router;