import { UserModel } from "../models/UserModel"
import bcrypt from "bcrypt"

export const UserRepository = {
  async login(username: string, password: string) {
    const user = await UserModel.findOne({
      $or: [
        { username: username },
        { email: username }
      ]
    })

    if(!user) {
      throw new Error("User not found")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error("Wrong password")
    }

    return user
  },

  async findById(id: string) {
    return UserModel.findById(id)
  }
}