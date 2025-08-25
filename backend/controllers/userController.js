import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Erreur getAllUsers:", error.message);
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();

    res.json({ message: "Utilisateur mis à jour avec succès.", user });
  } catch (error) {
    console.error("Erreur updateUser:", error.message);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    console.error("Erreur deleteUser:", error.message);
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur." });
  }
};
