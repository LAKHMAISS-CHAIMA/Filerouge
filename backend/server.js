import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import pubchemRoutes from "./routes/pubchemRoutes.js";
import simulationRoutes from "./routes/simulationRoutes.js";
import predefinedReactionRoutes from "./routes/predefinedReactionRoutes.js";
import substanceRoutes from "./routes/substanceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config(); 

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/pubchem", pubchemRoutes);
app.use("/api/simulation", simulationRoutes);
app.use("/api/reactions", predefinedReactionRoutes);
app.use("/api/substances", substanceRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`));

export default app; 
