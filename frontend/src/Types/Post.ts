import { Types } from "mongoose"

export interface PostType {
  _id : string
  owner_id: Types.ObjectId
  description: string
  medias: Types.ObjectId[]
  steps: Types.ObjectId[]
  tags: string[]
  status: "private" | "public" | "draft"
  createdAt: Date
}