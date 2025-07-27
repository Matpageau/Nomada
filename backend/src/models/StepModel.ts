import mongoose, { Model } from "mongoose";

const StepSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Post"
  },
  lng: {
    type: Number,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  medias: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Media",
    default: []
  }],
  description: {
    type: String
  },
  date_from: {
    type: Date
  },
  date_to: {
    type: Date
  }
}, {
  timestamps: true
})

export const StepModel = mongoose.models.Step || mongoose.model("Step", StepSchema)