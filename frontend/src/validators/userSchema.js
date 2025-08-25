import * as yup from "yup"

// Schémas de validation pour l'authentification
export const loginSchema = yup.object({
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").required("Mot de passe requis"),
})

export const registerSchema = yup.object({
  username: yup
    .string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(20, "Le nom d'utilisateur ne peut pas dépasser 20 caractères")
    .required("Nom d'utilisateur requis"),
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").required("Mot de passe requis"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("Confirmation du mot de passe requise"),
})

// Schéma pour la simulation de réaction
export const reactionSchema = yup.object({
  reactants: yup
    .array()
    .of(
      yup.object({
        substance: yup.string().required("Substance requise"),
        quantity: yup.number().positive("La quantité doit être positive").required("Quantité requise"),
      }),
    )
    .min(1, "Au moins un réactif est requis"),
  temperature: yup
    .number()
    .min(-273, "La température ne peut pas être inférieure à -273°C")
    .max(5000, "La température ne peut pas dépasser 5000°C")
    .required("Température requise"),
  pressure: yup.number().positive("La pression doit être positive").required("Pression requise"),
  catalyst: yup.string().optional(),
})

// Schéma pour la création d'expérience
export const experimentSchema = yup.object({
  title: yup
    .string()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(100, "Le titre ne peut pas dépasser 100 caractères")
    .required("Titre requis"),
  description: yup
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .required("Description requise"),
  objective: yup
    .string()
    .min(5, "L'objectif doit contenir au moins 5 caractères")
    .max(500, "L'objectif ne peut pas dépasser 500 caractères")
    .required("Objectif requis"),
  materials: yup.array().of(yup.string().required()).min(1, "Au moins un matériel est requis"),
  steps: yup.array().of(yup.string().required()).min(1, "Au moins une étape est requise"),
})

// Schéma pour la recherche de substances
export const searchSchema = yup.object({
  query: yup
    .string()
    .min(2, "La recherche doit contenir au moins 2 caractères")
    .max(100, "La recherche ne peut pas dépasser 100 caractères")
    .required("Terme de recherche requis"),
})
