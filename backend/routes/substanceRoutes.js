import express from "express";
import { getAllSubstances, addSubstance } from "../controllers/substanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllSubstances);
router.post("/", protect, addSubstance);

export default router; 