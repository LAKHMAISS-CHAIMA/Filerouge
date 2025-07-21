import Experience from "../models/Experience.js";
import { validationResult } from "express-validator";

export const createExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, substances, result } = req.body;
    const experience = new Experience({
      user: req.user._id,
      title,
      description,
      substances,
      result
    });
    await experience.save();
    res.status(201).json({ message: "Expérience enregistrée", experience });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'enregistrement", error: err.message });
  }
};

export const getUserHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const experiences = await Experience.find({ user: userId }).sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'historique." });
  }
};

export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({})
      .populate('user', 'firstname lastname email') 
      .sort({ createdAt: -1 }); 

    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de toutes les expériences." });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Expérience non trouvée." });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const updateExperience = async (req, res) => {
  res.status(501).json({ message: "Non implémenté." });
};

export const deleteExperience = async (req, res) => {
  res.status(501).json({ message: "Non implémenté." });
}; 