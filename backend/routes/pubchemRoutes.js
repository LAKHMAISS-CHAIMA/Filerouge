import express from "express";
import { searchSubstance } from "../controllers/pubchemController.js";

const router = express.Router();

router.get("/search/:name", searchSubstance);

export default router; 