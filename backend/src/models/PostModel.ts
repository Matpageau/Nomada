import mongoose, { Model } from "mongoose";

const PostSchema = new mongoose.Schema({
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

export const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema)