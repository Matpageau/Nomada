import { Types } from "mongoose"

export interface PostType {
  _id? : Types.ObjectId
  owner_id: Types.ObjectId
  description: string
  photos: Types.ObjectId[]
  steps: Types.ObjectId[]
  tags: string[]
  status: "private" | "public" | "draft"
  createdAt: Date
}