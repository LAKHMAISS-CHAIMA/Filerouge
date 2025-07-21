import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Non autorisé, token manquant" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    if (user.isBanned) {
      return res.status(403).json({ message: "Compte suspendu" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès refusé: rôle insuffisant" });
    }
    next();
  };
};