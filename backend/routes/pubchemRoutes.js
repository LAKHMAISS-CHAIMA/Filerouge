import express from "express";
import { searchSubstance, getSubstanceByCID } from "../controllers/pubchemController.js";

const router = express.Router();

router.get("/search/:name", searchSubstance);
router.get("/cid/:cid", getSubstanceByCID); 

export default router; 