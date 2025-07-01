import mongoose, { Model } from "mongoose";
import { UserType } from "../Types/User"

interface UserDocument extends UserType, Document {}

const UserSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: true
  },
  profileImg: {
    type: String
  },
  bio: {
    type: String
  }
}, {
  timestamps: true
})

export const UserModel: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema)