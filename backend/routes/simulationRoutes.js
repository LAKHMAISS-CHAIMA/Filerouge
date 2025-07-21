import express from "express";
import { simulateReaction } from "../controllers/simulationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, simulateReaction);

export default router;
