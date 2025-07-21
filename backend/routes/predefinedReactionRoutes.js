import express from "express";
import { addPredefinedReaction } from "../controllers/predefinedReactionController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("Admin"), addPredefinedReaction);

export default router; 