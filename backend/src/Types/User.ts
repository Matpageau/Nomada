import { Types } from "mongoose"

export type UserType = {
  _id?: Types.ObjectId
  email: string
  password: string
  username: string
  fullName: string
  isPrivate: boolean
  profileImg: string
  bio: string
}