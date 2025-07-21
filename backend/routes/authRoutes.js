import express from "express";
import { body } from "express-validator";
import { register, login, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const registerValidation = [
  body("firstname").notEmpty().withMessage("Le prénom est requis."),
  body("lastname").notEmpty().withMessage("Le nom est requis."),
  body("email").isEmail().withMessage("Email invalide."),
  body("password").isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères."),
];

const loginValidation = [
  body("email").isEmail().withMessage("Email invalide."),
  body("password").notEmpty().withMessage("Le mot de passe est requis."),
];

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/me", protect, getMe);

export default router;
