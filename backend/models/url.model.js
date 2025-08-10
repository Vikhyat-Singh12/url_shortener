import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_code: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Url", urlSchema);
