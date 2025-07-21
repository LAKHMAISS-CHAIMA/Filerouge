import PredefinedReaction from "../models/PredefinedReaction.js";

export const addPredefinedReaction = async (req, res) => {
  try {
    const { reactants, products, description, observations } = req.body;
    if (!reactants || !products) {
      return res.status(400).json({ message: "Les réactifs et produits sont requis." });
    }
    const reaction = new PredefinedReaction({ reactants, products, description, observations });
    await reaction.save();
    res.status(201).json({ message: "Réaction prédéfinie ajoutée.", reaction });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout.", error: error.message });
  }
};

export const getAllPredefinedReactions = async (req, res) => {
  try {
    const reactions = await PredefinedReaction.find({});
    res.json(reactions);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des réactions." });
  }
};

export const deletePredefinedReaction = async (req, res) => {
  res.status(501).json({ message: "Non implémenté." });
}; 