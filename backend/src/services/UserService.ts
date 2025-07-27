import { UserModel } from "../models/UserModel"
import { UserType } from "../Types/User"
import bcrypt from 'bcrypt'
import ApiError from "../Utils/ApiError"

export const UserService = {
  async login(username: string, password: string) {
    const user = await UserModel.findOne({
      $or: [{username: username}, {email: username}]
    })
    if(!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found")

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new ApiError(403, "WRONG_PASSWORD", "Wrong password")

    return user
  },

  async register(email: string, password: string, username: string) {
    const existingMail = await UserModel.findOne({ email }).lean()
    if(existingMail) throw new ApiError(403, "EMAIL_USED", "Email already used")

    const existingUsername = await UserModel.findOne({ username }).lean()
    if(existingUsername) throw new ApiError(403, "USERNAME_USED", "Username already used")

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new UserModel({
      email,
      username,
      password: hashedPassword
    })

    return await user.save()
  },

  async getCurrentUser(userId: string) {
    const user = await UserModel.findById(userId).select('-password').lean()
    if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found")

    return user
  },

  async getUserByUsername(username: string) {
    const user = await UserModel.findOne({ username }).select('-password').lean()
    if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found")

    return user
  }
}