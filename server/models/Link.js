import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Link", linkSchema);