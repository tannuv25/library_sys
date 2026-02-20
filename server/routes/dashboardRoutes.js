import express from "express";
import {
  getUserDashboard,
  getAdminDashboard
} from "../controllers/dashboardController.js";

import authMiddleware from "../middleware/auth.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ---------- USER DASHBOARD ---------- */
router.get(
  "/user",
  authMiddleware,
  getUserDashboard
);

/* ---------- ADMIN DASHBOARD ---------- */
router.get(
  "/admin",
  authMiddleware,
  authorizeRoles("admin"),
  getAdminDashboard
);

export default router;
