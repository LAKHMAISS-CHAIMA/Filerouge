import express from "express";
import { getAllUsers, updateUser, deleteUser } from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, authorizeRoles("Admin"));

router.get("/", getAllUsers);
router.put("/:id", updateUser); 
router.delete("/:id", deleteUser); 

export default router; 