import mongoose from "mongoose";

const predefinedReactionSchema = new mongoose.Schema({
  reactants: [{ type: String, required: true }],
  products: [{ type: String, required: true }],
  description: String,
  observations: String,
  createdAt: { type: Date, default: Date.now }
});

const PredefinedReaction = mongoose.model("PredefinedReaction", predefinedReactionSchema);

export default PredefinedReaction;
