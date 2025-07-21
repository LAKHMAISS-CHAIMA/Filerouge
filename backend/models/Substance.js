import mongoose from "mongoose";

const substanceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  formula: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Substance = mongoose.model("Substance", substanceSchema);

export default Substance;
