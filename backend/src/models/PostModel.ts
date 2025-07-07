import mongoose, { Model } from "mongoose";
import { PostType } from "../Types/Post";

interface PostDocument extends PostType, Document {}

const PostSchema = new mongoose.Schema<PostDocument>({
  owner_id: {
    type : mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  medias: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Media",
    default: []
  }],
  steps: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Step",
  }],
  tags: [{
    type: String
  }],
  status: {
    type: String,
    enum: ["private", "public", "draft"],
    default: "draft"
  }
}, {
  timestamps: true
})

export const PostModel: Model<PostDocument> = mongoose.models.Post || mongoose.model<PostDocument>("Post", PostSchema)