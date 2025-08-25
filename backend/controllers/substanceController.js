import Substance from "../models/Substance.js";

export const getAllSubstances = async (req, res) => {
  try {
    const substances = await Substance.find();
    res.json(substances);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des substances." });
  }
};

export const addSubstance = async (req, res) => {
  try {
    const { nom, formule, description, imageUrl } = req.body;
    const substance = new Substance({
      nom,
      formule,
      description,
      imageUrl
    });
    await substance.save();
    res.status(201).json({ message: "Substance ajoutée", substance });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la substance." });
  }
};
