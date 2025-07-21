import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import pubchemRoutes from "./routes/pubchemRoutes.js";
import predefinedReactionRoutes from "./routes/predefinedReactionRoutes.js";

dotenv.config(); 

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/pubchem", pubchemRoutes);
app.use("/api/reactions", predefinedReactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`));

export default app; 
