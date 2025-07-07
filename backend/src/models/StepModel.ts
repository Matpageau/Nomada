import { StepType } from "../Types/Step";
import mongoose, { Model } from "mongoose";

interface StepDocument extends StepType, Document {}

const StepSchema = new mongoose.Schema<StepDocument>({
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

export const StepModel: Model<StepDocument> = mongoose.models.Step || mongoose.model<StepDocument>("Step", StepSchema)