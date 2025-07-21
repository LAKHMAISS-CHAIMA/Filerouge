import User from '../models/User.js';
import Experience from '../models/Experience.js';

export const addExperienceToFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: experienceId } = req.params;

    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: "Expérience non trouvée." });
    }

    const user = await User.findById(userId);

    const isFavorite = user.favoris.includes(experienceId);

    if (isFavorite) {
      user.favoris.pull(experienceId);
      await user.save();
      return res.status(200).json({ message: "Expérience retirée des favoris." });
    } else {
      user.favoris.push(experienceId);
      await user.save();
      return res.status(200).json({ message: "Expérience ajoutée aux favoris." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favoris');
    res.json(user.favoris);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des favoris." });
  }
};
