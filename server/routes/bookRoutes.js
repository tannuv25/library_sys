import express from "express";
import {
  getAdminBooks,
  getAllBooks,
  getBookById
} from "../controllers/bookController.js";
import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
// import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ---------- PUBLIC ROUTES ---------- */
router.get("/", getAllBooks);


/* ---------- PROTECTED ROUTES ---------- */
router.get("/admin", authMiddleware, authorizeRoles("admin"), getAdminBooks);
router.get("/:id", authMiddleware, getBookById);

/* ---------- ADMIN ROUTES (Next Step) ---------- */

// router.post("/", authMiddleware, authorizeRoles("admin"), createBook);
// router.put("/:id", authMiddleware, authorizeRoles("admin"), updateBook);
// router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteBook);

export default router;
