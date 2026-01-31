import express from "express";
import { getAllBooks, getBookById } from "../controllers/bookController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// protected routes
router.get("/", authMiddleware, getAllBooks);
router.get("/:id", authMiddleware, getBookById);

export default router;
