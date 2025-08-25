import express from "express";
import { body } from "express-validator";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { 
  createExperience, 
  getUserHistory, 
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience
} from "../controllers/experienceController.js";
import { addExperienceToFavorites } from "../controllers/favorisController.js";

const router = express.Router();

const experienceValidation = [
  body("title").notEmpty().withMessage("Le titre est requis."),
  body("substances").isArray({ min: 1 }).withMessage("Au moins une substance est requise."),
];

router.post("/", protect, experienceValidation, createExperience);

router.get("/historique", protect, getUserHistory);

router.post("/:id/favoris", protect, addExperienceToFavorites);

router.get("/all", protect, authorizeRoles("Admin"), getAllExperiences);

router.get("/:id", protect, getExperienceById);

router.put("/:id", protect, updateExperience);

router.delete("/:id", protect, deleteExperience);

export default router;
