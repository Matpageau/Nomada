import mongoose, { Model } from "mongoose";
import { MediaType } from "../Types/Media";

interface MediaDocument extends MediaType, Document {}

const MediaSchema = new mongoose.Schema<MediaDocument>({
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

export const MediaModel: Model<MediaDocument> = mongoose.models.Media || mongoose.model<MediaDocument>("Media", MediaSchema)