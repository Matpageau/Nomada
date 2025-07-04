import { UserModel } from "../models/UserModel"
import { UserType } from "../Types/User"
import bcrypt from 'bcrypt'

export const UserService = {
  async login(username: string, password: string): Promise<UserType> {
    const user = await UserModel.findOne({
      $or: [{username: username}, {email: username}]
    }).lean()
    if(!user) throw new Error("User not found")

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error("Wrong password")

    return user
  },

  async register(email: string, password: string, username: string, fullName: string) {
    const existingMail = await UserModel.findOne({ email })
    if(existingMail) throw new Error("Email already used")

    const existingUsername = await UserModel.findOne({ username })
    if(existingUsername) throw new Error("Username already used")

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new UserModel({
      email,
      username,
      fullName,
      password: hashedPassword
    })

    await user.save()
    return {
      _id: user._id,
      email: user.email,
      username: user.username,
      fullName: user.fullName
    }
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