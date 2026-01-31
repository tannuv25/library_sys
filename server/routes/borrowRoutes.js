import express from "express";
import {
  borrowBook,
  returnBook,
  getActiveBorrow,
  getBorrowHistory
} from "../controllers/borrowController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/borrow", authMiddleware, borrowBook);
router.post("/return", authMiddleware, returnBook);
router.get("/active", authMiddleware, getActiveBorrow);
router.get("/history", authMiddleware, getBorrowHistory);

export default router;
