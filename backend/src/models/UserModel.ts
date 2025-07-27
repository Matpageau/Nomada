import mongoose, { Model } from "mongoose";

const UserSchema = new mongoose.Schema({
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
    default: ""
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

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)