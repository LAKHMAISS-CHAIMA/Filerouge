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
    const experience = await Experience.findById(req.params.id).populate("user", "firstname lastname");
    if (!experience) {
      return res.status(404).json({ message: "Expérience non trouvée." });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Expérience non trouvée." });
    }

    if (experience.user.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Accès refusé: vous ne pouvez pas modifier cette expérience." });
    }

    const { title, description, substances, result } = req.body;

    experience.title = title || experience.title;
    experience.description = description || experience.description;
    experience.substances = substances || experience.substances;
    experience.result = result || experience.result;

    const updated = await experience.save();
    res.json({ message: "Expérience mise à jour", experience: updated });

  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Expérience non trouvée." });
    }

    if (experience.user.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Accès refusé: vous ne pouvez pas supprimer cette expérience." });
    }

    await experience.deleteOne();

    res.json({ message: "Expérience supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
}; 