import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  substances: [{ type: String, required: true }],
  result: String,
  createdAt: { type: Date, default: Date.now }
});

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
