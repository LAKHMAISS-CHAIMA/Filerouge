import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstname, lastname, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà" });
    }
    const user = await User.create({ 
      firstname, 
      lastname, 
      email, 
      password,
      role: role || "Étudiant"
    });
    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        role: user.role
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.json({
        success: true,
        user: {
          id: user._id,
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
          role: user.role
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({
      success: true,
      user: {
        id: user._id,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};