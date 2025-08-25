import mongoose from "mongoose";

const SubstanceSchema = new mongoose.Schema({
  nom: String,
  formule: String,
  description: String,
  imageUrl: String,
});

const Substance = mongoose.model("Substance", SubstanceSchema);
export default Substance;
