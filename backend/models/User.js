import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String, required: [true, "Le prénom est requis"],
        trim: true,
    },

    lastname: {
        type: String, required: [true, "Le nom est requis"],
        trim: true,
    },
    email: {
        type: String, unique: true, required: [true, "L'email est requis"],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String, required: [true, "Le mot de passe est requis"],
        minlength: [8, "Le mot de passe doit contenir au moins 6 caractères"],
    },
    role: { type: String, enum: ["Étudiant", "Enseignant", "Admin"], default: "Étudiant" },
    favoris: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experience" }]
},
    { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        return next(err);
   
}});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;