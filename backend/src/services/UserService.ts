import { UserModel } from "../models/UserModel"
import { UserType } from "../Types/User"
import bcrypt from 'bcrypt'

export const UserService = {
  async login(username: string, password: string): Promise<UserType> {
    const user = await UserModel.findOne({
      $or: [{username: username}, {email: username}]
    }).lean()
    if(!user) throw new Error("Invalid username")

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error("Invalid password")

    return user
  },

  async getCurrentUser(userId: string): Promise<UserType> {
    const user = await UserModel.findById(userId).select('-password').lean()
    if (!user) throw new Error('User not found')

    return user
  },

  async getUserByUsername(username: string): Promise<UserType> {
    const user = await UserModel.findOne({ username }).select('-password').lean()
    if (!user) throw new Error('User not found')

    return user
  }
}