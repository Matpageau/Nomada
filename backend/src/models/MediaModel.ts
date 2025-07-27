import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  owner_id: {
    type : mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["photo", "video"],
    default: "photo"
  },
  url: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export const MediaModel = mongoose.models.Media || mongoose.model("Media", MediaSchema)